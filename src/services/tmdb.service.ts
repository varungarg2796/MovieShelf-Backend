import axios from 'axios'; // Assuming Axios for HTTP requests

export class TMDBService {
  private static apiKey: string; // Store your TMDb API key

  static setApiKey(key: string) {
    this.apiKey = key;
  }

  static async getOmdbData(searchTerm: string): Promise<object[]> {
    try {
      if (!this.apiKey) {
        throw new Error('Please set TMDb API key before making requests');
      }

      const baseUrl = 'http://www.omdbapi.com/'
      const url = `${baseUrl}?apiKey=${this.apiKey}&t=${searchTerm}`;

      const response = await axios.get(url, { timeout: 5000 });
      console.log(response)
      if (response.status === 200) {
        const data = response.data;
        if (data) {
          return data;
        } else {
          console.warn('No movies found for search term:', searchTerm);
          return [];
        }
      } else {
        console.error('Error fetching TMDb data:', response.statusText);
        return [];
      }

    } catch (error:any) {
      if (error.code === 'ECONNABORTED') {
        console.error('Request timed out');
      } 
      console.error('Error in getTmdbData:', error);
      return [];
    }
  }
}

