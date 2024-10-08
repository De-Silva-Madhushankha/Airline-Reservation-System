USE bairways;

-- Insert data into Location table
INSERT INTO Location (location_name, parent_location_id, location_type) VALUES
('World', NULL, 'Root'),
('Indonesia', 1, 'Country'),
('Jakarta', 2, 'City'),
('Bali', 2, 'City'),
('Sri Lanka', 1, 'Country'),
('Colombo', 5, 'City'),
('Mattala', 5, 'City'),
('India', 1, 'Country'),
('Delhi', 8, 'City'),
('Mumbai', 8, 'City'),
('Chennai', 8, 'City'),
('Thailand', 1, 'Country'),
('Bangkok', 12, 'City'),
('Don Mueang', 12, 'City'),
('Singapore', 1, 'Country'),
('Singapore City', 15, 'City');


INSERT INTO Seat_class (seat_class_id, seat_class_name, price_multiplier)
VALUES
(1, 'Economy', 1.0),
(2, 'Business', 1.5),
(3, 'Platinum', 2.0);

-- Insert data into Loyalty_Program table
INSERT INTO Loyalty_program (program_id, program_name, min_points, max_points, discount) VALUES
(1,'New',1,1,0),
(2, 'Frequent', 2, 9, 5),
(3, 'Gold', 10, 100,15);

-- Insert data into Role table
INSERT INTO Role (role_id, role_name, role_description, permission_type) VALUES
(1, 'Admin', 'System Administrator', 'Full Access'),
(2, 'Customer', 'Regular Customer', 'Booking Access');

-- Insert data into Airport table
INSERT INTO Airport (airport_name, location_id, airport_code)
VALUES
('Soekarno-Hatta International Airport', 3, 'CGK'),
('Ngurah Rai International Airport', 4, 'DPS'),
('Bandaranaike International Airport', 6, 'BIA'),
('Mattala Rajapaksa International Airport', 7, 'HRI'),
('Indira Gandhi International Airport', 9, 'DEL'),
('Chhatrapati Shivaji Maharaj International Airport', 10, 'BOM'),
('Chennai International Airport', 11, 'MAA'),
('Suvarnabhumi Airport', 13, 'BKK'),
('Don Mueang International Airport', 14, 'DMK'),
('Singapore Changi Airport', 16, 'SIN');

-- Insert data into Model table
INSERT INTO Model (model,num_columns,  num_economy_rows, num_business_rows, num_platinum_rows) VALUES
('Boeing 757', 4,  10, 2, 1),
('Airbus A380',4, 12, 3, 2),
('Boeing 737', 4, 8, 1, 1);

-- Insert data into Aircraft table
INSERT INTO Aircraft (aircraft_id, model)
VALUES
('BA737-001', 'Boeing 737'),
('BA737-002', 'Boeing 737'),
('BA737-003', 'Boeing 737'),
('BA757-001', 'Boeing 757'),
('BA757-002', 'Boeing 757'),
('BA757-003', 'Boeing 757'),
('BA757-004', 'Boeing 757'),
('AA380-001', 'Airbus A380');

-- Indonesia to Sri Lanka
INSERT INTO Route (distance, origin_code, destination_code)
VALUES
(3400, 'CGK', 'BIA'),  -- Jakarta to Colombo (approx 3400 km)
(3400, 'BIA', 'CGK'),  -- Colombo to Jakarta
(3600, 'DPS', 'BIA'),  -- Denpasar to Colombo (approx 3600 km)
(3600, 'BIA', 'DPS'),  -- Colombo to Denpasar
(3800, 'DPS', 'HRI'),  -- Denpasar to Mattala (approx 3800 km)
(3800, 'HRI', 'DPS'),  -- Mattala to Denpasar

-- Indonesia to India
(5800, 'CGK', 'DEL'),  -- Jakarta to Delhi (approx 5800 km)
(5800, 'DEL', 'CGK'),  -- Delhi to Jakarta
(5300, 'CGK', 'BOM'),  -- Jakarta to Mumbai (approx 5300 km)
(5300, 'BOM', 'CGK'),  -- Mumbai to Jakarta
(4400, 'CGK', 'MAA'),  -- Jakarta to Chennai (approx 4400 km)
(4400, 'MAA', 'CGK'),  -- Chennai to Jakarta
(5000, 'DPS', 'BOM'),  -- Denpasar to Mumbai (approx 5000 km)
(5000, 'BOM', 'DPS'),  -- Mumbai to Denpasar
(4300, 'DPS', 'MAA'),  -- Denpasar to Chennai (approx 4300 km)
(4300, 'MAA', 'DPS'),  -- Chennai to Denpasar

