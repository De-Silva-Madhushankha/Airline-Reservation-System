-- Insert data into Location table
INSERT INTO location (location_name, parent_location_id, location_type) VALUES 
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





-- Insert data into Loyalty_Program table
INSERT INTO loyalty_program (program_id, program_name, min_points, max_points) VALUES 
(1, 'Frequent', 1, 9),
(2, 'Gold', 10, 100);





-- Insert data into Role table
INSERT INTO Role (role_id, role_name, role_description, permission_type) VALUES
(1, 'Admin', 'System Administrator', 'Full Access'),
(2, 'Customer', 'Regular Customer', 'Booking Access');






-- Insert data into Airport table
INSERT INTO airport (airport_name, location_id, airport_code)
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
INSERT INTO Model (model, template_id, num_economy_seats, num_business_seats, num_platinum_seats) VALUES
('Boeing 757', 40, 5, 3),
('Airbus A380', 50, 10, 5),
('Boeing 737', 30, 6, 4);







-- Insert data into Aircraft table
INSERT INTO aircraft (aircraft_id, model)
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
INSERT INTO route (base_price, origin_code, destination_code)
VALUES 
(180.0, 'CGK', 'BIA'),  -- Jakarta to Colombo
(180.0, 'BIA', 'CGK'),  -- Colombo to Jakarta
(185.0, 'DPS', 'BIA'),  -- Denpasar to Colombo
(185.0, 'BIA', 'DPS'),  -- Colombo to Denpasar
(195.0, 'DPS', 'HRI'),  -- Denpasar to Mattala
(195.0, 'HRI', 'DPS'),  -- Mattala to Denpasar

-- Indonesia to India 
(220.0, 'CGK', 'DEL'),  -- Jakarta to Delhi
(220.0, 'DEL', 'CGK'),  -- Delhi to Jakarta
(210.0, 'CGK', 'BOM'),  -- Jakarta to Mumbai
(210.0, 'BOM', 'CGK'),  -- Mumbai to Jakarta
(215.0, 'CGK', 'MAA'),  -- Jakarta to Chennai
(215.0, 'MAA', 'CGK'),  -- Chennai to Jakarta
(225.0, 'DPS', 'BOM'),  -- Denpasar to Mumbai
(225.0, 'BOM', 'DPS'),  -- Mumbai to Denpasar
(235.0, 'DPS', 'MAA'),  -- Denpasar to Chennai
(235.0, 'MAA', 'DPS'),  -- Chennai to Denpasar

-- Indonesia  to Thailand 
(130.0, 'CGK', 'BKK'),  -- Jakarta to Suvarnabhumi
(130.0, 'BKK', 'CGK'),  -- Suvarnabhumi to Jakarta
(125.0, 'CGK', 'DMK'),  -- Jakarta to Don Mueang
(125.0, 'DMK', 'CGK'),  -- Don Mueang to Jakarta
(140.0, 'DPS', 'BKK'),  -- Denpasar to Suvarnabhumi
(140.0, 'BKK', 'DPS'),  -- Suvarnabhumi to Denpasar
(135.0, 'DPS', 'DMK'),  -- Denpasar to Don Mueang
(135.0, 'DMK', 'DPS'),  -- Don Mueang to Denpasar

-- Indonesia to Singapore 
(90.0, 'CGK', 'SIN'),   -- Jakarta to Singapore
(90.0, 'SIN', 'CGK'),   -- Singapore to Jakarta
(100.0, 'DPS', 'SIN'),  -- Denpasar to Singapore
(100.0, 'SIN', 'DPS'),  -- Singapore to Denpasar

-- Sri Lanka to India
(110.0, 'BIA', 'DEL'),  -- Colombo to Delhi
(110.0, 'DEL', 'BIA'),  -- Delhi to Colombo
(105.0, 'BIA', 'BOM'),  -- Colombo to Mumbai
(105.0, 'BOM', 'BIA'),  -- Mumbai to Colombo
(115.0, 'BIA', 'MAA'),  -- Colombo to Chennai
(115.0, 'MAA', 'BIA'),  -- Chennai to Colombo
(120.0, 'HRI', 'DEL'),  -- Mattala to Delhi
(120.0, 'DEL', 'HRI'),  -- Delhi to Mattala
(125.0, 'HRI', 'MAA'),  -- Mattala to Chennai
(125.0, 'MAA', 'HRI'),  -- Chennai to Mattala

-- India to Thailand 
(140.0, 'DEL', 'BKK'),  -- Delhi to Suvarnabhumi
(140.0, 'BKK', 'DEL'),  -- Suvarnabhumi to Delhii
(145.0, 'BOM', 'DMK'),  -- Mumbai to Don Mueang
(145.0, 'DMK', 'BOM'),  -- Don Mueang to Mumbai
(155.0, 'MAA', 'BKK'),  -- Chennai to Suvarnabhumi
(155.0, 'BKK', 'MAA'),  -- Suvarnabhumi to Chennai
(150.0, 'MAA', 'DMK'),  -- Chennai to Don Mueang
(150.0, 'DMK', 'MAA'),  -- Don Mueang to Chennai

-- Sri Lanka to Thailand 
(160.0, 'BIA', 'BKK'),  -- Colombo to Suvarnabhumi
(160.0, 'BKK', 'BIA'),  -- Suvarnabhumi to Colombo

