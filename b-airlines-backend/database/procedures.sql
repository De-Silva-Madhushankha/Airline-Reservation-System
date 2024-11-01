-- report - Given origin and destination, all past flights, states, passenger counts data

DELIMITER $$

CREATE PROCEDURE past_flights_report_proc(
    IN origin_code CHAR(3),
    IN destination_code CHAR(3)
)
BEGIN
    SELECT
        f.flight_id,
        r.origin_code,
        r.destination_code,
        f.departure,
        f.arrival,
        COUNT(b.passenger_id) AS passenger_count
    FROM
        Flight f
    JOIN
        Route r ON f.route_id = r.route_id
    LEFT JOIN
        Booking b ON f.flight_id = b.flight_id
    WHERE
        f.departure < CURRENT_TIMESTAMP
        AND r.origin_code = origin_code
        AND r.destination_code = destination_code
    GROUP BY
        f.flight_id, r.origin_code, r.destination_code, f.departure, f.arrival;
END $$

DELIMITER ;


DELIMITER //

CREATE PROCEDURE AddOrGetPassenger(
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_passport_id VARCHAR(20),
    IN p_age INT,
    IN p_phone_number VARCHAR(20),
    IN p_email VARCHAR(100)
)
BEGIN
    DECLARE p_passenger_id CHAR(36);

    -- Check if a passenger with the given passport_id already exists
    SELECT passenger_id INTO p_passenger_id
    FROM Passenger
    WHERE passport_id = p_passport_id;

    -- If no such passenger exists, insert a new one
    IF p_passenger_id IS NULL THEN
        SET p_passenger_id = UUID();
        INSERT INTO Passenger (
            passenger_id, first_name, last_name, passport_id, age, phone_number, email
        ) VALUES (
            p_passenger_id, p_first_name, p_last_name, p_passport_id, p_age, p_phone_number, p_email
        );
    END IF;

    -- Return the passenger_id as a result set
    SELECT p_passenger_id AS passenger_id;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE GetReservedSeatCountsByClassAndDateRange(
    IN startDate TIMESTAMP,
    IN endDate TIMESTAMP
)
BEGIN
    SELECT sc.seat_class_name, COUNT(s.seat_id) AS reserved_seat_count
    FROM Seat s
    JOIN Seat_class sc ON s.seat_class_id = sc.seat_class_id
    JOIN Flight f ON s.flight_id = f.flight_id
    WHERE s.is_reserved = true
    AND f.departure BETWEEN startDate AND endDate
    GROUP BY sc.seat_class_name;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE update_loyalty_program_for_user(
    IN p_user_id CHAR(36),
    IN p_loyalty_points INT
)
BEGIN
    DECLARE new_program_id INT;

    SELECT program_id INTO new_program_id
    FROM Loyalty_program
    WHERE p_loyalty_points BETWEEN min_points AND max_points
    LIMIT 1;

    IF new_program_id IS NOT NULL THEN
        UPDATE User
        SET program_id = new_program_id
        WHERE user_id = p_user_id;
    END IF;
