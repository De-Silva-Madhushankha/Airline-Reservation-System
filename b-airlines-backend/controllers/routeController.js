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

export const getRoutes = async (req, res) => {
    try {
      const routes = await Route.getRoutes();
      res.json(routes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

export const getDestinations = async (req, res) => {  
    try {
      const destinations = await Route.getDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