-- Sri Lanka to Singapore
(170.0, 'BIA', 'SIN'),  -- Colombo to Singapore
(170.0, 'SIN', 'BIA'),  -- Singapore to Colombo
(175.0, 'HRI', 'SIN'),  -- Mattala to Singapore
(175.0, 'SIN', 'HRI');  -- Singapore to Mattala
















-- Day 1: 2024-09-01
INSERT INTO flight (route_id, aircraft_id, departure, arrival)
VALUES
(1, 'BA737-001', '2024-09-01 06:00:00', '2024-09-01 09:00:00'),  -- CGK to DPS
(2, 'BA737-002', '2024-09-01 10:00:00', '2024-09-01 13:00:00'),  -- DPS to CGK
(3, 'BA757-001', '2024-09-01 07:00:00', '2024-09-01 09:30:00'),  -- CGK to BIA
(11, 'BA757-002', '2024-09-01 12:00:00', '2024-09-01 14:30:00'),  -- BIA to CGK
(5, 'BA757-003', '2024-09-01 08:00:00', '2024-09-01 10:30:00'),  -- DPS to HRI
(16, 'BA757-004', '2024-09-01 14:00:00', '2024-09-01 16:30:00'),  -- HRI to DPS
(7, 'AA380-001', '2024-09-01 09:00:00', '2024-09-01 13:00:00'),  -- CGK to DEL
(18, 'AA380-001', '2024-09-01 23:00:00', '2024-09-01 01:00:00'),  -- DEL to CGK
(9, 'BA737-001', '2024-09-01 12:00:00', '2024-09-01 15:00:00');  -- CGK to SIN

-- Day 2: 2024-09-02
INSERT INTO flight (route_id, aircraft_id, departure, arrival)
VALUES
(10, 'BA737-002', '2024-09-02 06:00:00', '2024-09-02 09:00:00'),  -- DPS to SIN
(1, 'BA737-003', '2024-09-02 10:00:00', '2024-09-02 13:00:00'),  -- SIN to DPS
(32, 'BA757-001', '2024-09-02 07:00:00', '2024-09-02 09:30:00'),  -- BIA to MAA
(13, 'BA757-002', '2024-09-02 11:00:00', '2024-09-02 13:30:00'),  -- MAA to BIA
(4, 'BA757-003', '2024-09-02 08:00:00', '2024-09-02 10:30:00'),  -- BIA to BOM
(15, 'BA757-004', '2024-09-02 14:00:00', '2024-09-02 16:30:00'),  -- BOM to BIA
(16, 'AA380-001', '2024-09-02 09:00:00', '2024-09-02 13:00:00'),  -- CGK to BKK
(17, 'AA380-001', '2024-09-02 15:00:00', '2024-09-02 19:00:00'),  -- BKK to CGK
(48, 'BA737-001', '2024-09-02 22:00:00', '2024-09-02 02:00:00');  -- DPS to DEL

-- Day 3: 2024-09-03
INSERT INTO flight (route_id, aircraft_id, departure, arrival)
VALUES
(19, 'BA737-002', '2024-09-03 06:00:00', '2024-09-03 09:00:00'),  -- DPS to MAA
(20, 'BA737-003', '2024-09-03 10:00:00', '2024-09-03 13:00:00'),  -- MAA to DPS
(21, 'BA757-001', '2024-09-03 07:00:00', '2024-09-03 09:30:00'),  -- CGK to DMK
(32, 'BA757-002', '2024-09-03 11:00:00', '2024-09-03 13:30:00'),  -- DMK to CGK
(3, 'BA757-003', '2024-09-03 08:00:00', '2024-09-03 10:30:00'),  -- DPS to BKK
(24, 'BA757-004', '2024-09-03 14:00:00', '2024-09-03 16:30:00'),  -- BKK to DPS
(5, 'AA380-001', '2024-09-03 09:00:00', '2024-09-03 13:00:00'),  -- CGK to BOM
(26, 'AA380-001', '2024-09-03 05:00:00', '2024-09-03 09:00:00'),  -- BOM to CGK
(47, 'BA737-001', '2024-09-03 12:00:00', '2024-09-03 15:00:00');  -- CGK to HRI

-- Day 4: 2024-09-04
INSERT INTO flight (route_id, aircraft_id, departure, arrival)
VALUES
(48, 'BA737-002', '2024-09-04 06:00:00', '2024-09-04 09:00:00'),  -- DPS to DEL
(29, 'BA737-003', '2024-09-04 11:00:00', '2024-09-04 14:00:00'),  -- DEL to DPS
(30, 'BA757-001', '2024-09-04 07:00:00', '2024-09-04 10:30:00'),  -- BIA to BKK
(31, 'BA757-002', '2024-09-04 11:00:00', '2024-09-04 13:30:00'),  -- BKK to BIA
(2, 'BA757-003', '2024-09-04 08:00:00', '2024-09-04 10:30:00'),  -- HRI to SIN
(33, 'BA757-004', '2024-09-04 14:00:00', '2024-09-04 16:30:00'),  -- SIN to HRI
(34, 'AA380-001', '2024-09-04 09:00:00', '2024-09-04 13:00:00'),  -- CGK to MAA
(35, 'AA380-001', '2024-09-04 15:00:00', '2024-09-04 19:00:00'),  -- MAA to CGK
(6, 'BA737-001', '2024-09-04 12:00:00', '2024-09-04 15:00:00');  -- DPS to DMK

