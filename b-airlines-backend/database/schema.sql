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


CREATE TABLE Loyalty_program (
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
    program_id  INT NOT NULL DEFAULT 1,
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
    FOREIGN KEY (program_id) REFERENCES Loyalty_program(program_id) ON UPDATE CASCADE
);

SET FOREIGN_KEY_CHECKS = 1;


CREATE TABLE Model (
    model VARCHAR(50) PRIMARY KEY,
    price_multiplier DOUBLE DEFAULT 1.0 CHECK (price_multiplier > 0),
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
    origin_code CHAR(3) NOT NULL ,
    destination_code CHAR(3) NOT NULL ,
    distance INT,
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
    passport_id VARCHAR(20) UNIQUE NOT NULL,
    age INT CHECK ( age > 0 ),
    phone_number VARCHAR(20) NOT NULL ,
    email VARCHAR(100) NOT NULL 
);


-- did not make number of classes extensible, if this changed, triggers should change
CREATE TABLE Seat_class (
    seat_class_id INT PRIMARY KEY,
    seat_class_name VARCHAR(20) NOT NULL UNIQUE,  
    price_multiplier DOUBLE DEFAULT 1.0 CHECK (price_multiplier > 0) 
);

CREATE TABLE Seat (
    seat_id CHAR(36) PRIMARY KEY,
    seat_row INT NOT NULL,
    seat_column INT NOT NULL,
    is_reserved BOOLEAN DEFAULT false,
    model VARCHAR(50),
    flight_id CHAR(36) NOT NULL,
    seat_class_id INT NOT NULL,  -- Foreign key to SeatClass
    lock_until DATETIME DEFAULT NULL,
    FOREIGN KEY (seat_class_id) REFERENCES Seat_class(seat_class_id) ON DELETE CASCADE,
    FOREIGN KEY (model) REFERENCES Model(model) ON DELETE CASCADE,
    FOREIGN KEY (flight_id) REFERENCES Flight(flight_id) ON DELETE CASCADE
);

CREATE TABLE Booking (
    booking_id CHAR(36) PRIMARY KEY,
    flight_id CHAR(36) NOT NULL ,
    passenger_id CHAR(36) NOT NULL ,
    seat_id CHAR(36) NOT NULL ,
    user_id CHAR(36) ,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DOUBLE,
    payment_status VARCHAR(20) CHECK ( payment_status IN ('Pending', 'Paid', 'Failed', 'Cancelled') ),
    FOREIGN KEY (flight_id) REFERENCES Flight(flight_id) ON UPDATE CASCADE ,
    FOREIGN KEY (passenger_id) REFERENCES Passenger(passenger_id) ON UPDATE CASCADE ,
    FOREIGN KEY (seat_id) REFERENCES Seat(seat_id) ON UPDATE CASCADE ,
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON UPDATE CASCADE
);

-- must add privileged access
CREATE TABLE Config (
    config_key VARCHAR(50) PRIMARY KEY,  -- Unique key to identify the constant
    config_value DOUBLE NOT NULL,        -- Value of the constant
    description VARCHAR(100)             -- Description of what the constant is for
);

-- added here this doesnt belong outer scope
-- privileged
INSERT INTO Config (config_key, config_value, description)
VALUES
('base_price', 100.0, 'Base price for flight seat calculations'),
('route_factor', 1.2, 'Multiplier based on route distance for price adjustments');
