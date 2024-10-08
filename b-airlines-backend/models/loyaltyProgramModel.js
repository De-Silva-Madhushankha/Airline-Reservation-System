import db from '../db.js'


const LoyaltyProgram = {

    // Create a new loyalty program
    createLoyaltyProgram: async (loyaltyProgram, result) => {
        db.query("INSERT INTO Loyalty_program SET ?", loyaltyProgram, function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });
    },

    // Get all loyalty programs
    getLoyaltyPrograms: async (result) => {
        db.query("SELECT * FROM Loyalty_program", function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                console.log("loyalty programs: ", res);
                result(null, res);
            }
        });
    }, 

    // Get loyalty program by ID 
    getLoyaltyProgramById: async (loyalty_program_id, result) => {
        db.query("SELECT * FROM Loyalty_program WHERE loyalty_program_id = ?", loyalty_program_id, function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }, 

    // Update a loyalty program
    updateLoyaltyProgram: async (loyalty_program_id, loyaltyProgram, result) => {
        db.query("UPDATE Loyalty_program SET loyalty_program_name = ?, loyalty_program_description = ?, loyalty_program_discount = ? WHERE loyalty_program_id = ?", [loyaltyProgram.loyalty_program_name, loyaltyProgram.loyalty_program_description, loyaltyProgram.loyalty_program_discount, loyalty_program_id], function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
    },  

    // Delete a loyalty program
    deleteLoyaltyProgram: async (loyalty_program_id, result) => {
        db.query("DELETE FROM Loyalty_program WHERE loyalty_program_id = ?", loyalty_program_id, function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
    },

    getDiscount: async (loyalty_program_id, result) => {
        db.query("SELECT loyalty_program_discount FROM Loyalty_program WHERE loyalty_program_id = ?", loyalty_program_id, function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

}

export default LoyaltyProgram;