-- Day 5: 2024-09-05
INSERT INTO flight (route_id, aircraft_id, departure, arrival)
VALUES
(37, 'BA737-002', '2024-09-05 06:00:00', '2024-09-05 09:00:00'),  -- DPS to BIA
(18, 'BA737-003', '2024-09-05 10:00:00', '2024-09-05 13:00:00'),  -- BIA to DPS
(29, 'BA757-001', '2024-09-05 07:00:00', '2024-09-05 09:30:00'),  -- DPS to BOM
(40, 'BA757-002', '2024-09-05 11:00:00', '2024-09-05 13:30:00'),  -- BOM to DPS
(1, 'BA757-003', '2024-09-05 08:00:00', '2024-09-05 10:30:00'),  -- CGK to SIN
(42, 'BA757-004', '2024-09-05 14:00:00', '2024-09-05 16:30:00'),  -- SIN to CGK
(33, 'AA380-001', '2024-09-05 09:00:00', '2024-09-05 13:00:00'),  -- CGK to DMK
(44, 'AA380-001', '2024-09-05 15:00:00', '2024-09-05 19:00:00'),  -- DMK to CGK
(35, 'BA737-001', '2024-09-05 22:00:00', '2024-09-05 02:00:00');  -- DPS to BKK

-- Day 6: 2024-09-06
INSERT INTO flight (route_id, aircraft_id, departure, arrival)
VALUES
(46, 'BA737-002', '2024-09-06 06:00:00', '2024-09-06 09:00:00'),  -- DPS to MAA
(17, 'BA737-003', '2024-09-06 10:00:00', '2024-09-06 13:00:00'),  -- MAA to DPS
(28, 'BA757-001', '2024-09-06 07:00:00', '2024-09-06 09:30:00'),  -- HRI to DEL
(49, 'BA757-002', '2024-09-06 11:00:00', '2024-09-06 13:30:00'),  -- DEL to HRI
(50, 'BA757-003', '2024-09-06 08:00:00', '2024-09-06 10:30:00'),  -- CGK to BIA
(11, 'BA757-004', '2024-09-06 14:00:00', '2024-09-06 16:30:00'),  -- BIA to CGK
(52, 'AA380-001', '2024-09-06 09:00:00', '2024-09-06 13:00:00'),  -- DPS to BKK
(23, 'AA380-001', '2024-09-06 05:00:00', '2024-09-06 09:00:00'),  -- BKK to DPS
(14, 'BA737-001', '2024-09-06 12:00:00', '2024-09-06 15:00:00');  -- DPS to DEL

-- Day 7: 2024-09-07
INSERT INTO flight (route_id, aircraft_id, departure, arrival)
VALUES
(5, 'BA737-002', '2024-09-07 06:00:00', '2024-09-07 09:00:00'),  -- DPS to BOM
(16, 'BA737-003', '2024-09-07 10:00:00', '2024-09-07 13:00:00'),  -- BOM to DPS
(27, 'BA757-001', '2024-09-07 07:00:00', '2024-09-07 09:30:00'),  -- CGK to HRI
(48, 'BA757-002', '2024-09-07 11:00:00', '2024-09-07 13:30:00'),  -- HRI to CGK
(9, 'BA757-003', '2024-09-07 08:00:00', '2024-09-07 10:30:00'),  -- CGK to BKK
(40, 'BA757-004', '2024-09-07 14:00:00', '2024-09-07 16:30:00'),  -- BKK to CGK
(21, 'AA380-001', '2024-09-07 09:00:00', '2024-09-07 13:00:00'),  -- DPS to SIN
(2, 'AA380-001', '2024-09-07 15:00:00', '2024-09-07 19:00:00'),  -- SIN to DPS
(3, 'BA737-001', '2024-09-07 12:00:00', '2024-09-07 15:00:00');  -- DPS to CGK

-- Day 8: 2024-09-08
INSERT INTO flight (route_id, aircraft_id, departure, arrival)
VALUES
(1, 'BA737-001', '2024-09-08 18:00:00', '2024-09-08 23:00:00'),  -- CGK to DPS
(2, 'BA737-002', '2024-09-08 10:00:00', '2024-09-08 13:00:00'),  -- DPS to CGK
(33, 'BA757-001', '2024-09-08 07:00:00', '2024-09-08 09:30:00'),  -- CGK to BIA
(4, 'BA757-002', '2024-09-08 21:00:00', '2024-09-08 23:30:00'),  -- BIA to CGK
(25, 'BA757-003', '2024-09-08 10:00:00', '2024-09-08 12:30:00'),  -- DPS to HRI
(6, 'BA757-004', '2024-09-08 14:00:00', '2024-09-08 16:30:00'),  -- HRI to DPS
(47, 'AA380-001', '2024-09-08 09:00:00', '2024-09-08 13:00:00'),  -- CGK to DEL
(8, 'AA380-001', '2024-09-08 15:00:00', '2024-09-08 19:00:00'),  -- DEL to CGK
(9, 'BA737-003', '2024-09-08 22:00:00', '2024-09-08 01:00:00'),  -- DPS to SIN
(10, 'BA737-001', '2024-09-08 16:00:00', '2024-09-08 19:00:00');  -- SIN to DPS

