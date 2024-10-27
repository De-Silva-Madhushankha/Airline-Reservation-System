import Seat from '../models/seatModel.js';

// Function to get all seats
export const getAllSeats = async (req, res) => {
    try {
        const seats = await Seat.getAll();
        res.json(seats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// lock seats when selected
export const lockSeats = async (req, res) => {
    console.log('body', req.body)
    const { flight_id, passengerSeats } = req.body;

    try {
        console.log('passengers', passengerSeats)
        const result = await Seat.lockSeatTransaction(flight_id, passengerSeats);
        console.log('success in controller')
        res.status(201).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Seat selection failed' });
    }
};

export const getOccupiedByFlightId = async (req, res) => {
    try {
        const { flight_id } = req.params;  // Assuming flight_id is passed as a route parameter
        const seats = await Seat.getOccupiedByFlightId(flight_id);
        res.json(seats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get seat by id
export const getSeatById = async (req, res) => {
    const { id } = req.params;
    try {
        const seat = await Seat.getById(id);
        if (seat) {
            res.json(seat);
        } else {
            res.status(404).json({ message: 'seat not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to update seat
export const updateSeat = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const affectedRows = await Seat.update(id, updates);
        if (affectedRows) {
            res.json({ message: 'seat updated successfully' });
        } else {
            res.status(404).json({ message: 'seat not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get seat class by id
export const getSeatClassById = async (req, res) => {
    const { id } = req.params;
    try {
        const seatClass = await Seat.getSeatClassById(id);
        if (seatClass) {
            res.json(seatClass);
        } else {
            res.status(404).json({ message: 'seat class not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get seat price by id
export const getSeatPriceById = async (req, res) => {
    const { id } = req.params;
    try {
        const seatPrice = await Seat.getSeatPriceById(id);
        if (seatPrice) {
            res.json(seatPrice);
        } else {
            res.status(404).json({ message: 'seat price not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

 