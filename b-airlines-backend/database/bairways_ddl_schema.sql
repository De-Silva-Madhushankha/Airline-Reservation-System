DROP DATABASE IF EXISTS bairways;

CREATE DATABASE bairways;

USE bairways;

CREATE TABLE Location (
    location_id INT PRIMARY KEY AUTO_INCREMENT,
    location_name VARCHAR(50),
    parent_location_id INT,
    location_type VARCHAR(50),
    FOREIGN KEY (parent_location_id) REFERENCES Location(location_id) ON DELETE CASCADE
);


CREATE TABLE Loyalty_Program (
    program_id INT PRIMARY KEY AUTO_INCREMENT,
    program_name VARCHAR(50),
    min_points INT NOT NULL CHECK ( min_points > 0 ),
    max_points INT NOT NULL,
    discount INT NOT NULL
);


CREATE TABLE Role (
    role_id INT PRIMARY KEY,
    role_name VARCHAR(50),
    role_description VARCHAR(255),
    permission_type VARCHAR(50)
);


CREATE TABLE Airport (
    airport_code CHAR(3) PRIMARY KEY CHECK ( airport_code IN ('BIA', 'BKK', 'BOM', 'CGK', 'DEL', 'DMK', 'DPS', 'HRI', 'MAA', 'SIN') ),
    airport_name VARCHAR(50),
    location_id INT NOT NULL ,
    FOREIGN KEY (location_id) REFERENCES Location(location_id) ON UPDATE CASCADE
);

SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE User (
    user_id CHAR(36) PRIMARY KEY,
    program_id  INT NOT NULL DEFAULT 2,
    title VARCHAR(3) NOT NULL ,
    first_name VARCHAR(50) NOT NULL ,
    last_name VARCHAR(50) NOT NULL ,
    email VARCHAR(100) UNIQUE NOT NULL ,
    password VARCHAR(255) NOT NULL ,
    date_of_birth DATE CHECK ( date_of_birth BETWEEN '1900-01-01' AND '2010-01-01' ),
    country VARCHAR(50),
    mobile_number VARCHAR(20) NOT NULL ,
    role_id INT NOT NULL DEFAULT 2,
    loyalty_points INT DEFAULT 0,
    FOREIGN KEY (role_id) REFERENCES Role(role_id) ON UPDATE CASCADE ,
    FOREIGN KEY (program_id) REFERENCES loyalty_program(program_id) ON UPDATE CASCADE
);

SET FOREIGN_KEY_CHECKS = 1;


CREATE TABLE Model (
    model VARCHAR(50) PRIMARY KEY,
    num_columns INT NOT NULL CHECK ( num_columns > 0 ),
    num_economy_rows INT NOT NULL CHECK ( num_economy_rows > 0 ),
    num_business_rows INT NOT NULL CHECK ( num_business_rows > 0 ),
    num_platinum_rows INT NOT NULL CHECK ( num_platinum_rows > 0 )
);

CREATE TABLE Aircraft (
    aircraft_id VARCHAR(10) PRIMARY KEY,
    model VARCHAR(50),
    FOREIGN KEY (model) REFERENCES Model(model)
);


CREATE TABLE Route (
    route_id INT PRIMARY KEY AUTO_INCREMENT,
    base_price DOUBLE,
    origin_code CHAR(3) NOT NULL ,
    destination_code CHAR(3) NOT NULL ,
    FOREIGN KEY (origin_code) REFERENCES Airport(airport_code) ON DELETE CASCADE ,
    FOREIGN KEY (destination_code) REFERENCES Airport(airport_code) ON DELETE CASCADE
);


CREATE TABLE Flight (
    flight_id CHAR(36) PRIMARY KEY,
    route_id INT NOT NULL ,
    aircraft_id VARCHAR(10) NOT NULL ,
    departure TIMESTAMP,
    arrival TIMESTAMP,
    delay BOOLEAN,
    FOREIGN KEY (route_id) REFERENCES Route(route_id) ,
    FOREIGN KEY (aircraft_id) REFERENCES Aircraft(aircraft_id)
);


CREATE TABLE Passenger (
    passenger_id CHAR(36) PRIMARY KEY ,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    passport_id VARCHAR(20) NOT NULL,
    age INT CHECK ( age > 0 ),
    phone_number VARCHAR(20) NOT NULL ,
    email VARCHAR(100) NOT NULL ,
    is_registered BOOLEAN
);