-- Day 9: 2024-09-09
INSERT INTO flight (route_id, aircraft_id, departure, arrival)
VALUES
(10, 'BA737-002', '2024-09-09 06:00:00', '2024-09-09 09:00:00'),  -- DPS to SIN
(11, 'BA737-003', '2024-09-09 10:00:00', '2024-09-09 13:00:00'),  -- SIN to DPS
(12, 'BA757-001', '2024-09-09 07:00:00', '2024-09-09 09:30:00'),  -- BIA to MAA
(13, 'BA757-002', '2024-09-09 11:00:00', '2024-09-09 13:30:00'),  -- MAA to BIA
(24, 'BA757-003', '2024-09-09 08:00:00', '2024-09-09 10:30:00'),  -- BIA to BOM
(15, 'BA757-004', '2024-09-09 14:00:00', '2024-09-09 16:30:00'),  -- BOM to BIA
(36, 'AA380-001', '2024-09-09 09:00:00', '2024-09-09 13:00:00'),  -- CGK to BKK
(17, 'AA380-001', '2024-09-09 15:00:00', '2024-09-09 19:00:00'),  -- BKK to CGK
(8, 'BA737-001', '2024-09-09 12:00:00', '2024-09-09 15:00:00'),  -- DPS to DEL
(19, 'BA737-002', '2024-09-09 18:00:00', '2024-09-09 21:00:00');  -- DEL to DPS

-- Day 10: 2024-09-10
INSERT INTO flight (route_id, aircraft_id, departure, arrival)
VALUES
(20, 'BA737-003', '2024-09-10 06:00:00', '2024-09-10 09:00:00'),  -- DPS to MAA
(21, 'BA737-001', '2024-09-10 10:00:00', '2024-09-10 13:00:00'),  -- MAA to DPS
(32, 'BA757-001', '2024-09-10 08:00:00', '2024-09-10 10:30:00'),  -- CGK to DMK
(23, 'BA757-002', '2024-09-10 11:00:00', '2024-09-10 13:30:00'),  -- DMK to CGK
(14, 'BA757-003', '2024-09-10 08:00:00', '2024-09-10 10:30:00'),  -- DPS to BKK
(25, 'BA757-004', '2024-09-10 14:00:00', '2024-09-10 16:30:00'),  -- BKK to DPS
(6, 'AA380-001', '2024-09-10 09:00:00', '2024-09-10 13:00:00'),  -- CGK to BOM
(7, 'AA380-001', '2024-09-10 15:00:00', '2024-09-10 19:00:00'),  -- BOM to CGK
(28, 'BA737-002', '2024-09-10 22:00:00', '2024-09-10 01:00:00'),  -- CGK to HRI
(29, 'BA737-003', '2024-09-10 17:00:00', '2024-09-10 20:00:00');  -- HRI to CGK

-- Day 11: 2024-09-11
INSERT INTO flight (route_id, aircraft_id, departure, arrival)
VALUES
(50, 'BA737-001', '2024-09-11 06:00:00', '2024-09-11 09:00:00'),  -- DPS to DEL
(31, 'BA737-002', '2024-09-11 10:00:00', '2024-09-11 13:00:00'),  -- DEL to DPS
(52, 'BA757-001', '2024-09-11 02:00:00', '2024-09-11 05:30:00'),  -- BIA to BKK
(13, 'BA757-002', '2024-09-11 11:00:00', '2024-09-11 13:30:00'),  -- BKK to BIA
(34, 'BA757-003', '2024-09-11 08:00:00', '2024-09-11 10:30:00'),  -- HRI to SIN
(5, 'BA757-004', '2024-09-11 14:00:00', '2024-09-11 16:30:00'),  -- SIN to HRI
(36, 'AA380-001', '2024-09-11 09:00:00', '2024-09-11 13:00:00'),  -- CGK to MAA
(7, 'AA380-001', '2024-09-11 15:00:00', '2024-09-11 19:00:00'),  -- MAA to CGK
(38, 'BA737-003', '2024-09-11 12:00:00', '2024-09-11 15:00:00'),  -- DPS to DMK
(29, 'BA737-001', '2024-09-11 20:00:00', '2024-09-11 23:00:00');  -- DMK to DPS









