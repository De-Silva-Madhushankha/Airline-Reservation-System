-- report -   Given a date range, number of bookings by each passenger type

-- DELIMITER #

-- CREATE PROCEDURE booking_count_by_passenger_type_proc (
--     IN start_date DATE,
--     IN end_date DATE
-- )
-- BEGIN
--     SELECT
--         CASE
--             WHEN p.is_registered = TRUE THEN 'Registered'
--             ELSE 'Non-Registered'
--         END AS passenger_type,
--         COUNT(b.booking_id) AS total_bookings
--     FROM
--         Booking b
--     JOIN
--         Passenger p ON b.passenger_id = p.passenger_id
--     JOIN
--         Flight f ON b.flight_id = f.flight_id
--     WHERE
--         f.departure BETWEEN start_date AND end_date
--     GROUP BY
--         passenger_type;
-- END #

-- DELIMITER ;

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

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetReservedSeatCountsByClassAndDateRange`(
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `passenger_count_by_destination`(
    IN p_destination_code CHAR(3),
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    SELECT COUNT(DISTINCT b.passenger_id) AS passenger_count
    FROM Booking b
    JOIN Flight f ON b.flight_id = f.flight_id
    JOIN Route r ON f.route_id = r.route_id
    WHERE r.destination_code = p_destination_code
      AND f.departure BETWEEN p_start_date AND p_end_date;
END //

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

    -- is this transaction really needed
    START TRANSACTION;

    CALL AddOrGetPassenger(p_firstName, p_lastName, p_passport, p_age, p_phoneNumber, p_email);

    SET p_passenger_id = (SELECT passenger_id AS p_passenger_id FROM Passenger WHERE passport_id = p_passport);

    SET p_seat_id = (SELECT seat_id AS p_seat_id FROM Seat WHERE flight_id = p_flight_id AND seat_row = p_seatRow AND seat_column = p_seatColumn);

    -- we assume seat is not taken, # manage that
    UPDATE Seat SET is_reserved = 1 WHERE seat_id = p_seat_id;

    SET p_total_amount = (SELECT calculate_seat_price(p_flight_id, p_seatRow, p_seatColumn));

    SET new_booking_id = UUID();

    INSERT INTO Booking (booking_id, flight_id, passenger_id, seat_id, user_id, total_amount, payment_status)
    VALUES (new_booking_id, p_flight_id, p_passenger_id, p_seat_id, p_user_id, p_total_amount, 'Paid');

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
