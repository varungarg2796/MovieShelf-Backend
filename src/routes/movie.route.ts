import express from 'express';
import { MovieController } from '../controllers/movie.controller';

const router = express.Router();

router.post('/movie', MovieController.getMovieData);

export default router;
