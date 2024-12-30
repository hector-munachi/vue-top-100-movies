<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Loader } from 'lucide-vue-next';
import MovieDetail from '../components/MovieDetail.vue';
import { getMovieByRank } from '../services/api';
import type { Movie } from '../types/movie';

const route = useRoute();
const router = useRouter();
const movie = ref<Movie | null>(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const rank = parseInt(route.params.rank as string);
    movie.value = await getMovieByRank(rank);
    if (!movie.value) {
      router.push('/');
    }
  } catch (error) {
    console.error('Failed to fetch movie:', error);
    router.push('/');
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
    
    <MovieDetail v-else-if="movie" :movie="movie" />
  </div>
</template>