INSERT INTO User (role_id, username, password, user_phone_number, user_email, loyalty_points) 
VALUES 
(2, 'johnsmith', '$2b$10$gE6ViT/qfiO1P5OxKxGGmOFnY2QhBL1lZty8uYrOc7oOb/zS7Uekq', '123-456-7890', 'john.smith@example.com', 5),   -- Frequent
(2, 'janedoe', '$2b$10$7wRTrhTRdjKlRvj/YD5QZOOdUofkt8byubqYeK0Tibot9/M5/S8Ji', '234-567-8901', 'jane.doe@example.com', 8),        -- Frequent
(2, 'michaelbrown', '$2b$10$z1kZYPYbA9ufToZ1EYdGRuMRkNjGiPZcRmg.P/WQijPCq0Xz4SB1K', '345-678-9012', 'michael.brown@example.com', 15),  -- Gold
(2, 'emilywhite', '$2b$10$HfvxV1.I7aAfPci4SmvXReyO0Pz9xJmUatv0yDOV0.1CkFJ0JkYgq', '456-789-0123', 'emily.white@example.com', 25),   -- Gold
(2, 'williamjohnson', '$2b$10$U.Vcz4B0vFZHtKJcQ.j/qeOfWmDCDF72u9sbQjvFkOofOqzPU2EeW', '567-890-1234', 'william.johnson@example.com', 50),  -- Gold
(2, 'oliviagreen', '$2b$10$pXeOm2Okm8dUN18k0.x/nedPi9uZW27k57MmELB1RhH/pvGOoJ/kC', '678-901-2345', 'olivia.green@example.com', 10),  -- Gold
(2, 'jameswilson', '$2b$10$EkOx1UJKBhQGgcfRJcU4e.B1RmZW27k57MmELB1RhH/pvGOoJ/kC', '789-012-3456', 'james.wilson@example.com', 5),  -- Frequent
(2, 'sophialee', '$2b$10$3fQgU0Mri1bQdJGYQkc2ReULz7hxPdDHRxHboTgXw1mn2AsAf78Qy', '890-123-4567', 'sophia.lee@example.com', 9),     -- Frequent
(2, 'davismiller', '$2b$10$Ej.4d3GuUpEapYF7EvZpY.uadTZMOsBHTPxWha2LT5WNrSiwQlgWq', '901-234-5678', 'davis.miller@example.com', 45),  -- Gold
(2, 'isabellabrown', '$2b$10$fGQhTzUoEeItpZV/h2PDUeLgM3y9rN0c.PS0wCx/EFUBHITtMuN7e', '012-345-6789', 'isabella.brown@example.com', 12), -- Gold
(2, 'alexandergarcia', '$2b$10$h/a8tXBHgEeA5KlNB/Z0QuyUN2aXaUhX7V5Kfkw.y5k1LsHwecICi', '111-222-3333', 'alex.garcia@example.com', 8), -- Frequent
(2, 'chloemartinez', '$2b$10$btONWjgtD0/y0wId8ApRr.zFwNw2pbT2I/mHtK6kA0shFSvgoSOy', '222-333-4444', 'chloe.martinez@example.com', 20), -- Gold
(2, 'danielhernandez', '$2b$10$zC5VQG0X/Rrv9gh/s2uGHuIhB3uUObDk3z3e3OlU8/NZG04MkFxSS', '333-444-5555', 'daniel.hernandez@example.com', 7), -- Frequent
(2, 'lucasmoore', '$2b$10$M.FU3t6DqQ8EHCsL65I1qOtkB1xwbWe8AIYDS9iT6hGpm9R2PX9fq', '444-555-6666', 'lucas.moore@example.com', 30), -- Gold
(2, 'miawilliams', '$2b$10$vl.GcGvZfTAC4XwIQ8XBB.QRo8s3w5dov9hy.m6aHrJo7IZlYHtfW', '555-666-7777', 'mia.williams@example.com', 3), -- Frequent
(2, 'benjaminmartin', '$2b$10$Ksbb7aRKrMlEx3oDBRo8xe9mCsQ6/yPEVgqKQzpUT1rHJ9OZATui', '666-777-8888', 'benjamin.martin@example.com', 18), -- Gold
(2, 'ameliawalker', '$2b$10$twT9t.jQEF/GCLfOXPRbIO/J6Bd03fbMhBfXKB0FZWYhl1xIqkFSi', '777-888-9999', 'amelia.walker@example.com', 22), -- Gold
(2, 'jackthompson', '$2b$10$dnZyR4OEG3i/V7JmUFi/0OfgxdkemTaAz2oa5g6iIv8R74PQKrjC.', '888-999-0000', 'jack.thompson@example.com', 4), -- Frequent
(2, 'charlotteclark', '$2b$10$PS5chC9vOHOwJHbTjW7/eOV9S3r2Bo6FWT9F8k6U9Mfj0TV0V0X6y', '999-000-1111', 'charlotte.clark@example.com', 50); -- Gold

-- Insert 5 admin users with hashed passwords into the User table
INSERT INTO User (role_id, username, password, user_phone_number, user_email, loyalty_points) 
VALUES 
(1, 'madhushankha', '$2b$10$0fUfwEMF3O58Cvs8l/Ao1ebNA1tWo6zpZBlsLXoHsR2OdE5dIjG6e', '555-123-4567', 'madhushankha@admin.com', 0),    -- Admin
(1, 'kevin', '$2b$10$AC7/AKz5I/k4LoA4GxhY/uqIUK.vG4/5ZPzcfzJ3J9s7B7IfPVHG.', '555-234-5678', 'kevin@admin.com', 0),  -- Admin
(1, 'tanisha', '$2b$10$2J8WVcY/zk8uj9YF/sH7ruKFpZfIAcBlE9GbNYLqPOKxFN0MiMgG2', '555-345-6789', 'tanisha@admin.com', 0),  -- Admin
(1, 'vithursana', '$2b$10$HgKsJCrNl8dP1fB99zRwbOSFkhN.c3eum26c.BmRjtgD91NgkVQG2', '555-456-7890', 'vithursana@admin.com', 0),   -- Admin
(1, 'pamoj', '$2b$10$1tNGrLeIY5UtMF2UsT8PtuvGc.m2xfGl0j3E02KPAhOgC2Z5osBkW', '555-567-8901', 'pamoj@admin.com', 0); -- Admin




