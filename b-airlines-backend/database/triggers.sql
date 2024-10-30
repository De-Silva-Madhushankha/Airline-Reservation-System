DELIMITER $$

CREATE TRIGGER after_booking_insert
AFTER INSERT ON Booking
FOR EACH ROW
BEGIN
    UPDATE User
    SET loyalty_points = loyalty_points + 1
    WHERE user_id = NEW.user_id;
END $$ 

DELIMITER ;

DELIMITER $$

CREATE TRIGGER after_flight_insert
AFTER INSERT ON Flight
FOR EACH ROW
BEGIN
    DECLARE economy_rows INT;
    DECLARE business_rows INT;
    DECLARE platinum_rows INT;
    DECLARE columns INT;
    DECLARE model_name VARCHAR(50);
    DECLARE r INT;
    DECLARE c INT;

    -- Get the model name for the newly inserted flight
    SELECT model INTO model_name FROM Aircraft WHERE aircraft_id = NEW.aircraft_id;

    -- Get the number of rows for each class based on the model
    SELECT num_economy_rows, num_business_rows, num_platinum_rows, num_columns
    INTO economy_rows, business_rows, platinum_rows, columns
    FROM Model WHERE model = model_name;

    -- Insert Economy Seats
    SET r = 1;
    WHILE r <= economy_rows DO
        SET c = 1; -- Reset column for each new row
        WHILE c <= columns DO
            INSERT INTO Seat (seat_id, seat_row, seat_column, seat_class_id, is_reserved, model, flight_id)
            --  economy
            VALUES (UUID(), r, c, 1, FALSE, model_name, NEW.flight_id);
            SET c = c + 1;
        END WHILE;
        SET r = r + 1;
    END WHILE;

    -- Insert Business Seats
    SET r = 1; -- Reset row for business seats
    WHILE r <= business_rows DO
        SET c = 1; -- Reset column for each new row
        WHILE c <= columns DO 
            INSERT INTO Seat (seat_id, seat_row, seat_column, seat_class_id, is_reserved, model, flight_id)
            VALUES (UUID(), economy_rows + r, c, 2, FALSE, model_name, NEW.flight_id);
            SET c = c + 1;
        END WHILE;
        SET r = r + 1;
    END WHILE;

    -- Insert Platinum Seats
    SET r = 1; -- Reset row for platinum seats
    WHILE r <= platinum_rows DO
        SET c = 1; -- Reset column for each new row
        WHILE c <= columns DO 
            INSERT INTO Seat (seat_id, seat_row, seat_column, seat_class_id, is_reserved, model, flight_id)
            VALUES (UUID(), economy_rows + business_rows + r, c, 3, FALSE, model_name, NEW.flight_id);
            SET c = c + 1;
        END WHILE;
        SET r = r + 1;
    END WHILE;

END $$

DELIMITER ;