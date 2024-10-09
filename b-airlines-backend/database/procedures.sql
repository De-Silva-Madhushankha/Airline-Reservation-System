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