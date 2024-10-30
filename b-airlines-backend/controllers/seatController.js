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

    if (!flight_id || !passengerSeats || Object.keys(passengerSeats).length === 0) {
        return res.status(400).json({ success: false, error: 'Flight ID and passenger seats are required' });
    }

    try {
        const result = await Seat.lockSeatTransaction(flight_id, passengerSeats);
        res.status(201).json({ success: true, data: result });

    } catch (error) {
        console.error('Error locking seats:', error.message);
        
        if (error.message.includes('locked')) {
            return res.status(409).json({ success: false, error: error.message });
        }
        res.status(500).json({ success: false, error: 'Seat selection failed. Please try again later.' });    }
};

export const getOccupiedByFlightId = async (req, res) => {
    try {
        const { flight_id } = req.params;  
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

 