CREATE DATABASE BAirwaysDB

USE BAirwaysDB

CREATE TABLE Location (
    location_id INT PRIMARY KEY AUTO_INCREMENT,
    location_name VARCHAR(50),
    parent_location_id INT,
    location_type VARCHAR(50),
    FOREIGN KEY (parent_location_id) REFERENCES Location(location_id)
);


CREATE TABLE Loyalty_Program (
    program_id INT PRIMARY KEY AUTO_INCREMENT,
    program_name VARCHAR(50),
    min_points INT,
    max_points INT
);


CREATE TABLE Role (
    role_id INT PRIMARY KEY,
    role_name VARCHAR(50),
    role_description VARCHAR(255),
    permission_type VARCHAR(50)
);


CREATE TABLE Airport (
    airport_code CHAR(3) PRIMARY KEY,
    airport_name VARCHAR(50),
    location_id INT,
    FOREIGN KEY (location_id) REFERENCES Location(location_id)
);


CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    role_id INT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50),
    user_phone_number VARCHAR(20),
    user_email VARCHAR(100),
    loyalty_points INT,
    FOREIGN KEY (role_id) REFERENCES Role(role_id)
);


CREATE TABLE Model (
    model VARCHAR(50) PRIMARY KEY,
    template_id INT,
    num_economy_seats INT,
    num_business_seats INT,
    num_platinum_seats INT
);


CREATE TABLE Aircraft (
    aircraft_id VARCHAR(10) PRIMARY KEY,
    model VARCHAR(50),
    FOREIGN KEY (model) REFERENCES Model(model)
);


CREATE TABLE Route (
    route_id INT PRIMARY KEY AUTO_INCREMENT,
    base_price DOUBLE,
    origin_code CHAR(3),
    destination_code CHAR(3),
    FOREIGN KEY (origin_code) REFERENCES Airport(airport_code),
    FOREIGN KEY (destination_code) REFERENCES Airport(airport_code)
);


CREATE TABLE Flight (
    flight_id INT PRIMARY KEY AUTO_INCREMENT,
    route_id INT,
    aircraft_id VARCHAR(10),
    departure TIMESTAMP,
    arrival TIMESTAMP,
    FOREIGN KEY (route_id) REFERENCES Route(route_id),
    FOREIGN KEY (aircraft_id) REFERENCES Aircraft(aircraft_id)
);


CREATE TABLE Passenger (
    passenger_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    name VARCHAR(50),
    age INT,
    phone_number VARCHAR(20),
    email VARCHAR(100),
    is_registered BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);


CREATE TABLE Seat (
    seat_id INT PRIMARY KEY AUTO_INCREMENT,
    seat_code VARCHAR(10),
    seat_class VARCHAR(20),
    seat_price DOUBLE,
    is_reserved BOOLEAN
);


CREATE TABLE Seat_Map (
    template_id INT PRIMARY KEY,
    seat_id INT,
    FOREIGN KEY (seat_id) REFERENCES Seat(seat_id)
);



CREATE TABLE Booking (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    flight_id INT,
    passenger_id INT,
    seat_id INT,
    booking_date TIMESTAMP,
    total_amount DOUBLE,
    payment_status VARCHAR(20),
    FOREIGN KEY (flight_id) REFERENCES Flight(flight_id),
    FOREIGN KEY (passenger_id) REFERENCES Passenger(passenger_id),
    FOREIGN KEY (seat_id) REFERENCES Seat(seat_id)
);

ALTER TABLE model
ADD CONSTRAINT tem_fk FOREIGN KEY (template_id)
REFERENCES seat_map(template_id);


CREATE VIEW search_flights AS
    SELECT  route.origin_code, route.destination_code, DATE(flight.departure) departure, TIME(flight.departure) dep_time, DATE(flight.arrival) arrival, TIME(flight.arrival) arr_time, flight.aircraft_id
    FROM  flight INNER JOIN route USING(route_id);

--SELECT * FROM search_flights WHERE origin_code = 'CGK' AND destination_code = 'BIA' AND departure >= '2024-09-01' AND arrival <= '2024-09-05';

CREATE VIEW user_info AS
    SELECT user.user_id, user.title ,user.first_name, user.last_name, user.email, user.mobile_number, user.country, user.date_of_birth, user.loyalty_points
    FROM user;

CREATE VIEW user_bookings AS
    SELECT passenger.user_id, booking.booking_id, booking.flight_id, booking.seat_id, booking.booking_date, booking.total_amount, booking.payment_status
    FROM booking INNER JOIN passenger USING (passenger_id);


-- write a trigger to make every user a passenger too
-- write a trigger to increment loyalty points for every booking