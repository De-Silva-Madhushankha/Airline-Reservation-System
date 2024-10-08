CREATE INDEX user_index
ON User(user_id, email);

CREATE INDEX flight_index
ON Flight(departure,arrival);

CREATE INDEX booking_index
ON Booking(flight_id,passenger_id,booking_date);

CREATE INDEX seat_index
ON Seat(seat_id, seat_row, seat_column);