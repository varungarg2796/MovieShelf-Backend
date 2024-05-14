import { Request, Response } from 'express';
import { TMDBService } from '../services/tmdb.service';

export class MovieController {
    static async getMovieData(req: Request, res: Response): Promise<void> {
        try {
            // To get the poster
            //const url = 'hhttp://img.omdbapi.com/?apikey=[yourkey]&'; // to get the poster
            // use the above to get more details

            // in future, we can source imdb meta critic rating from omdb api
            const searchTerm = req.body.SearchTerm ;
            const apiKey = process.env.API_KEY ?? '';
            TMDBService.setApiKey(apiKey);
            const movieData = await TMDBService.getOmdbData(searchTerm);
            res.json(movieData);
        } catch (error) {
            res.status(500).json({ error});
        }
    }
}