CREATE TABLE Seat (
    seat_id CHAR(36) PRIMARY KEY ,
    seat_row VARCHAR(2) NOT NULL ,
    seat_column INT NOT NULL ,
    seat_class VARCHAR(20) NOT NULL ,
    seat_price DOUBLE CHECK ( seat_price > 0 ),
    is_reserved BOOLEAN,
    model VARCHAR(50),
    flight_id CHAR(36) NOT NULL,
    FOREIGN KEY (model) REFERENCES model(model) ON DELETE CASCADE ,
    FOREIGN KEY (flight_id) REFERENCES flight(flight_id)

);


CREATE TABLE Booking (
    booking_id CHAR(36) PRIMARY KEY,
    flight_id CHAR(36) NOT NULL ,
    passenger_id CHAR(36) NOT NULL ,
    seat_id CHAR(36) NOT NULL ,
    user_id CHAR(36) ,
    booking_date TIMESTAMP,
    total_amount DOUBLE,
    payment_status VARCHAR(20) CHECK ( payment_status IN ('Pending', 'Paid', 'Failed') ),
    FOREIGN KEY (flight_id) REFERENCES Flight(flight_id) ON UPDATE CASCADE ,
    FOREIGN KEY (passenger_id) REFERENCES Passenger(passenger_id) ON UPDATE CASCADE ,
    FOREIGN KEY (seat_id) REFERENCES Seat(seat_id) ON UPDATE CASCADE ,
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON UPDATE CASCADE
);

CREATE INDEX user_index
ON user(user_id, email);

CREATE INDEX flight_index
ON flight(departure,arrival);

CREATE INDEX booking_index
ON booking(flight_id,passenger_id,booking_date);

CREATE INDEX seat_index
ON seat(seat_id, seat_row, seat_column);

-- flight-search

CREATE VIEW search_flights AS
    SELECT  route.origin_code, route.destination_code, DATE(flight.departure) departure, TIME(flight.departure) dep_time, DATE(flight.arrival) arrival, TIME(flight.arrival) arr_time, flight.aircraft_id
    FROM  flight INNER JOIN route USING(route_id);



-- for profile

CREATE VIEW user_info AS
    SELECT user.user_id, user.title ,user.first_name, user.last_name, user.email, user.mobile_number, user.country, user.date_of_birth, user.loyalty_points
    FROM user;

CREATE VIEW user_bookings AS
    SELECT booking.user_id, booking.booking_id, booking.flight_id, booking.seat_id, booking.booking_date, booking.total_amount, booking.payment_status
    FROM booking;



-- reports -  Given a flight no, all passengers travelling in it (next immediate flight) below age 18, above age 18

CREATE VIEW flight_passenger_age_report AS
SELECT
    f.flight_id,
    p.passenger_id,
    p.first_name,
    p.last_name,
    p.age,
    CASE
        WHEN p.age < 18 THEN 'Below 18'
        ELSE 'Above 18'
    END AS age_group
FROM
    Flight f
JOIN
    Booking b ON f.flight_id = b.flight_id
JOIN
    Passenger p ON b.passenger_id = p.passenger_id
WHERE
    f.departure > CURRENT_TIMESTAMP
ORDER BY
    f.flight_id, p.age;

-- report -   Given a date range, number of bookings by each passenger type

DELIMITER #

CREATE PROCEDURE booking_count_by_passenger_type_proc (
    IN start_date DATE,
    IN end_date DATE
)
BEGIN
    SELECT
        CASE
            WHEN p.is_registered = TRUE THEN 'Registered'
            ELSE 'Non-Registered'
        END AS passenger_type,
        COUNT(b.booking_id) AS total_bookings
    FROM
        Booking b
    JOIN
        Passenger p ON b.passenger_id = p.passenger_id
    JOIN
        Flight f ON b.flight_id = f.flight_id
    WHERE
        f.departure BETWEEN start_date AND end_date
    GROUP BY
        passenger_type;
END #

DELIMITER ;

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

-- report -  Total revenue generated by each Aircraft type

DELIMITER $$

CREATE FUNCTION Revenue_By_Aircraft_Type(aircraft_model VARCHAR(50))
RETURNS DOUBLE
DETERMINISTIC
BEGIN
    DECLARE total_revenue DOUBLE DEFAULT 0;

    SELECT
        SUM(b.total_amount)
    INTO
        total_revenue
    FROM
        Aircraft a
    JOIN
        Model m ON a.model = m.model
    JOIN
        Flight f ON a.aircraft_id = f.aircraft_id
    JOIN
        Booking b ON f.flight_id = b.flight_id
    WHERE
        m.model = aircraft_model;

    RETURN total_revenue;
