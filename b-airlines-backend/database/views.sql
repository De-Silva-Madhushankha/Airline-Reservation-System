-- flight-search

CREATE VIEW search_flights AS
    SELECT  flight_id, Route.origin_code, Route.destination_code, DATE(Flight.departure) departure, TIME(Flight.departure) dep_time, DATE(Flight.arrival) arrival, TIME(Flight.arrival) arr_time, Flight.aircraft_id, Flight.delay
    FROM  Flight INNER JOIN Route USING(route_id);



-- for profile

CREATE VIEW user_info AS
    SELECT User.user_id, User.title ,User.first_name, User.last_name, User.email, User.mobile_number, User.country, User.date_of_birth, User.loyalty_points
    FROM User;

CREATE VIEW user_bookings AS
    SELECT Booking.user_id, 
           Booking.booking_id, 
           Booking.flight_id, 
           Booking.seat_id, 
           Booking.booking_date, 
           Booking.total_amount, 
           Booking.payment_status,
           Passenger.first_name, 
           Passenger.last_name
    FROM Booking
    JOIN Passenger ON Booking.passenger_id = Passenger.passenger_id;


-- comprehensive booking details

CREATE VIEW v_booking_details AS
SELECT 
    b.booking_id,
    b.booking_date,
    b.total_amount,
    b.payment_status,
    
    -- Passenger details
    p.passenger_id,
    p.first_name AS passenger_first_name,
    p.last_name AS passenger_last_name,
    p.passport_id,
    p.age,
    p.phone_number,
    p.email AS passenger_email,
    
    -- Flight details
    f.flight_id,
    f.departure,
    f.arrival,
    f.delay,
    
    -- Route details
    r.origin_code,
    r.destination_code,
    r.distance,
    
    -- Seat details
    s.seat_id,
    s.seat_row,
    s.seat_column,
    sc.seat_class_name,
    
    -- User details (booker)
    u.user_id AS booked_by_user_id,
    u.first_name AS booked_by_first_name,
    u.last_name AS booked_by_last_name,
    u.email AS booked_by_email,
    lp.program_name AS loyalty_program
FROM 
    Booking b
    INNER JOIN Passenger p ON b.passenger_id = p.passenger_id
    INNER JOIN Flight f ON b.flight_id = f.flight_id
    INNER JOIN Route r ON f.route_id = r.route_id
    INNER JOIN Seat s ON b.seat_id = s.seat_id
    INNER JOIN Seat_class sc ON s.seat_class_id = sc.seat_class_id
    LEFT JOIN User u ON b.user_id = u.user_id
    LEFT JOIN Loyalty_program lp ON u.program_id = lp.program_id;
    

-- reports -  Given a flight no, all passengers travelling in it (next immediate flight) below age 18, above age 18

CREATE VIEW flight_passenger_age_report AS
    SELECT 
        f.flight_id AS flight_id,
        p.passenger_id AS passenger_id,
        p.first_name AS first_name,
        p.last_name AS last_name,
        p.age AS age,
        (CASE
            WHEN (p.age < 18) THEN 'Below 18'
            ELSE 'Above 18'
        END) AS age_group
    FROM
        Flight f
        JOIN Booking b ON f.flight_id = b.flight_id
        JOIN Passenger p ON b.passenger_id = p.passenger_id
    WHERE
        f.departure > NOW()
    ORDER BY f.flight_id , p.age;



CREATE VIEW RevenueByAircraftType AS
SELECT 
    ac.model AS aircraft_model,
    m.price_multiplier AS model_price_multiplier,
    SUM(b.total_amount) AS total_revenue
FROM 
    Booking b
JOIN 
    Flight f ON b.flight_id = f.flight_id
JOIN 
    Aircraft ac ON f.aircraft_id = ac.aircraft_id
JOIN 
    Model m ON ac.model = m.model
GROUP BY 
    ac.model, m.price_multiplier;





CREATE VIEW passenger_details_by_destination_view AS
    SELECT 
        r.destination_code AS destination_code,
        f.departure AS departure,
        p.passenger_id AS passenger_id,
        p.first_name AS passenger_name,
        p.age AS passenger_age
    FROM
        Booking b
        JOIN Flight f ON b.flight_id = f.flight_id
        JOIN Route r ON f.route_id = r.route_id
        JOIN Passenger p ON b.passenger_id = p.passenger_id;


CREATE VIEW PastFlightsAndPassengerCountView AS
SELECT 
    f.flight_id,
    f.aircraft_id,
    r.origin_code,
    r.destination_code,
    f.departure,
    f.arrival,
    CASE 
        WHEN f.delay = TRUE THEN 'Delayed'
        ELSE 'On Time'
    END AS status,
    COUNT(b.passenger_id) AS passenger_count
FROM 
    Flight f
JOIN 
    Route r ON f.route_id = r.route_id
LEFT JOIN 
    Booking b ON f.flight_id = b.flight_id
GROUP BY 
    f.flight_id, f.aircraft_id, r.origin_code, r.destination_code, f.departure, f.arrival, f.delay;