-- Indonesia to Thailand
(2300, 'CGK', 'BKK'),  -- Jakarta to Suvarnabhumi (approx 2300 km)
(2300, 'BKK', 'CGK'),  -- Suvarnabhumi to Jakarta
(2200, 'CGK', 'DMK'),  -- Jakarta to Don Mueang (approx 2200 km)
(2200, 'DMK', 'CGK'),  -- Don Mueang to Jakarta
(2900, 'DPS', 'BKK'),  -- Denpasar to Suvarnabhumi (approx 2900 km)
(2900, 'BKK', 'DPS'),  -- Suvarnabhumi to Denpasar
(2800, 'DPS', 'DMK'),  -- Denpasar to Don Mueang (approx 2800 km)
(2800, 'DMK', 'DPS'),  -- Don Mueang to Denpasar

-- Indonesia to Singapore
(900, 'CGK', 'SIN'),   -- Jakarta to Singapore (approx 900 km)
(900, 'SIN', 'CGK'),   -- Singapore to Jakarta
(1700, 'DPS', 'SIN'),  -- Denpasar to Singapore (approx 1700 km)
(1700, 'SIN', 'DPS'),  -- Singapore to Denpasar

-- Sri Lanka to India
(2400, 'BIA', 'DEL'),  -- Colombo to Delhi (approx 2400 km)
(2400, 'DEL', 'BIA'),  -- Delhi to Colombo
(1600, 'BIA', 'BOM'),  -- Colombo to Mumbai (approx 1600 km)
(1600, 'BOM', 'BIA'),  -- Mumbai to Colombo
(1200, 'BIA', 'MAA'),  -- Colombo to Chennai (approx 1200 km)
(1200, 'MAA', 'BIA'),  -- Chennai to Colombo
(2500, 'HRI', 'DEL'),  -- Mattala to Delhi (approx 2500 km)
(2500, 'DEL', 'HRI'),  -- Delhi to Mattala
(1300, 'HRI', 'MAA'),  -- Mattala to Chennai (approx 1300 km)
(1300, 'MAA', 'HRI'),  -- Chennai to Mattala

-- India to Thailand
(2900, 'DEL', 'BKK'),  -- Delhi to Suvarnabhumi (approx 2900 km)
(2900, 'BKK', 'DEL'),  -- Suvarnabhumi to Delhi
(3000, 'BOM', 'DMK'),  -- Mumbai to Don Mueang (approx 3000 km)
(3000, 'DMK', 'BOM'),  -- Don Mueang to Mumbai
(2300, 'MAA', 'BKK'),  -- Chennai to Suvarnabhumi (approx 2300 km)
(2300, 'BKK', 'MAA'),  -- Suvarnabhumi to Chennai
(2200, 'MAA', 'DMK'),  -- Chennai to Don Mueang (approx 2200 km)
(2200, 'DMK', 'MAA'),  -- Don Mueang to Chennai

-- Sri Lanka to Thailand
(2400, 'BIA', 'BKK'),  -- Colombo to Suvarnabhumi (approx 2400 km)
(2400, 'BKK', 'BIA'),  -- Suvarnabhumi to Colombo

-- Sri Lanka to Singapore
(2800, 'BIA', 'SIN'),  -- Colombo to Singapore (approx 2800 km)
(2800, 'SIN', 'BIA'),  -- Singapore to Colombo
(3000, 'HRI', 'SIN'),  -- Mattala to Singapore (approx 3000 km)
(3000, 'SIN', 'HRI');  -- Singapore to Mattala

