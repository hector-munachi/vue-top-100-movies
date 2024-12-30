import axios from 'axios';
import type { Movie } from '../types/movie';

const api = axios.create({
  baseURL: 'https://imdb-top-1000-movies-series.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': 'f57675cf46msh3a648c73e9a87c3p1aadccjsn7faad60a68ac',
    'X-RapidAPI-Host': 'imdb-top-1000-movies-series.p.rapidapi.com'
  }
});

export const getMovies = async (): Promise<Movie[]> => {
  try {
    const response = await api.get('/list/1');
    
    if (!response.data?.result) {
      throw new Error('No data received from API');
    }

    // Extract the result array
    const movies = response.data.result;
    return movies.filter((movie): movie is Movie => {
      return movie && typeof movie === 'object' && 'rank' in movie;
    });
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getMovieByRank = async (rank: number): Promise<Movie | null> => {
  try {
    const movies = await getMovies();
    return movies.find(movie => movie.rank === rank) || null;
  } catch (error) {
    console.error('Error fetching movie by rank:', error);
    throw error;
  }
};