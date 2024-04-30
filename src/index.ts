// src/index.ts
import express from 'express';
import helloRoutes from './routes/hello.route';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', helloRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