-- Day 1: 2024-11-01
INSERT INTO Flight (flight_id, route_id, aircraft_id, departure, arrival)
VALUES
( UUID(),1, 'BA737-001', '2024-11-01 06:00:00', '2024-11-01 09:00:00'),  -- CGK to DPS
( UUID(),2, 'BA737-002', '2024-11-01 10:00:00', '2024-11-01 13:00:00'),  -- DPS to CGK
( UUID(),3, 'BA757-001', '2024-11-01 07:00:00', '2024-11-01 09:30:00'),  -- CGK to BIA
( UUID(),11, 'BA757-002', '2024-11-01 12:00:00', '2024-11-01 14:30:00'),  -- BIA to CGK
( UUID(),5, 'BA757-003', '2024-11-01 08:00:00', '2024-11-01 10:30:00'),  -- DPS to HRI
( UUID(),16, 'BA757-004', '2024-11-01 14:00:00', '2024-11-01 16:30:00'),  -- HRI to DPS
( UUID(),7, 'AA380-001', '2024-11-01 09:00:00', '2024-11-01 13:00:00'),  -- CGK to DEL
( UUID(),18, 'AA380-001', '2024-11-01 23:00:00', '2024-11-01 01:00:00'),  -- DEL to CGK
( UUID(),9, 'BA737-001', '2024-11-01 12:00:00', '2024-11-01 15:00:00');  -- CGK to SIN

-- Day 2: 2024-11-02
INSERT INTO Flight ( flight_id,route_id, aircraft_id, departure, arrival)
VALUES
( UUID(),10, 'BA737-002', '2024-11-02 06:00:00', '2024-11-02 09:00:00'),  -- DPS to SIN
( UUID(),1, 'BA737-003', '2024-11-02 10:00:00', '2024-11-02 13:00:00'),  -- SIN to DPS
( UUID(),32, 'BA757-001', '2024-11-02 07:00:00', '2024-11-02 09:30:00'),  -- BIA to MAA
( UUID(),13, 'BA757-002', '2024-11-02 11:00:00', '2024-11-02 13:30:00'),  -- MAA to BIA
( UUID(),4, 'BA757-003', '2024-11-02 08:00:00', '2024-11-02 10:30:00'),  -- BIA to BOM
( UUID(),15, 'BA757-004', '2024-11-02 14:00:00', '2024-11-02 16:30:00'),  -- BOM to BIA
( UUID(),16, 'AA380-001', '2024-11-02 09:00:00', '2024-11-02 13:00:00'),  -- CGK to BKK
( UUID(),17, 'AA380-001', '2024-11-02 15:00:00', '2024-11-02 19:00:00'),  -- BKK to CGK
( UUID(),48, 'BA737-001', '2024-11-02 22:00:00', '2024-11-02 02:00:00');  -- DPS to DEL

-- Day 3: 2024-11-03
INSERT INTO Flight ( flight_id,route_id, aircraft_id, departure, arrival)
VALUES
( UUID(),19, 'BA737-002', '2024-11-03 06:00:00', '2024-11-03 09:00:00'),  -- DPS to MAA
( UUID(),20, 'BA737-003', '2024-11-03 10:00:00', '2024-11-03 13:00:00'),  -- MAA to DPS
( UUID(),21, 'BA757-001', '2024-11-03 07:00:00', '2024-11-03 09:30:00'),  -- CGK to DMK
( UUID(),32, 'BA757-002', '2024-11-03 11:00:00', '2024-11-03 13:30:00'),  -- DMK to CGK
( UUID(),3, 'BA757-003', '2024-11-03 08:00:00', '2024-11-03 10:30:00'),  -- DPS to BKK
( UUID(),24, 'BA757-004', '2024-11-03 14:00:00', '2024-11-03 16:30:00'),  -- BKK to DPS
( UUID(),5, 'AA380-001', '2024-11-03 09:00:00', '2024-11-03 13:00:00'),  -- CGK to BOM
( UUID(),26, 'AA380-001', '2024-11-03 05:00:00', '2024-11-03 09:00:00'),  -- BOM to CGK
( UUID(),47, 'BA737-001', '2024-11-03 12:00:00', '2024-11-03 15:00:00');  -- CGK to HRI

-- Day 4: 2024-11-04
INSERT INTO Flight ( flight_id,route_id, aircraft_id, departure, arrival)
VALUES
( UUID(),48, 'BA737-002', '2024-11-04 06:00:00', '2024-11-04 09:00:00'),  -- DPS to DEL
( UUID(),29, 'BA737-003', '2024-11-04 11:00:00', '2024-11-04 14:00:00'),  -- DEL to DPS
( UUID(),30, 'BA757-001', '2024-11-04 07:00:00', '2024-11-04 10:30:00'),  -- BIA to BKK
( UUID(),31, 'BA757-002', '2024-11-04 11:00:00', '2024-11-04 13:30:00'),  -- BKK to BIA
( UUID(),2, 'BA757-003', '2024-11-04 08:00:00', '2024-11-04 10:30:00'),  -- HRI to SIN
( UUID(),33, 'BA757-004', '2024-11-04 14:00:00', '2024-11-04 16:30:00'),  -- SIN to HRI
( UUID(),34, 'AA380-001', '2024-11-04 09:00:00', '2024-11-04 13:00:00'),  -- CGK to MAA
( UUID(),35, 'AA380-001', '2024-11-04 15:00:00', '2024-11-04 19:00:00'),  -- MAA to CGK
( UUID(),6, 'BA737-001', '2024-11-04 12:00:00', '2024-11-04 15:00:00');  -- DPS to DMK