END $$

DELIMITER ;


-- report -  Given a date range, number of passengers travelling to a given destination

DELIMITER $$

CREATE FUNCTION passenger_count_by_destination(
    destination_code CHAR(3),
    start_date DATE,
    end_date DATE
)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE passenger_count INT DEFAULT 0;

    SELECT
        COUNT(DISTINCT b.passenger_id)
    INTO
        passenger_count
    FROM
        Booking b
    JOIN
        Flight f ON b.flight_id = f.flight_id
    JOIN
        Route r ON f.route_id = r.route_id
    WHERE
        r.destination_code = destination_code
        AND f.departure BETWEEN start_date AND end_date;

    RETURN passenger_count;
END $$

DELIMITER ;


DELIMITER $$
CREATE TRIGGER after_booking_insert
AFTER INSERT ON Booking
FOR EACH ROW
BEGIN
    UPDATE User
    SET loyalty_points = loyalty_points + 1
    WHERE user_id = NEW.user_id;
END;
DELIMITER ;

DELIMITER $$

CREATE TRIGGER after_flight_insert
AFTER INSERT ON flight
FOR EACH ROW
BEGIN
    DECLARE num_economy_rows INT;
    DECLARE num_business_rows INT;
    DECLARE num_platinum_rows INT;
    DECLARE model_name VARCHAR(50);
    DECLARE r INT;
    DECLARE c INT;

    -- Get the model name for the newly inserted flight
    SELECT model INTO model_name FROM aircraft WHERE aircraft_id = NEW.aircraft_id;

    -- Get the number of rows for each class based on the model
    SELECT num_economy_rows, num_business_rows, num_platinum_rows
    INTO num_economy_rows, num_business_rows, num_platinum_rows
    FROM model WHERE model = model_name;

    -- Insert Economy Seats
    SET r = 1;
    WHILE r <= num_economy_rows DO
        SET c = 1; -- Reset column for each new row
        WHILE c <= 4 DO -- Assuming 4 columns for economy
            INSERT INTO Seat (seat_id, seat_row, seat_column, seat_class, seat_price, is_reserved, model, flight_id)
            VALUES (UUID(), CHAR(64 + r), c, 'Economy',
                    CASE
                        WHEN model_name = 'Boeing 737' THEN 100
                        WHEN model_name = 'Boeing 757' THEN 110
                        WHEN model_name = 'Airbus A380' THEN 120
                    END,
                    FALSE, model_name, NEW.flight_id);
            SET c = c + 1;
        END WHILE;
        SET r = r + 1;
    END WHILE;

    -- Insert Business Seats
    SET r = 1; -- Reset row for business seats
    WHILE r <= num_business_rows DO
        SET c = 1; -- Reset column for each new row
        WHILE c <= 4 DO -- Assuming 4 columns for business
            INSERT INTO Seat (seat_id, seat_row, seat_column, seat_class, seat_price, is_reserved, model, flight_id)
            VALUES (UUID(), CHAR(64 + (num_economy_rows + r)), c, 'Business',
                    CASE
                        WHEN model_name = 'Boeing 737' THEN 200
                        WHEN model_name = 'Boeing 757' THEN 220
                        WHEN model_name = 'Airbus A380' THEN 240
                    END,
                    FALSE, model_name, NEW.flight_id);
            SET c = c + 1;
        END WHILE;
        SET r = r + 1;
    END WHILE;

    -- Insert Platinum Seats
    SET r = 1; -- Reset row for platinum seats
    WHILE r <= num_platinum_rows DO
        SET c = 1; -- Reset column for each new row
        WHILE c <= 4 DO -- Assuming 4 columns for platinum
            INSERT INTO Seat (seat_id, seat_row, seat_column, seat_class, seat_price, is_reserved, model, flight_id)
            VALUES (UUID(), CHAR(64 + (num_economy_rows + num_business_rows + r)), 1, 'Platinum',
                    CASE
                        WHEN model_name = 'Boeing 737' THEN 300
                        WHEN model_name = 'Boeing 757' THEN 330
                        WHEN model_name = 'Airbus A380' THEN 360
                    END,
                    FALSE, model_name, NEW.flight_id);
            SET c = c + 1;
        END WHILE;
        SET r = r + 1;
    END WHILE;

END ;

DELIMITER ;