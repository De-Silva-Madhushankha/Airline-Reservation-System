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

CREATE PROCEDURE UpdateUserDetails (
    IN p_user_id INT,
    IN p_first_name VARCHAR(255),
    IN p_last_name VARCHAR(255),
    IN p_country VARCHAR(255),
    IN p_mobile_number VARCHAR(20)
)
BEGIN
    UPDATE User
    SET first_name = p_first_name, 
        last_name = p_last_name, 
        country = p_country, 
        mobile_number = p_mobile_number
    WHERE user_id = p_user_id;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE InsertUser (
    IN p_title VARCHAR(255),
    IN p_first_name VARCHAR(255),
    IN p_last_name VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_date_of_birth DATE,
    IN p_country VARCHAR(255),
    IN p_mobile_number VARCHAR(20)
)
BEGIN
    INSERT INTO User (user_id, title, first_name, last_name, email, password, date_of_birth, country, mobile_number)
    VALUES (UUID(), p_title, p_first_name, p_last_name, p_email, p_password, p_date_of_birth, p_country, p_mobile_number);
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE GetAllUsers()
BEGIN
    SELECT * FROM User;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE DeleteUserById(
    IN p_user_id INT
)
BEGIN
    DELETE FROM User WHERE user_id = p_user_id;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE GetUserByEmail(
    IN p_email VARCHAR(255)
)
BEGIN
    SELECT * FROM User WHERE email = p_email;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE GetUserInfoById(
    IN p_user_id INT
)
BEGIN
    SELECT * FROM user_info WHERE user_id = p_user_id;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE GetUserBookingsById(
    IN p_user_id INT
)
BEGIN
    SELECT * FROM user_bookings WHERE user_id = p_user_id;
END //

DELIMITER ;
