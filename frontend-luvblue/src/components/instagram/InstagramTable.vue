<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
    <div class="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="relative w-full sm:w-64">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          <SearchIcon width="18" height="18" />
        </span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search users..."
          class="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
        />
      </div>
      <button
        @click="$emit('create')"
        class="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <PlusIcon width="16" height="16" />
        Add Post
      </button>
    </div>

    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-100 dark:border-gray-800 text-left">
            <th class="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400">ID</th>
            <th class="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400">Images</th>
            <th class="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400">Users</th>
            <th class="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400">Links</th>
            <th class="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
          <tr v-if="loading" class="animate-pulse">
            <td colspan="5" class="px-5 py-10 text-center text-gray-400">Loading posts...</td>
          </tr>
          <tr v-else-if="filteredItems.length === 0">
            <td colspan="5" class="px-5 py-10 text-center text-gray-400">No posts found.</td>
          </tr>
          <tr v-for="item in filteredItems" :key="item.id">
            <td class="px-5 py-4 text-theme-sm text-gray-600 dark:text-gray-400">#{{ item.id }}</td>
            <td class="px-5 py-4">
              <div class="flex -space-x-2 overflow-hidden">
                <img
                  v-for="(url, idx) in item.image_url.split(',')"
                  :key="idx"
                  :src="getImageUrl(url)"
                  class="inline-block h-10 w-10 rounded-lg ring-2 ring-white dark:ring-gray-900 object-cover"
                  alt="Post image"
                />
              </div>
            </td>
            <td class="px-5 py-4 text-theme-sm text-gray-800 dark:text-white/90">
              {{ item.instagram_users || 'N/A' }}
            </td>
            <td class="px-5 py-4 text-theme-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
              <div v-if="item.instagram_links" class="flex flex-col gap-1">
                <a
                  v-for="(link, idx) in item.instagram_links.split(',')"
                  :key="idx"
                  :href="link.trim()"
                  target="_blank"
                  class="text-blue-500 hover:underline truncate"
                >
                  {{ link.trim() }}
                </a>
              </div>
              <span v-else>N/A</span>
            </td>
            <td class="px-5 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <button
                  @click="$emit('edit', item)"
                  class="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Edit"
                >
                  <EditIcon width="18" height="18" />
                </button>
                <button
                  @click="$emit('delete', item.id)"
                  class="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Delete"
                >
                  <TrashIcon width="18" height="18" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="px-5 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
      <p class="text-sm text-gray-500">
        Page <span class="font-medium">{{ currentPage }}</span> of <span class="font-medium">{{ totalPages }}</span>
      </p>
      <div class="flex items-center gap-2">
        <button
          @click="$emit('page-change', currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-700 dark:hover:bg-gray-800"
        >
          Previous
        </button>
        <button
          @click="$emit('page-change', currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-700 dark:hover:bg-gray-800"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { SearchIcon, PlusIcon, EditIcon, TrashIcon } from '@/icons'
import { getImageUrl } from '@/utils/imageUrl'

const props = defineProps<{
  items: any[]
  loading: boolean
  currentPage: number
  totalPages: number
}>()

defineEmits(['create', 'edit', 'delete', 'page-change'])

const searchQuery = ref('')

const filteredItems = computed(() => {
  if (!searchQuery.value) return props.items
  const q = searchQuery.value.toLowerCase()
  return props.items.filter(item => 
    (item.instagram_users || '').toLowerCase().includes(q) ||
    (item.instagram_links || '').toLowerCase().includes(q) ||
    item.id.toString().includes(q)
  )
})
</script>
