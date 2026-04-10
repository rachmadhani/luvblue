<template>
  <div class="bg-white border border-gray-200 rounded-xl shadow-theme-sm dark:bg-gray-900 dark:border-gray-800">
    <!-- Header -->
    <div class="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Blue Note Entries</h3>
      <button
        @click="$emit('create')"
        class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm focus:ring-4 focus:ring-blue-500/20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        Create Entry
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="p-8 text-center">
      <div class="inline-block animate-spin w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full mb-2"></div>
      <p class="text-gray-500 dark:text-gray-400">Loading blue notes...</p>
    </div>

    <!-- Table -->
    <div v-else class="overflow-x-auto">
      <table class="w-full text-sm text-left whitespace-nowrap">
        <thead class="text-xs text-gray-500 uppercase bg-gray-50/50 dark:bg-gray-800/50 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-5 py-4 font-medium tracking-wider">Image</th>
            <th scope="col" class="px-5 py-4 font-medium tracking-wider">Title</th>
            <th scope="col" class="px-5 py-4 font-medium tracking-wider">Brief Title</th>
            <th scope="col" class="px-5 py-4 font-medium tracking-wider">Link</th>
            <th scope="col" class="px-5 py-4 font-medium tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
          <tr v-if="items.length === 0">
            <td colspan="5" class="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
              No blue notes found. Click 'Create Entry' to add one.
            </td>
          </tr>
          <tr v-for="item in items" :key="item.id" class="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
            <td class="px-5 py-4">
              <div class="w-16 h-16 rounded overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200 dark:border-gray-700">
                <img v-if="item.note_image_url" :src="getImageUrl(item.note_image_url)" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                </div>
              </div>
            </td>
            <td class="px-5 py-4">
              <div class="font-medium text-gray-900 dark:text-white max-w-[200px] truncate" :title="item.note_title">
                {{ item.note_title }}
              </div>
            </td>
            <td class="px-5 py-4">
              <div class="text-gray-500 dark:text-gray-400 max-w-[150px] truncate" :title="item.note_brief_title">
                {{ item.note_brief_title || '-' }}
              </div>
            </td>
            <td class="px-5 py-4">
              <div class="flex items-center truncate">
                <a
                  v-if="item.note_instagram_link"
                  :href="item.note_instagram_link"
                  target="_blank"
                  class="text-blue-500 hover:text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  {{ item.note_instagram_link }}
                </a>
                <span v-else class="text-gray-400">-</span>
              </div>
            </td>
            <td class="px-5 py-4 text-right">
              <button
                @click="$emit('edit', item)"
                class="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10"
                title="Edit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              </button>
              <button
                @click="$emit('delete', item.id)"
                class="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10"
                title="Delete"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1 && !loading" class="px-5 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
      <span class="text-sm text-gray-500 dark:text-gray-400">
        Page <span class="font-medium text-gray-900 dark:text-white">{{ currentPage }}</span> of <span class="font-medium text-gray-900 dark:text-white">{{ totalPages }}</span>
      </span>
      <div class="flex gap-2">
        <button
          @click="$emit('page-change', currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Previous
        </button>
        <button
          @click="$emit('page-change', currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getImageUrl } from '@/utils/imageUrl'

defineProps<{
  items: any[]
  loading: boolean
  currentPage: number
  totalPages: number
}>()

defineEmits<{
  (e: 'create'): void
  (e: 'edit', item: any): void
  (e: 'delete', id: number): void
  (e: 'page-change', page: number): void
}>()
</script>
