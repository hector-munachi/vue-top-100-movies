<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: 'page-change', page: number): void;
}>();
</script>

<template>
  <div class="flex items-center justify-center space-x-2 mt-6">
    <button
      @click="emit('page-change', currentPage - 1)"
      :disabled="currentPage === 1"
      class="p-2 rounded-lg hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ChevronLeft class="w-5 h-5 text-green-600" />
    </button>
    
    <span class="text-gray-600">Page {{ currentPage }} of {{ totalPages }}</span>
    
    <button
      @click="emit('page-change', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="p-2 rounded-lg hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ChevronRight class="w-5 h-5 text-green-600" />
    </button>
  </div>
</template>