-- Insert passengers into the Passenger table
INSERT INTO Passenger (user_id, name, age, phone_number, email, is_registered) 
VALUES
-- Registered passengers with user_id from 1 to 20
(1, 'John Smith', 34, '123-456-7890', 'john.smith@example.com', TRUE),       -- Registered
(2, 'Jane Doe', 29, '234-567-8901', 'jane.doe@example.com', TRUE),           -- Registered
(3, 'Michael Brown', 40, '345-678-9012', 'michael.brown@example.com', TRUE), -- Registered
(4, 'Emily White', 27, '456-789-0123', 'emily.white@example.com', TRUE),     -- Registered
(5, 'William Johnson', 50, '567-890-1234', 'william.johnson@example.com', TRUE), -- Registered
(6, 'Olivia Green', 22, '678-901-2345', 'olivia.green@example.com', TRUE),   -- Registered
(7, 'James Wilson', 31, '789-012-3456', 'james.wilson@example.com', TRUE),   -- Registered
(8, 'Sophia Lee', 28, '890-123-4567', 'sophia.lee@example.com', TRUE),       -- Registered
(9, 'Davis Miller', 45, '901-234-5678', 'davis.miller@example.com', TRUE),   -- Registered
(10, 'Isabella Brown', 35, '012-345-6789', 'isabella.brown@example.com', TRUE), -- Registered
(11, 'Alexander Garcia', 26, '111-222-3333', 'alex.garcia@example.com', TRUE),  -- Registered
(12, 'Chloe Martinez', 38, '222-333-4444', 'chloe.martinez@example.com', TRUE), -- Registered
(13, 'Daniel Hernandez', 24, '333-444-5555', 'daniel.hernandez@example.com', TRUE), -- Registered
(14, 'Lucas Moore', 41, '444-555-6666', 'lucas.moore@example.com', TRUE),    -- Registered
(15, 'Mia Williams', 23, '555-666-7777', 'mia.williams@example.com', TRUE),  -- Registered
(16, 'Benjamin Martin', 37, '666-777-8888', 'benjamin.martin@example.com', TRUE), -- Registered
(17, 'Amelia Walker', 30, '777-888-9999', 'amelia.walker@example.com', TRUE),-- Registered
(18, 'Jack Thompson', 32, '888-999-0000', 'jack.thompson@example.com', TRUE),-- Registered
(19, 'Charlotte Clark', 29, '999-000-1111', 'charlotte.clark@example.com', TRUE),-- Registered
(20, 'Henry Rodriguez', 33, '000-111-2222', 'henry.rodriguez@example.com', TRUE),-- Registered

-- Insert more unregistered passengers into the Passenger table
INSERT INTO Passenger (user_id, name, age, phone_number, email, is_registered) 
VALUES
-- Existing unregistered passengers
(NULL, 'Lily Hall', 27, '123-321-4567', 'lily.hall@example.com', FALSE),     
(NULL, 'Ryan Morris', 36, '234-432-5678', 'ryan.morris@example.com', FALSE), 
(NULL, 'Grace Allen', 42, '345-543-6789', 'grace.allen@example.com', FALSE), 
(NULL, 'Ella Melendez', 25, '456-654-7890', 'ella.melendez@example.com', FALSE), 
(NULL, 'Noah Wright', 28, '567-765-8901', 'noah.wright@example.com', FALSE), 
(NULL, 'Harper Scott', 31, '678-876-9012', 'harper.scott@example.com', FALSE), 
(NULL, 'Ethan Carter', 39, '789-987-0123', 'ethan.carter@example.com', FALSE), 
(NULL, 'Lily Sanchez', 26, '890-098-1234', 'lily.sanchez@example.com', FALSE), 
(NULL, 'Joshua Lopez', 30, '901-109-2345', 'joshua.lopez@example.com', FALSE), 

-- Additional unregistered passengers
(NULL, 'Sarah Bennett', 45, '111-222-3333', 'sarah.bennett@example.com', FALSE),   
(NULL, 'Matthew Hughes', 37, '222-333-4444', 'matthew.hughes@example.com', FALSE),  
(NULL, 'Samantha Russell', 29, '333-444-5555', 'samantha.russell@example.com', FALSE),  
(NULL, 'Zoe Patterson', 34, '444-555-6666', 'zoe.patterson@example.com', FALSE),  
(NULL, 'Owen Fisher', 41, '555-666-7777', 'owen.fisher@example.com', FALSE),  
(NULL, 'Ava Simmons', 22, '666-777-8888', 'ava.simmons@example.com', FALSE),  
(NULL, 'Liam Bailey', 33, '777-888-9999', 'liam.bailey@example.com', FALSE),  
(NULL, 'Chloe Foster', 27, '888-999-0000', 'chloe.foster@example.com', FALSE),  
(NULL, 'Jack Edwards', 38, '999-000-1111', 'jack.edwards@example.com', FALSE),  
(NULL, 'Natalie Cooper', 35, '000-111-2222', 'natalie.cooper@example.com', FALSE),  
(NULL, 'Isaac Kelly', 32, '123-234-3456', 'isaac.kelly@example.com', FALSE),  
(NULL, 'Sophia Peterson', 28, '234-345-4567', 'sophia.peterson@example.com', FALSE),  
(NULL, 'Lucas Ramirez', 29, '345-456-5678', 'lucas.ramirez@example.com', FALSE),  
(NULL, 'Mason Brooks', 31, '456-567-6789', 'mason.brooks@example.com', FALSE),  
(NULL, 'Mila Perry', 36, '567-678-7890', 'mila.perry@example.com', FALSE),  
(NULL, 'Henry Reed', 40, '678-789-8901', 'henry.reed@example.com', FALSE); 





-- Insert seats for Boeing 737 Instances
-- BA737-001 (Instance 1)
INSERT INTO Seat (seat_code, seat_class, seat_price, is_reserved)
VALUES
('737-001-E01', 'Economy', 100.00, FALSE), 
('737-001-E02', 'Economy', 100.00, FALSE),
-- Continue inserting up to 150 economy seats
('737-001-E150', 'Economy', 100.00, FALSE),