-- Day 5: 2024-11-05
INSERT INTO Flight ( flight_id,route_id, aircraft_id, departure, arrival)
VALUES
( UUID(),37, 'BA737-002', '2024-11-05 06:00:00', '2024-11-05 09:00:00'),  -- DPS to BIA
( UUID(),18, 'BA737-003', '2024-11-05 10:00:00', '2024-11-05 13:00:00'),  -- BIA to DPS
( UUID(),29, 'BA757-001', '2024-11-05 07:00:00', '2024-11-05 09:30:00'),  -- DPS to BOM
( UUID(),40, 'BA757-002', '2024-11-05 11:00:00', '2024-11-05 13:30:00'),  -- BOM to DPS
( UUID(),1, 'BA757-003', '2024-11-05 08:00:00', '2024-11-05 10:30:00'),  -- CGK to SIN
( UUID(),42, 'BA757-004', '2024-11-05 14:00:00', '2024-11-05 16:30:00'),  -- SIN to CGK
( UUID(),33, 'AA380-001', '2024-11-05 09:00:00', '2024-11-05 13:00:00'),  -- CGK to DMK
( UUID(),44, 'AA380-001', '2024-11-05 15:00:00', '2024-11-05 19:00:00'),  -- DMK to CGK
( UUID(),35, 'BA737-001', '2024-11-05 22:00:00', '2024-11-05 02:00:00');  -- DPS to BKK

-- Day 6: 2024-11-06
INSERT INTO Flight ( flight_id,route_id, aircraft_id, departure, arrival)
VALUES
( UUID(),46, 'BA737-002', '2024-11-06 06:00:00', '2024-11-06 09:00:00'),  -- DPS to MAA
( UUID(),17, 'BA737-003', '2024-11-06 10:00:00', '2024-11-06 13:00:00'),  -- MAA to DPS
( UUID(),28, 'BA757-001', '2024-11-06 07:00:00', '2024-11-06 09:30:00'),  -- HRI to DEL
( UUID(),49, 'BA757-002', '2024-11-06 11:00:00', '2024-11-06 13:30:00'),  -- DEL to HRI
( UUID(),50, 'BA757-003', '2024-11-06 08:00:00', '2024-11-06 10:30:00'),  -- CGK to BIA
( UUID(),11, 'BA757-004', '2024-11-06 14:00:00', '2024-11-06 16:30:00'),  -- BIA to CGK
( UUID(),52, 'AA380-001', '2024-11-06 09:00:00', '2024-11-06 13:00:00'),  -- DPS to BKK
( UUID(),23, 'AA380-001', '2024-11-06 05:00:00', '2024-11-06 09:00:00'),  -- BKK to DPS
( UUID(),14, 'BA737-001', '2024-11-06 12:00:00', '2024-11-06 15:00:00');  -- DPS to DEL

-- Day 7: 2024-11-07
INSERT INTO Flight ( flight_id,route_id, aircraft_id, departure, arrival)
VALUES
( UUID(),5, 'BA737-002', '2024-11-07 06:00:00', '2024-11-07 09:00:00'),  -- DPS to BOM
( UUID(),16, 'BA737-003', '2024-11-07 10:00:00', '2024-11-07 13:00:00'),  -- BOM to DPS
( UUID(),27, 'BA757-001', '2024-11-07 07:00:00', '2024-11-07 09:30:00'),  -- CGK to HRI
( UUID(),48, 'BA757-002', '2024-11-07 11:00:00', '2024-11-07 13:30:00'),  -- HRI to CGK
( UUID(),9, 'BA757-003', '2024-11-07 08:00:00', '2024-11-07 10:30:00'),  -- CGK to BKK
( UUID(),40, 'BA757-004', '2024-11-07 14:00:00', '2024-11-07 16:30:00'),  -- BKK to CGK
( UUID(),21, 'AA380-001', '2024-11-07 09:00:00', '2024-11-07 13:00:00'),  -- DPS to SIN
( UUID(),2, 'AA380-001', '2024-11-07 15:00:00', '2024-11-07 19:00:00'),  -- SIN to DPS
( UUID(),3, 'BA737-001', '2024-11-07 12:00:00', '2024-11-07 15:00:00');  -- DPS to CGK

