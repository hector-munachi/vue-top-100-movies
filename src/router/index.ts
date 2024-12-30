import { createRouter, createWebHistory } from 'vue-router';
import MovieList from '../views/MovieList.vue';
import MovieDetails from '../views/MovieDetails.vue'; 

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MovieList
    },
    {
      path: '/movie/:rank',
      name: 'movie-details',
      component: MovieDetails
    }
  ]
});

export default router;