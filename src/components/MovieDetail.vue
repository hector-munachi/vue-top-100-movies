<script setup lang="ts">
import { Star, Clock, Award, Users, ChevronLeft } from 'lucide-vue-next';
import type { Movie } from '../types/movie';
import { useRouter } from 'vue-router';

const router = useRouter();
const goBack = () => router.push('/')

defineProps<{
  movie: Movie;
}>();
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
    <button 
      @click="goBack" 
      class="flex items-center mb-4 font-semibold text-gray-600 hover:text-green-500"
    >
      <ChevronLeft class="w-5 h-5 mr-1" />
      <span>Back to Movies List</span>
    </button>
    <div class="grid md:grid-cols-3 gap-6">
      <img :src="movie.Poster_Link" :alt="movie.Series_Title" class="w-full rounded-lg shadow-md" />
      <div class="md:col-span-2">
        <h1 class="text-3xl font-bold text-gray-900">{{ movie.Series_Title }}</h1>
        
        <div class="mt-4 flex flex-wrap gap-4">
          <div class="flex items-center">
            <Star class="w-5 h-5 text-green-500 mr-1" />
            <span>{{ movie.IMDB_Rating }}/10</span>
          </div>
          <div class="flex items-center">
            <Clock class="w-5 h-5 text-green-500 mr-1" />
            <span>{{ movie.Runtime }}</span>
          </div>
          <div class="flex items-center">
            <Award class="w-5 h-5 text-green-500 mr-1" />
            <span>{{ movie.Certificate }}</span>
          </div>
          <div class="flex items-center">
            <Users class="w-5 h-5 text-green-500 mr-1" />
            <span>{{ movie.No_of_Votes }} votes</span>
          </div>
        </div>

        <p class="mt-4 text-gray-600">{{ movie.Overview }}</p>

        <div class="mt-6 space-y-2">
          <p><span class="font-semibold">Director:</span> {{ movie.Director }}</p>
          <p><span class="font-semibold">Genre:</span> {{ movie.Genre }}</p>
          <p><span class="font-semibold">Stars:</span> {{ movie.Star1 }}, {{ movie.Star2 }}, {{ movie.Star3 }}, {{ movie.Star4 }}</p>
          <p><span class="font-semibold">Released:</span> {{ movie.Released_Year }}</p>
          <p><span class="font-semibold">Box Office:</span> {{ movie.Gross }}</p>
        </div>
      </div>
    </div>
  </div>
</template>