-- Business Seats
('737-001-B01', 'Business', 300.00, FALSE), 
('737-001-B02', 'Business', 300.00, FALSE),
-- Continue inserting up to 30 business seats
('737-001-B30', 'Business', 300.00, FALSE),

-- Platinum Seats
('737-001-P01', 'Platinum', 500.00, FALSE), 
('737-001-P02', 'Platinum', 500.00, FALSE),
-- Continue inserting up to 10 platinum seats
('737-001-P10', 'Platinum', 500.00, FALSE);

-- Repeat for BA737-002 (Instance 2)
INSERT INTO Seat (seat_code, seat_class, seat_price, is_reserved)
VALUES
('737-002-E01', 'Economy', 100.00, FALSE), 
-- Continue inserting all seats similar to the above pattern for Instance 2

-- Repeat for BA737-003 (Instance 3)
INSERT INTO Seat (seat_code, seat_class, seat_price, is_reserved)
VALUES
('737-003-E01', 'Economy', 100.00, FALSE), 
-- Continue inserting all seats similar to the above pattern for Instance 3


DELIMITER //

CREATE PROCEDURE generate_boeing_757_seats()
BEGIN
    DECLARE instance INT DEFAULT 1;
    DECLARE seat_number INT;
    DECLARE seat_code VARCHAR(10);

    -- Optionally clear existing data
    -- DELETE FROM Seat WHERE seat_code LIKE '7%';

    WHILE instance <= 4 DO
        -- Economy Seats
        SET seat_number = 1;
        WHILE seat_number <= 180 DO
            SET seat_code = CONCAT(instance, 'E', LPAD(seat_number, 3, '0'));
            INSERT INTO Seat (seat_code, seat_class, seat_price, is_reserved)
            VALUES (seat_code, 'Economy', 120.00, FALSE);
            SET seat_number = seat_number + 1;
        END WHILE;

        -- Business Seats
        SET seat_number = 1;
        WHILE seat_number <= 40 DO
            SET seat_code = CONCAT(instance, 'B', LPAD(seat_number, 2, '0'));
            INSERT INTO Seat (seat_code, seat_class, seat_price, is_reserved)
            VALUES (seat_code, 'Business', 350.00, FALSE);
            SET seat_number = seat_number + 1;
        END WHILE;

        -- Platinum Seats
        SET seat_number = 1;
        WHILE seat_number <= 20 DO
            SET seat_code = CONCAT(instance, 'P', LPAD(seat_number, 2, '0'));
            INSERT INTO Seat (seat_code, seat_class, seat_price, is_reserved)
            VALUES (seat_code, 'Platinum', 550.00, FALSE);
            SET seat_number = seat_number + 1;
        END WHILE;

        SET instance = instance + 1;
    END WHILE;
END //

DELIMITER ;

-- Call the stored procedure to generate and insert the data
CALL generate_boeing_757_seats();

-- Verify the data (optional)
-- SELECT * FROM Seat WHERE seat_code REGEXP '^[1-4][EBP]' ORDER BY seat_code;






DELIMITER //

CREATE PROCEDURE generate_airbus_a380_seats()
BEGIN
    DECLARE instance INT DEFAULT 1;
    DECLARE seat_number INT;
    DECLARE seat_code VARCHAR(10);
    
    -- Optionally clear existing data
    -- DELETE FROM Seat WHERE seat_code LIKE 'A%';
    
    WHILE instance <= 4 DO
        -- Economy Seats
        SET seat_number = 1;
        WHILE seat_number <= 50 DO
            SET seat_code = CONCAT(instance, 'E', LPAD(seat_number, 2, '0'));
            INSERT INTO Seat (seat_code, seat_class, seat_price, is_reserved)
            VALUES (seat_code, 'Economy', 150.00, FALSE);
            SET seat_number = seat_number + 1;
        END WHILE;
        
        -- Business Seats
        SET seat_number = 1;
        WHILE seat_number <= 10 DO
            SET seat_code = CONCAT(instance, 'B', LPAD(seat_number, 2, '0'));
            INSERT INTO Seat (seat_code, seat_class, seat_price, is_reserved)
            VALUES (seat_code, 'Business', 400.00, FALSE);
            SET seat_number = seat_number + 1;
        END WHILE;
        
        -- Platinum Seats
        SET seat_number = 1;
        WHILE seat_number <= 5 DO
            SET seat_code = CONCAT(instance, 'P', LPAD(seat_number, 2, '0'));
            INSERT INTO Seat (seat_code, seat_class, seat_price, is_reserved)
            VALUES (seat_code, 'Platinum', 600.00, FALSE);
            SET seat_number = seat_number + 1;
        END WHILE;
        
        SET instance = instance + 1;
    END WHILE;
END //

DELIMITER ;

-- Call the stored procedure to generate and insert the data
CALL generate_airbus_a380_seats();













-- Map seats for BA737-001 (template_id 1)
INSERT INTO Seat_Map (template_id, seat_id)
VALUES
(1, 1),  -- Map seat_id 1 to BA737-001
(1, 2),
-- Continue mapping all seats for template_id 1 (Boeing 737, Instance 1)

-- Repeat for BA737-002 and BA737-003 using the same template_id (1).









