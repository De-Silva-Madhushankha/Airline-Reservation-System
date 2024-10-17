-- flight-search

CREATE VIEW search_flights AS
    SELECT  flight_id, Route.origin_code, Route.destination_code, DATE(Flight.departure) departure, TIME(Flight.departure) dep_time, DATE(Flight.arrival) arrival, TIME(Flight.arrival) arr_time, Flight.aircraft_id
    FROM  Flight INNER JOIN Route USING(route_id);



-- for profile

CREATE VIEW user_info AS
    SELECT User.user_id, User.title ,User.first_name, User.last_name, User.email, User.mobile_number, User.country, User.date_of_birth, User.loyalty_points
    FROM User;

CREATE VIEW user_bookings AS
    SELECT Booking.user_id, Booking.booking_id, Booking.flight_id, Booking.seat_id, Booking.booking_date, Booking.total_amount, Booking.payment_status
    FROM Booking;



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