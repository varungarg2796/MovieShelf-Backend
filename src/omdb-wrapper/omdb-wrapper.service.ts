import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OmdbWrapperService {
  private readonly omdbApiKey: string;
  private readonly http: AxiosInstance;

  constructor(private configService: ConfigService) {
    this.omdbApiKey = this.configService.get<string>('OMDB_API_KEY');
    this.http = axios.create({
      baseURL: 'http://www.omdbapi.com/',
      timeout: 5000,
    });
  }

  async searchMoviesByTitle(title: string) {
    try {
      const params = new URLSearchParams({
        apikey: this.omdbApiKey,
        t: title,
      });

      const response = await this.http.get(`?${params.toString()}`);
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

  async searchMoviesBySearchTerm(search: string) {
    try {
      const params = new URLSearchParams({
        apikey: this.omdbApiKey,
        s: search,
      });

      const response = await this.http.get(`?${params.toString()}`);
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