-- Map seats for BA757-001 (template_id 2)
INSERT INTO Seat_Map (template_id, seat_id)
VALUES
(2, 191),  -- Map seat_id 191 to BA757-001
-- Continue mapping all seats for template_id 2 (Boeing 757, Instance 1)

-- Repeat for BA757-002, BA757-003, and BA757-004 using the same template_id (2).

-- Map seats for AA380-001 (template_id 3)
INSERT INTO Seat_Map (template_id, seat_id)
VALUES
(3, 432),  -- Map seat_id 432 to AA380-001
-- Continue mapping all seats for template_id 3 (Airbus A380, Single Instance)




-- Insert data into Booking table
INSERT INTO Booking (booking_id, flight_id, passenger_id, seat_id, booking_date, total_amount, payment_status) VALUES
(1, 1, 1, 1, '2024-08-01 10:00:00', 500.00, 'Paid'),
(2, 2, 2, 2, '2024-08-02 11:00:00', 500.00, 'Pending'),
(3, 3, 3, 3, '2024-08-03 12:00:00', 1000.00, 'Paid'),
(4, 4, 1, 4, '2024-08-04 13:00:00', 1000.00, 'Cancelled');




-- Additional data to reach 50 entries could be added similarly.




SET foreign_key_checks = 0;

INSERT INTO Booking (flight_id, passenger_id, seat_id, booking_date, total_amount, payment_status)
VALUES
    (FLOOR(1 + RAND() * 10), FLOOR(1 + RAND() * 10), FLOOR(1 + RAND() * 10), NOW() - INTERVAL FLOOR(RAND() * 365) DAY, ROUND(100 + (RAND() * 400), 2), 'Paid'),
    (FLOOR(1 + RAND() * 10), FLOOR(1 + RAND() * 10), FLOOR(1 + RAND() * 10), NOW() - INTERVAL FLOOR(RAND() * 365) DAY, ROUND(100 + (RAND() * 400), 2), 'Pending'),
    (FLOOR(1 + RAND() * 10), FLOOR(1 + RAND() * 10), FLOOR(1 + RAND() * 10), NOW() - INTERVAL FLOOR(RAND() * 365) DAY, ROUND(100 + (RAND() * 400), 2), 'Paid'),
    (FLOOR(1 + RAND() * 10), FLOOR(1 + RAND() * 10), FLOOR(1 + RAND() * 10), NOW() - INTERVAL FLOOR(RAND() * 365) DAY, ROUND(100 + (RAND() * 400), 2), 'Failed'),
    (FLOOR(1 + RAND() * 10), FLOOR(1 + RAND() * 10), FLOOR(1 + RAND() * 10), NOW() - INTERVAL FLOOR(RAND() * 365) DAY, ROUND(100 + (RAND() * 400), 2), 'Pending'),
    (FLOOR(1 + RAND() * 10), FLOOR(1 + RAND() * 10), FLOOR(1 + RAND() * 10), NOW() - INTERVAL FLOOR(RAND() * 365) DAY, ROUND(100 + (RAND() * 400), 2), 'Paid'),
    (FLOOR(1 + RAND() * 10), FLOOR(1 + RAND() * 10), FLOOR(1 + RAND() * 10), NOW() - INTERVAL FLOOR(RAND() * 365) DAY, ROUND(100 + (RAND() * 400), 2), 'Failed'),
    (FLOOR(1 + RAND() * 10), FLOOR(1 + RAND() * 10), FLOOR(1 + RAND() * 10), NOW() - INTERVAL FLOOR(RAND() * 365) DAY, ROUND(100 + (RAND() * 400), 2), 'Paid'),
    (FLOOR(1 + RAND() * 10), FLOOR(1 + RAND() * 10), FLOOR(1 + RAND() * 10), NOW() - INTERVAL FLOOR(RAND() * 365) DAY, ROUND(100 + (RAND() * 400), 2), 'Pending'),
    (FLOOR(1 + RAND() * 10), FLOOR(1 + RAND() * 10), FLOOR(1 + RAND() * 10), NOW() - INTERVAL FLOOR(RAND() * 365) DAY, ROUND(100 + (RAND() * 400), 2), 'Paid');

SET FOREIGN_KEY_CHECKS = 1;


SET foreign_key_checks = 0;

INSERT INTO Booking (flight_id, passenger_id, seat_id, booking_date, total_amount, payment_status)
VALUES
    (FLOOR(1 + RAND() * 10), 7, FLOOR(1 + RAND() * 10), NOW() - INTERVAL FLOOR(RAND() * 365) DAY, ROUND(100 + (RAND() * 400), 2), 'Paid'),
    (FLOOR(1 + RAND() * 10), 7, FLOOR(1 + RAND() * 10), NOW() - INTERVAL FLOOR(RAND() * 365) DAY, ROUND(100 + (RAND() * 400), 2), 'Pending'),
    (FLOOR(1 + RAND() * 10), 7, FLOOR(1 + RAND() * 10), NOW() - INTERVAL FLOOR(RAND() * 365) DAY, ROUND(100 + (RAND() * 400), 2), 'Paid'),
    (FLOOR(1 + RAND() * 10), 7, FLOOR(1 + RAND() * 10), NOW() - INTERVAL FLOOR(RAND() * 365) DAY, ROUND(100 + (RAND() * 400), 2), 'Failed');

SET FOREIGN_KEY_CHECKS = 1;

UPDATE user
SET loyalty_points = 4
WHERE user_id = 7;