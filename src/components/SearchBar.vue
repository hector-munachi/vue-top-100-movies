<script setup lang="ts">
import { ref } from 'vue';
import { Search, X } from 'lucide-vue-next';
import axios from 'axios';

const searchVisible = ref(false);
const searchQuery = ref('');
const searchType = ref<keyof typeof endpoints>('title');
const loading = ref(false);

const placeholders = {
  title: 'Search by movie title...',
  year: 'Search by release year...',
  genre: 'Search by genre...',
  director: 'Search by director name...',
  actor: 'Search by actor name...'
};

const endpoints = {
  title: 'bytitle',
  year: 'byyear',
  genre: 'bygenre',
  director: 'bydirector',
  actor: 'bystar'
};

const emit = defineEmits(['updateResults']);

const toggleSearch = () => {
  searchVisible.value = !searchVisible.value;
  if (!searchVisible.value) {
    searchQuery.value = '';
  }
};

const handleSearch = async () => {
  if (!searchQuery.value) return;
  
  loading.value = true;
  const encodedParams = new URLSearchParams();
  
  switch (searchType.value) {
    case 'title':
      encodedParams.set('title', searchQuery.value);
      break;
    case 'year':
      encodedParams.set('year', searchQuery.value);
      break;
    case 'genre':
      encodedParams.set('genre', searchQuery.value);
      break;
    case 'director':
      encodedParams.set('name', searchQuery.value);
      break;
    case 'actor':
      encodedParams.set('name', searchQuery.value);
      break;
  }

  const options = {
    method: 'POST',
    url: `https://imdb-top-1000-movies-series.p.rapidapi.com/${endpoints[searchType.value]}`,
    headers: {
      'x-rapidapi-key': 'f57675cf46msh3a648c73e9a87c3p1aadccjsn7faad60a68ac',
      'x-rapidapi-host': 'imdb-top-1000-movies-series.p.rapidapi.com',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    emit('updateResults', response.data);
  } catch (error) {
    console.error('Search failed:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="relative">
    <button
      @click="toggleSearch"
      class="p-2 hover:bg-gray-100 rounded-full transition-colors"
      :class="{ 'bg-gray-100': searchVisible }"
    >
      <Search class="w-5 h-5" />
    </button>

    <div
      v-if="searchVisible"
      class="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg p-4 border"
    >
      <div class="flex gap-2 mb-4">
        <select
          v-model="searchType"
          class="flex-shrink-0 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="title">Title</option>
          <option value="year">Year</option>
          <option value="genre">Genre</option>
          <option value="director">Director</option>
          <option value="actor">Actor</option>
        </select>

        <div class="relative flex-grow">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="placeholders[searchType]"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            @keyup.enter="handleSearch"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </div>

      <button
        @click="handleSearch"
        class="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
        :disabled="!searchQuery || loading"
      >
        <span v-if="!loading">Search</span>
        <Search v-else class="w-5 h-5 mx-auto animate-spin" />
      </button>
    </div>
  </div>
</template>