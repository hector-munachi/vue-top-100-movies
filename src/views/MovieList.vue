<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Loader } from 'lucide-vue-next';
import MovieCard from '../components/MovieCard.vue';
import Pagination from '../components/Pagination.vue';
import { getMovies } from '../services/api';
import type { Movie } from '../types/movie';

const movies = ref<Movie[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const currentPage = ref(1);
const moviesPerPage = 20;

const totalPages = computed(() => Math.ceil(movies.value.length / moviesPerPage));

const paginatedMovies = computed(() => {
  const start = (currentPage.value - 1) * moviesPerPage;
  const end = start + moviesPerPage;
  return movies.value.slice(start, end);
});

const handlePageChange = (page: number) => {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await getMovies();
    console.log('API Response:', response); // Debug log
    movies.value = response;
  } catch (err) {
    console.error('Failed to fetch movies:', err);
    error.value = 'Failed to load movies. Please try again later.';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div v-if="loading" class="flex justify-center items-center min-h-[50vh]">
      <Loader class="w-8 h-8 text-green-600 animate-spin" />
    </div>

    <div v-else-if="error" class="text-center text-red-600 py-8">
      {{ error }}
    </div>
    
    <div v-else-if="movies.length === 0" class="text-center text-gray-600 py-8">
      No movies found
    </div>
    
    <div v-else>
      <div class="grid gap-6">
        <router-link
          v-for="movie in paginatedMovies"
          :key="movie.rank"
          :to="`/movie/${movie.rank}`"
        >
          <MovieCard :movie="movie" />
        </router-link>
      </div>

      <Pagination
        v-if="movies.length > moviesPerPage"
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>