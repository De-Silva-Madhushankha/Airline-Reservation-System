import db from '../database/db.js';

const Model = {
    getModels: async () => {
        const [rows] = await db.query("SELECT * FROM Model");
        //console.log(rows);
        return rows;
    },

    getModelDetails: async (model) => { // Update parameter name
        const [rows] = await db.query("SELECT num_columns, num_economy_rows, num_business_rows,num_platinum_rows FROM Model WHERE model = ?", [model]); // Update query
        return rows;
    },

    createModel: async (model,price_multiplier, num_columns, num_economy_rows, num_business_rows, num_platinum_rows) => {
        const [result] = await db.query(
            `INSERT INTO Model (model,price_multiplier, num_columns, num_economy_rows, num_business_rows, num_platinum_rows) 
            VALUES (?,?,?,?,?,?)`,
            [model,price_multiplier, num_columns, num_economy_rows, num_business_rows, num_platinum_rows]
        );
        return result.insertId;
    },
};

export default Model;
