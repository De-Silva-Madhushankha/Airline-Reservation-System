import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

console.log("Starting server setup...");


//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
console.log("Middleware setup complete");



// Load environment variables
dotenv.config();
console.log("Environment variables loaded");


//import routes
import userRoutes from './routes/userRoutes.js';
import flightRoutes from './routes/flightRoutes.js';
import modelRoutes from './routes/modelRoutes.js';
import aircraftRoutes from './routes/aircraftRoutes.js';
import seatRoutes from './routes/seatRoutes.js';
//import bookingRoutes from './routes/bookingRoutes.js';

console.log("Routes imported");

// Use routes
app.use('/api/user', userRoutes);   // Prefix routes with /api/user
app.use('/api/flight', flightRoutes);   // Prefix routes with /api/flight
app.use('/api/model', modelRoutes);
app.use('/api/aircraft', aircraftRoutes);
app.use('/api/seat', seatRoutes);
//app.use('/api/booking', bookingRoutes);

console.log("Routes setup complete");


app.get('/', (req, res) => {
    res.send('backend is running');
})


const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}/`);
})

export default app;