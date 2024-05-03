import axios from 'axios'; // Assuming Axios for HTTP requests

export class TMDBService {
  private static apiKey: string; // Store your TMDb API key

  static setApiKey(key: string) {
    this.apiKey = key;
  }

  static async getTmdbMovieData(searchTerm: string): Promise<object[]> {
    try {
      if (!this.apiKey) {
        throw new Error('Please set TMDb API key before making requests');
      }

      const baseUrl = 'https://api.themoviedb.org/3/search/movie';
      const url = `${baseUrl}?api_key=${this.apiKey}&query=${searchTerm}`;

      const response = await axios.get(url);
      if (response.status === 200) {
        const data = response.data;
        if (data.results) {
          return data.results;
        } else {
          console.warn('No movies found for search term:', searchTerm);
          return [];
        }
      } else {
        console.error('Error fetching TMDb data:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('Error in getTmdbData:', error);
      return [];
    }
  }
}

