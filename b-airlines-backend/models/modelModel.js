// backend/models/Model.js
import db from '../database/db.js';

const Model = {
    getModels: async () => {
        const [rows] = await db.query("SELECT * FROM Model");
        return rows;
    },

    getModelDetails: async (model) => { // Update parameter name
        const [rows] = await db.query("SELECT num_columns, num_economy_rows, num_business_rows,num_platinum_rows FROM Model WHERE model = ?", [model]); // Update query
        return rows;
    },

    // Other CRUD functions can be added here
};

export default Model;