-- Day 8: 2024-11-08
INSERT INTO Flight ( flight_id,route_id, aircraft_id, departure, arrival)
VALUES
( UUID(),1, 'BA737-001', '2024-11-08 18:00:00', '2024-11-08 23:00:00'),  -- CGK to DPS
( UUID(),2, 'BA737-002', '2024-11-08 10:00:00', '2024-11-08 13:00:00'),  -- DPS to CGK
( UUID(),33, 'BA757-001', '2024-11-08 07:00:00', '2024-11-08 09:30:00'),  -- CGK to BIA
( UUID(),4, 'BA757-002', '2024-11-08 21:00:00', '2024-11-08 23:30:00'),  -- BIA to CGK
( UUID(),25, 'BA757-003', '2024-11-08 10:00:00', '2024-11-08 12:30:00'),  -- DPS to HRI
( UUID(),6, 'BA757-004', '2024-11-08 14:00:00', '2024-11-08 16:30:00'),  -- HRI to DPS
( UUID(),47, 'AA380-001', '2024-11-08 09:00:00', '2024-11-08 13:00:00'),  -- CGK to DEL
( UUID(),8, 'AA380-001', '2024-11-08 15:00:00', '2024-11-08 19:00:00'),  -- DEL to CGK
( UUID(),9, 'BA737-003', '2024-11-08 22:00:00', '2024-11-08 01:00:00'),  -- DPS to SIN
( UUID(),10, 'BA737-001', '2024-11-08 16:00:00', '2024-11-08 19:00:00');  -- SIN to DPS

-- Day 9: 2024-11-09
INSERT INTO Flight ( flight_id,route_id, aircraft_id, departure, arrival)
VALUES
( UUID(),10, 'BA737-002', '2024-11-09 06:00:00', '2024-11-09 09:00:00'),  -- DPS to SIN
( UUID(),11, 'BA737-003', '2024-11-09 10:00:00', '2024-11-09 13:00:00'),  -- SIN to DPS
( UUID(),12, 'BA757-001', '2024-11-09 07:00:00', '2024-11-09 09:30:00'),  -- BIA to MAA
( UUID(),13, 'BA757-002', '2024-11-09 11:00:00', '2024-11-09 13:30:00'),  -- MAA to BIA
( UUID(),24, 'BA757-003', '2024-11-09 08:00:00', '2024-11-09 10:30:00'),  -- BIA to BOM
( UUID(),15, 'BA757-004', '2024-11-09 14:00:00', '2024-11-09 16:30:00'),  -- BOM to BIA
( UUID(),36, 'AA380-001', '2024-11-09 09:00:00', '2024-11-09 13:00:00'),  -- CGK to BKK
( UUID(),17, 'AA380-001', '2024-11-09 15:00:00', '2024-11-09 19:00:00'),  -- BKK to CGK
( UUID(),8, 'BA737-001', '2024-11-09 12:00:00', '2024-11-09 15:00:00'),  -- DPS to DEL
( UUID(),19, 'BA737-002', '2024-11-09 18:00:00', '2024-11-09 21:00:00');  -- DEL to DPS

-- Day 10: 2024-11-10
INSERT INTO Flight ( flight_id,route_id, aircraft_id, departure, arrival)
VALUES
( UUID(),20, 'BA737-003', '2024-11-10 06:00:00', '2024-11-10 09:00:00'),  -- DPS to MAA
( UUID(),21, 'BA737-001', '2024-11-10 10:00:00', '2024-11-10 13:00:00'),  -- MAA to DPS
( UUID(),32, 'BA757-001', '2024-11-10 08:00:00', '2024-11-10 10:30:00'),  -- CGK to DMK
( UUID(),23, 'BA757-002', '2024-11-10 11:00:00', '2024-11-10 13:30:00'),  -- DMK to CGK
( UUID(),14, 'BA757-003', '2024-11-10 08:00:00', '2024-11-10 10:30:00'),  -- DPS to BKK
( UUID(),25, 'BA757-004', '2024-11-10 14:00:00', '2024-11-10 16:30:00'),  -- BKK to DPS
( UUID(),6, 'AA380-001', '2024-11-10 09:00:00', '2024-11-10 13:00:00'),  -- CGK to BOM
( UUID(),7, 'AA380-001', '2024-11-10 15:00:00', '2024-11-10 19:00:00'),  -- BOM to CGK
( UUID(),28, 'BA737-002', '2024-11-10 22:00:00', '2024-11-10 01:00:00'),  -- CGK to HRI
( UUID(),29, 'BA737-003', '2024-11-10 17:00:00', '2024-11-10 20:00:00');  -- HRI to CGK

