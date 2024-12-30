<script setup lang="ts">
import { Film } from 'lucide-vue-next';
</script>

<template>
  <nav class="bg-green-600 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <router-link to="/" class="flex items-center">
          <Film class="w-8 h-8 text-white mr-2" />
          <span class="text-white text-xl font-bold">Top 100 Movies Vue</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>