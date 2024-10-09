import Model from '../models/modelModel.js';

export const getModels = async (req, res) => {
    try {
        const models = await Model.getModels();
        res.json(models);
        //console.log(models);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getModelDetails = async (req, res) => {
    const { model } = req.params; // Change to 'model'
    try {
        console.log('incontroller', model);
        const result = await Model.getModelDetails(model); // Update method call
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Other CRUD functions for models can be added here