-- Day 11: 2024-11-11
INSERT INTO Flight ( flight_id,route_id, aircraft_id, departure, arrival)
VALUES
( UUID(),50, 'BA737-001', '2024-11-11 06:00:00', '2024-11-11 09:00:00'),  -- DPS to DEL
( UUID(),31, 'BA737-002', '2024-11-11 10:00:00', '2024-11-11 13:00:00'),  -- DEL to DPS
( UUID(),52, 'BA757-001', '2024-11-11 02:00:00', '2024-11-11 05:30:00'),  -- BIA to BKK
( UUID(),13, 'BA757-002', '2024-11-11 11:00:00', '2024-11-11 13:30:00'),  -- BKK to BIA
( UUID(),34, 'BA757-003', '2024-11-11 08:00:00', '2024-11-11 10:30:00'),  -- HRI to SIN
( UUID(),5, 'BA757-004', '2024-11-11 14:00:00', '2024-11-11 16:30:00'),  -- SIN to HRI
( UUID(),36, 'AA380-001', '2024-11-11 09:00:00', '2024-11-11 13:00:00'),  -- CGK to MAA
( UUID(),7, 'AA380-001', '2024-11-11 15:00:00', '2024-11-11 19:00:00'),  -- MAA to CGK
( UUID(),38, 'BA737-003', '2024-11-11 12:00:00', '2024-11-11 15:00:00'),  -- DPS to DMK
( UUID(),29, 'BA737-001', '2024-11-11 20:00:00', '2024-11-11 23:00:00');  -- DMK to DPS



INSERT INTO User (user_id, title, first_name, last_name, email, password, date_of_birth, country, mobile_number)
VALUES
(UUID(),  'Mr', 'John', 'Doe', 'john.doe@example.com', '$2y$10$7zT5NfErm0V1HYp/OgFmneQF/zVb1t7CH9OwGZK/o/E2WiLEpsm92', '1985-07-15', 'USA', '+1234567890'),
(UUID(),  'Ms', 'Jane', 'Smith', 'jane.smith@example.com', '$2y$10$C6UzMDM.H6dfI/f/IKOTkuD.u0uAOsCqwrX4jtLS2IG6zG8QroQhO', '1990-11-22', 'UK', '+441234567890'),
(UUID(),  'Mrs', 'Emily', 'Brown', 'emily.brown@example.com', '$2y$10$f/xA4wZPxtMvQs8d1L4woOUhJgP8X9sIhc0Azh5vHd8WuRqQFISGu', '1978-05-30', 'Canada', '+15141234567'),
(UUID(),  'Mr', 'Michael', 'Johnson', 'michael.johnson@example.com', '$2y$10$kYhCk3JzSA9AKopLUQyGGOhfsy.uh.DCfsqFGxQV4g3exOCEpVq7u', '1982-09-10', 'Australia', '+61412345678'),
(UUID(),  'Mrs', 'Sarah', 'Lee', 'sarah.lee@example.com', '$2y$10$a2YjtN5NnO.uEFmLPEzleuc8k.kSDpC6uMGKGGZP1Ja3bJch/Og6u', '1988-02-14', 'South Korea', '+821012345678'),
(UUID(),  'Ms', 'Olivia', 'Williams', 'olivia.williams@example.com', '$2y$10$1.cZOv.vJvWmsAAyOE1gvuNRoi6dnYHxsQrbz8g9N7UQaNUsBuO7C', '1992-04-05', 'New Zealand', '+642123456789'),
(UUID(),  'Mr', 'Liam', 'Garcia', 'liam.garcia@example.com', '$2y$10$E5NtoJ/T7b7tHe2h.JF4z.OYgE68kWekU1/zJ.Mh5ucNJG1Ijo2lS', '1989-08-19', 'Mexico', '+521234567890'),
(UUID(), 'Mrs', 'Sophia', 'Martinez', 'sophia.martinez@example.com', '$2y$10$d1dU9STK2gFXUK9r5cZ6XuDsyKHLnlzPzHVosEdikFrci5e.SLPk6', '1987-12-01', 'Spain', '+349123456789'),
(UUID(),  'Mr', 'Alexander', 'Nguyen', 'alex.nguyen@example.com', '$2y$10$ZPpTkEJpmsAGe8EqL6j/YuOjwSKsO9vBWn2giGIXkpEyU53AhYFb6', '1980-03-17', 'Vietnam', '+849012345678'),
(UUID(),  'Mr', 'James', 'Chen', 'james.chen@example.com', '$2y$10$cO.ZJXnlBgWJ6OhzIRlFAeP.VMK9yBhFlGVYJoKzKMfRkFgtbS5vK', '1995-10-11', 'Singapore', '+6581234567'),
(UUID(),  'Ms', 'Isabella', 'Kim', 'isabella.kim@example.com', '$2y$10$QZ5hLPr5/tP5wQ3hEFP7aORIVTukKpY/KDEUnNjiyYseIqIaN17ou', '1984-06-23', 'South Korea', '+821234567890'),
(UUID(),  'Mr', 'William', 'Kumar', 'william.kumar@example.com', '$2y$10$FH0/U6RJzt0XB4iAtsDEieWXrsr1oKlfHHTzyh7ZmODlkPK9ANtaK', '1991-01-29', 'India', '+911234567890'),
(UUID(), 'Mrs', 'Mia', 'Rodriguez', 'mia.rodriguez@example.com', '$2y$10$D1.yrx3NPIS.3ZgO4QZbHuh7h4B4scKgrP4pHMqj6fjcqU8Tp50me', '1986-09-13', 'Argentina', '+541234567890'),
(UUID(),  'Mr', 'Elijah', 'Hassan', 'elijah.hassan@example.com', '$2y$10$5XYODux/NqE5/MHZ3H.kRuUsNHhxImQCjkJHArH3KUO7HP3XeHrpu', '1979-11-04', 'Egypt', '+201123456789'),
(UUID(),  'Mr', 'David', 'Smith', 'david.smith@example.com', '$2y$10$N8/mwCRsSHFxSyCKRLz4/uFyb0E9RUhzSRKlf04/TluIMB8rbcrzO', '1983-02-28', 'USA', '+121234567890');


