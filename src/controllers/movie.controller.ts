import { Request, Response } from 'express';
import { TMDBService } from '../services/tmdb.service';

export class MovieController {
    static async getMovieData(req: Request, res: Response): Promise<void> {
        try {

            //https://image.tmdb.org/t/p/original/g8kvGupn62RdywcE85QO2S0v3r8.jpg
            // add the poster path to above url

            //const url = 'https://api.themoviedb.org/3/movie/movie_id?language=en-US';
            // use the above to get more details

            // in future, we can source imdb meta critic rating from omdb api
            const searchTerm = req.body.SearchTerm ;
            const apiKey = process.env.API_KEY ?? '';
            TMDBService.setApiKey(apiKey);
            const movieData = await TMDBService.getTmdbMovieData(searchTerm);
            res.json(movieData);
        } catch (error) {
            res.status(500).json({ error});
        }
    }
}
