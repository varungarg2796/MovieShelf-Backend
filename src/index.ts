// src/index.ts
import express from 'express';
import helloRoutes from './routes/hello.route';
import movieRoutes from './routes/movie.route'

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use('/api', helloRoutes);
app.use('/api', movieRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
