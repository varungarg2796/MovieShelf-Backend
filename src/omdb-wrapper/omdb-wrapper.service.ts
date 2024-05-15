import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OmdbWrapperService {
  private readonly omdbApiKey: string = process.env.OMDB_API_KEY;

  constructor(private configService: ConfigService) {
    this.omdbApiKey = this.configService.get<string>('OMDB_API_KEY');
  }
  async searchMoviesByTitle(title: string) {
    try {
      const url = `http://www.omdbapi.com/?apikey=${this.omdbApiKey}&t=${title}`;
      const response = await axios.get(url, { timeout: 5000 });
      return response.data;
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timed out');
      } else {
        throw new Error(
          `Failed to fetch movie data from OMDB API. Error: ${error}`
        );
      }
    }
  }
}