END;
//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE createBooking(
    IN p_flight_id CHAR(36),
    IN p_firstName VARCHAR(50),
    IN p_lastName VARCHAR(50),
    IN p_age INT,
    IN p_phoneNumber VARCHAR(20),
    IN p_passport VARCHAR(20),
    IN p_email VARCHAR(100),
    IN p_seatRow INT,
    IN p_seatColumn INT,
    IN p_user_id CHAR(36)
)
BEGIN
    DECLARE p_passenger_id CHAR(36);
    DECLARE p_seat_id CHAR(36);
    DECLARE p_total_amount DECIMAL(10, 2);
    DECLARE new_booking_id CHAR(36);
    DECLARE current_points INT;
    DECLARE p_discount INT;


    START TRANSACTION;

    CALL AddOrGetPassenger(p_firstName, p_lastName, p_passport, p_age, p_phoneNumber, p_email);

    SET p_passenger_id = (SELECT passenger_id AS p_passenger_id FROM Passenger WHERE passport_id = p_passport);

    SET p_seat_id = (SELECT seat_id AS p_seat_id FROM Seat WHERE flight_id = p_flight_id AND seat_row = p_seatRow AND seat_column = p_seatColumn);

    
    UPDATE Seat SET is_reserved = 1, lock_until = NULL WHERE seat_id = p_seat_id;

    set p_discount = (SELECT lp.discount FROM User u JOIN Loyalty_program lp ON u.program_id = lp.program_id WHERE u.user_id = p_user_id);

    SET p_total_amount = (SELECT calculate_seat_price(p_flight_id, p_seatRow, p_seatColumn)) * (100 - p_discount) / 100;

    SET new_booking_id = UUID();

    INSERT INTO Booking (booking_id, flight_id, passenger_id, seat_id, user_id, total_amount, payment_status)
    VALUES (new_booking_id, p_flight_id, p_passenger_id, p_seat_id, p_user_id, p_total_amount, 'Paid');
    
    SELECT loyalty_points INTO current_points
    FROM User
    WHERE user_id = p_user_id;

    CALL update_loyalty_program_for_user(p_user_id, current_points);

    COMMIT;

    SELECT new_booking_id AS booking_id;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE LockSeat(
    IN p_flight_id CHAR(36),
    IN p_seat_row INT,
    IN p_seat_column INT
)
BEGIN
    DECLARE seat_locked INT;
    DECLARE p_seat_id CHAR(36);

    -- Get the seat_id and check if the seat is not locked
    SELECT seat_id INTO p_seat_id
    FROM Seat
    WHERE flight_id = p_flight_id 
      AND seat_row = p_seat_row 
      AND seat_column = p_seat_column
      AND (lock_until IS  NULL OR lock_until < NOW());
    
    -- If the seat is locked, signal an error
    IF p_seat_id IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The seat is currently locked. Please try again later.';
    ELSE
        UPDATE Seat
        SET lock_until = NOW() + INTERVAL 10 MINUTE
        WHERE seat_id = p_seat_id;
    END IF;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE GetSeatsByFlightId(
    IN p_flight_id CHAR(36)
)
BEGIN
    -- Select occupied seats
    SELECT seat_row, seat_column 
    FROM Seat 
    WHERE flight_id = p_flight_id 
      AND is_reserved = 1;

    -- Select locked but not occupied seats
    SELECT seat_row, seat_column 
    FROM Seat 
    WHERE flight_id = p_flight_id 
      AND is_reserved = 0 
      AND lock_until > NOW();
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE CancelBooking(
    IN p_booking_id CHAR(36)
)
BEGIN
    DECLARE refund_value double DEFAULT 0;
    DECLARE p_user_id CHAR(36);
    declare refund_factor float;
    declare p_loyalty_points int;
    DECLARE current_points INT;

	start TRANSACTION;
    select config_value into refund_factor
    from Config
    where config_key = 'refund_factor';
    
	SELECT total_amount * refund_factor, user_id 
	INTO refund_value, p_user_id
	FROM Booking
	WHERE booking_id = p_booking_id;
    
    UPDATE Booking
    SET payment_status = 'Cancelled'
    WHERE booking_id = p_booking_id;

    UPDATE Seat
    SET is_reserved = 0,
        lock_until = NULL
    WHERE seat_id = (
        SELECT seat_id
        FROM Booking
        WHERE booking_id = p_booking_id
    );

    UPDATE User
    SET loyalty_points = loyalty_points - 1
    WHERE user_id = p_user_id;

    SELECT loyalty_points INTO current_points
    FROM User
    WHERE user_id = p_user_id;

    CALL update_loyalty_program_for_user(p_user_id, current_points);
    COMMIT;

END //

DELIMITER ;
