<script setup lang="ts">
import type { Movie } from '../types/movie';
import { Star } from 'lucide-vue-next';

defineProps<{
  movie: Movie;
}>();
</script>

<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div class="flex md:flex-row flex-col">
      <img :src="movie.Poster_Link" :alt="movie.Series_Title" class="w-full md:w-32 h-48 md:h-auto object-cover" />
      <div class="p-4 flex-1">
        <h3 class="text-lg font-semibold text-gray-900">{{ movie.Series_Title }}</h3>
        <div class="mt-2 flex items-center text-sm text-gray-600">
          <Star class="w-4 h-4 text-green-500 mr-1" />
          <span>{{ movie.IMDB_Rating }}/10</span>
        </div>
        <p class="mt-2 text-sm text-gray-500">{{ movie.Overview.slice(0, 100) }}...</p>
        <div class="mt-2 text-sm text-gray-600">
          <span class="text-green-600">{{ movie.Released_Year }}</span> • {{ movie.Runtime }}
        </div>
      </div>
    </div>
  </div>
</template>