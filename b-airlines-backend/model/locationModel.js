import db from '../db.js'


const Location = {

    // Create a new location
    createLocation: async (location, result) => {
        db.query("INSERT INTO location SET ?", location, function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });
    },

    // Get all locations
    getLocations: async (result) => {
        db.query("SELECT * FROM location", function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                console.log("locations: ", res);
                result(null, res);
            }
        });
    }, 

    // Get location by ID 
    getLocationById: async (location_id, result) => {
        db.query("SELECT * FROM location WHERE location_id = ?", location_id, function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }, 

    // Update a location
    updateLocation: async (location_id, location, result) => {
        db.query("UPDATE location SET location_name = ?, location_code = ? WHERE location_id = ?", [location.location_name, location.location_code, location_id], function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
    },  

    // Delete a location
    deleteLocation: async (location_id, result) => {
        db.query("DELETE FROM location WHERE location_id = ?", location_id, function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
    }

}

export default Location;