-- System Administrator

INSERT INTO User (user_id, title, first_name, last_name, email, password, date_of_birth, country, mobile_number,role_id)
VALUES (UUID(), 'Mr', 'Admin', 'Bairways', 'admin@bairways.com', '$2b$12$dkIRzA27qdodvIY0DP0Rx.iub5LciRKLsSlIpvwvICb05m82Ie73y', '2002-10-26', 'LK', '+94704424913',1);


-- passengers  -- guest customers

INSERT INTO Passenger (passenger_id, first_name, last_name, passport_id, age, phone_number, email, is_registered) VALUES
(UUID(), 'Emily', 'Smith', 'P123456001', 28, '+1-234-555-1001', 'emily.smith@example.com', FALSE),
(UUID(), 'Michael', 'Johnson', 'P123456002', 35, '+1-234-555-1002', 'michael.johnson@example.com', FALSE),
(UUID(), 'Sarah', 'Williams', 'P123456003', 42, '+1-234-555-1003', 'sarah.williams@example.com', FALSE),
(UUID(), 'David', 'Brown', 'P123456004', 30, '+1-234-555-1004', 'david.brown@example.com', FALSE),
(UUID(), 'Jessica', 'Jones', 'P123456005', 37, '+1-234-555-1005', 'jessica.jones@example.com', FALSE),
(UUID(), 'James', 'Garcia', 'P123456006', 25, '+1-234-555-1006', 'james.garcia@example.com', FALSE),
(UUID(), 'Laura', 'Martinez', 'P123456007', 31, '+1-234-555-1007', 'laura.martinez@example.com', FALSE),
(UUID(), 'Robert', 'Hernandez', 'P123456008', 45, '+1-234-555-1008', 'robert.hernandez@example.com', FALSE),
(UUID(), 'Linda', 'Lopez', 'P123456009', 39, '+1-234-555-1009', 'linda.lopez@example.com', FALSE),
(UUID(), 'William', 'Wilson', 'P123456010', 28, '+1-234-555-1010', 'william.wilson@example.com', FALSE),
(UUID(), 'Barbara', 'Anderson', 'P123456011', 34, '+1-234-555-1011', 'barbara.anderson@example.com', FALSE),
(UUID(), 'Charles', 'Thomas', 'P123456012', 41, '+1-234-555-1012', 'charles.thomas@example.com', FALSE),
(UUID(), 'Susan', 'Taylor', 'P123456013', 29, '+1-234-555-1013', 'susan.taylor@example.com', FALSE),
(UUID(), 'Daniel', 'Moore', 'P123456014', 36, '+1-234-555-1014', 'daniel.moore@example.com', FALSE),
(UUID(), 'Jessica', 'Jackson', 'P123456015', 27, '+1-234-555-1015', 'jessica.jackson@example.com', FALSE),
(UUID(), 'Joseph', 'White', 'P123456016', 32, '+1-234-555-1016', 'joseph.white@example.com', FALSE),
(UUID(), 'Karen', 'Harris', 'P123456017', 40, '+1-234-555-1017', 'karen.harris@example.com', FALSE),
(UUID(), 'Brian', 'Martin', 'P123456018', 33, '+1-234-555-1018', 'brian.martin@example.com', FALSE),
(UUID(), 'Emily', 'Thompson', 'P123456019', 38, '+1-234-555-1019', 'emily.thompson@example.com', FALSE),
(UUID(), 'Kevin', 'Garcia', 'P123456020', 26, '+1-234-555-1020', 'kevin.garcia@example.com', FALSE),
(UUID(), 'Rebecca', 'Martinez', 'P123456021', 29, '+1-234-555-1021', 'rebecca.martinez@example.com', FALSE),
(UUID(), 'Matthew', 'Robinson', 'P123456022', 44, '+1-234-555-1022', 'matthew.robinson@example.com', FALSE),
(UUID(), 'Laura', 'Clark', 'P123456023', 31, '+1-234-555-1023', 'laura.clark@example.com', FALSE),
(UUID(), 'Stephen', 'Rodriguez', 'P123456024', 35, '+1-234-555-1024', 'stephen.rodriguez@example.com', FALSE),
(UUID(), 'Michelle', 'Lewis', 'P123456025', 39, '+1-234-555-1025', 'michelle.lewis@example.com', FALSE),
(UUID(), 'Paul', 'Lee', 'P123456026', 29, '+1-234-555-1026', 'paul.lee@example.com', FALSE),
(UUID(), 'Elizabeth', 'Walker', 'P123456027', 30, '+1-234-555-1027', 'elizabeth.walker@example.com', FALSE),
(UUID(), 'Daniel', 'Hall', 'P123456028', 27, '+1-234-555-1028', 'daniel.hall@example.com', FALSE),
(UUID(), 'Deborah', 'Allen', 'P123456029', 42, '+1-234-555-1029', 'deborah.allen@example.com', FALSE),
(UUID(), 'Matthew', 'Young', 'P123456030', 34, '+1-234-555-1030', 'matthew.young@example.com', FALSE),
(UUID(), 'Christopher', 'Hernandez', 'P123456031', 40, '+1-234-555-1031', 'christopher.hernandez@example.com', FALSE),
(UUID(), 'Sharon', 'King', 'P123456032', 36, '+1-234-555-1032', 'sharon.king@example.com', FALSE),
(UUID(), 'Anthony', 'Wright', 'P123456033', 29, '+1-234-555-1033', 'anthony.wright@example.com', FALSE),
(UUID(), 'Nancy', 'Scott', 'P123456034', 35, '+1-234-555-1034', 'nancy.scott@example.com', FALSE),
(UUID(), 'Rebecca', 'Green', 'P123456035', 38, '+1-234-555-1035', 'rebecca.green@example.com', FALSE),
(UUID(), 'Gary', 'Adams', 'P123456036', 43, '+1-234-555-1036', 'gary.adams@example.com', FALSE),
(UUID(), 'Deborah', 'Baker', 'P123456037', 32, '+1-234-555-1037', 'deborah.baker@example.com', FALSE),
(UUID(), 'Brian', 'Gonzalez', 'P123456038', 36, '+1-234-555-1038', 'brian.gonzalez@example.com', FALSE),
(UUID(), 'Karen', 'Nelson', 'P123456039', 27, '+1-234-555-1039', 'karen.nelson@example.com', FALSE),
(UUID(), 'Michelle', 'Carter', 'P123456040', 30, '+1-234-555-1040', 'michelle.carter@example.com', FALSE);



