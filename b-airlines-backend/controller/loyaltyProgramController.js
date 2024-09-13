import LoyaltyProgram from '../model/loyaltyProgramModel.js';

// Function to get min points required for a specific loyalty program
exports.getMinPoints = async (req, res) => {
    const { id } = req.params;
    try {
        const minPoints = await LoyaltyProgram.getMinPoints(id);
        res.json(minPoints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get max points required for a specific loyalty program
exports.getMaxPoints = async (req, res) => {
    const { id } = req.params;
    try {
        const maxPoints = await LoyaltyProgram.getMaxPoints(id);
        res.json(maxPoints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Function to get all loyalty programs
exports.getAllLoyaltyPrograms = async (req, res) => {
    try {
        const loyaltyPrograms = await LoyaltyProgram.getAll();
        res.json(loyaltyPrograms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

