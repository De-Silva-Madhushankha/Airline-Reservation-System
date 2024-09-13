import Seat from '../models/seatModel.js';

// Function to get all seats
exports.getAllSeats = async (req, res) => {
    try {
        const seats = await Seat.getAll();
        res.json(seats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get seat by id
exports.getSeatById = async (req, res) => {
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
exports.updateSeat = async (req, res) => {
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
exports.getSeatClassById = async (req, res) => {
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
exports.getSeatPriceById = async (req, res) => {
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

