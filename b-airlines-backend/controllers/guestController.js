import Guest from '../models/guestModel.js';

// Function to get all guests
export const getAllGuests = async (req, res) => {
    try {
        const guests = await Guest.getAll();
        res.json(guests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get guest by id
export const getGuestById = async (req, res) => {
    const { id } = req.params;
    try {
        const guest = await Guest.getById(id);
        if (guest) {
            res.json(guest);
        } else {
            res.status(404).json({ message: 'guest not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



