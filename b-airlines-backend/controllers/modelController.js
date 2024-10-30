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
    const { model } = req.params; 
    try {
        console.log('incontroller', model);
        const result = await Model.getModelDetails(model); // Update method call
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createModel = async (req, res) => {
    const { model, price_multiplier, num_columns, num_economy_rows, num_business_rows, num_platinum_rows } = req.body;
    try {
        const result = await Model.createModel(model, price_multiplier, num_columns, num_economy_rows, num_business_rows, num_platinum_rows);
        res.json({ id: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
