import Route from '../models/routeModel.js';

//  Given a flight no, all passengers travelling in it (next immediate flight) below age 18, above age 18 
export const getPassengerByRouteId = async (req, res) => {
    const { id } = req.params;
    try {
        const passengers = await Route.getPassengerByRouteId(id);
        res.json(passengers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



