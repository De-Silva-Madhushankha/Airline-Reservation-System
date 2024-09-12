import express from 'express'
//import expressLayouts from 'express-ejs-layouts'
import { fileURLToPath } from 'url'
import path from 'path'
//import indexRouter from './routes/index.js'
import cors from 'cors'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

console.log("Starting server setup...");

// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');
// app.set('layout', 'layouts/layout');

//middleware
app.use(cors());
app.use(express.json());
console.log("Middleware setup complete");

// app.use(expressLayouts);
// app.use(express.static('public'));

// Load environment variables
dotenv.config();
console.log("Environment variables loaded");


//import routes







app.get('/', (req, res) => {
    res.send('backend is running');
})


const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}/`);
})