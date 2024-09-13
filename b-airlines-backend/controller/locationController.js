import Location from '../models/locationModel.js';

// Function to get all locations
exports.getAllLocations = async (req, res) => {
    try {
        const locations = await Location.getAll();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get location by id
exports.getLocationById = async (req, res) => {
    const { id } = req.params;
    try {
        const location = await Location.getById(id);
        if (location) {
            res.json(location);
        } else {
            res.status(404).json({ message: 'location not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to update location
exports.updateLocation = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const affectedRows = await Location.update(id, updates);
        if (affectedRows) {
            res.json({ message: 'location updated successfully' });
        } else {
            res.status(404).json({ message: 'location not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get location by country
exports.getLocationByCountry = async (req, res) => {
    const { country } = req.params;
    try {
        const location = await Location.getByCountry(country);
        if (location) {
            res.json(location);
        } else {
            res.status(404).json({ message: 'location not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get location by city
exports.getLocationByCity = async (req, res) => {
    const { city } = req.params;
    try {
        const location = await Location.getByCity(city);
        if (location) {
            res.json(location);
        } else {
            res.status(404).json({ message: 'location not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get location by airport code
exports.getLocationByAirportCode = async (req, res) => {
    const { airportCode } = req.params;
    try {
        const location = await Location.getByAirportCode(airportCode);
        if (location) {
            res.json(location);
        } else {
            res.status(404).json({ message: 'location not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
