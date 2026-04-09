<template>
  <AdminLayout title="Diary Management">
    <PageBreadcrumb page-title="Diary Management" />
    
    <div class="mt-6">
      <DiaryTable
        :items="items"
        :loading="loading"
        :current-page="currentPage"
        :total-pages="totalPages"
        @create="openCreateModal"
        @edit="openEditModal"
        @delete="confirmDelete"
        @page-change="handlePageChange"
      />
    </div>

    <!-- Create/Edit Modal -->
    <Modal :show="showModal" :title="isEditing ? 'Edit Diary Entry' : 'Create New Diary Entry'" @close="closeModal">
      <form @submit.prevent="savePost" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Title</label>
          <input
            v-model="form.diary_title"
            type="text"
            required
            placeholder="Main Title"
            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Brief Title</label>
          <input
            v-model="form.diary_brief_title"
            type="text"
            placeholder="Short Title"
            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Brief Description</label>
          <textarea
            v-model="form.diary_brief_description"
            rows="3"
            placeholder="Short description..."
            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Instagram Link (optional)</label>
          <input
            v-model="form.diary_instagram_link"
            type="text"
            placeholder="e.g. https://instagram.com/p/..."
            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
            Image {{ isEditing ? '(optional if no change)' : '' }}
          </label>
          <input
            type="file"
            @change="handleFileChange"
            accept="image/*"
            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          />
        </div>
        <div v-if="previewUrl" class="mt-2">
          <p class="text-xs text-gray-400 mb-1">Preview:</p>
          <img :src="getImageUrl(previewUrl)" class="h-32 rounded-lg object-cover border border-gray-200 dark:border-gray-700" />
        </div>
      </form>
      <template #footer>
        <button @click="closeModal" class="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          Cancel
        </button>
        <button
          @click="savePost"
          :disabled="saving"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {{ saving ? 'Saving...' : 'Save Changes' }}
        </button>
      </template>
    </Modal>

    <!-- Delete Confirmation Modal -->
    <Modal :show="showDeleteModal" title="Confirm Delete" @close="closeDeleteModal">
      <div class="p-6 text-center">
        <div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center mx-auto mb-4">
          <TrashIcon class="text-red-500" width="24" height="24" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Delete Entry?</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Are you sure you want to delete this diary entry? This action cannot be undone.
        </p>
      </div>
      <template #footer>
        <button @click="closeDeleteModal" class="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700">
          Cancel
        </button>
        <button
          @click="executeDelete"
          :disabled="deleting"
          class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {{ deleting ? 'Deleting...' : 'Delete Now' }}
        </button>
      </template>
    </Modal>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import DiaryTable from '@/components/diary/DiaryTable.vue'
import Modal from '@/components/common/modal/Modal.vue'
import { TrashIcon } from '@/icons'
import { diaryService } from '@/services/diaryService'
import { useToast } from '@/composables/useToast'
import { getImageUrl } from '@/utils/imageUrl'

const toast = useToast()
const items = ref<any[]>([])
const loading = ref(false)
const saving = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)
const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const currentId = ref<number | null>(null)
const itemToDelete = ref<number | null>(null)
const selectedFile = ref<File | null>(null)
const previewUrl = ref('')
const deleting = ref(false)

const form = reactive({
  diary_title: '',
  diary_brief_title: '',
  diary_brief_description: '',
  diary_instagram_link: ''
})

const fetchItems = async () => {
  loading.value = true
  try {
    const response = await diaryService.getAll(currentPage.value) as any
    if (response.success) {
      // Support both { data: [...] } and { data: { data: [...], meta: {...} } }
      const responseData = response.data
      if (Array.isArray(responseData)) {
        items.value = responseData
        totalPages.value = 1
      } else if (responseData?.data && Array.isArray(responseData.data)) {
        items.value = responseData.data
        totalPages.value = responseData.meta?.totalPages || 1
      }
    }
  } catch (error: any) {
    toast.error('Failed to fetch diary entries')
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchItems()
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
    previewUrl.value = URL.createObjectURL(target.files[0])
  }
}

const openCreateModal = () => {
  isEditing.value = false
  currentId.value = null
  selectedFile.value = null
  previewUrl.value = ''
  form.diary_title = ''
  form.diary_brief_title = ''
  form.diary_brief_description = ''
  form.diary_instagram_link = ''
  showModal.value = true
}

const openEditModal = (item: any) => {
  isEditing.value = true
  currentId.value = item.id
  selectedFile.value = null
  previewUrl.value = item.diary_image || '' 
  form.diary_title = item.diary_title || ''
  form.diary_brief_title = item.diary_brief_title || ''
  form.diary_brief_description = item.diary_brief_description || ''
  form.diary_instagram_link = item.diary_instagram_link || ''
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const savePost = async () => {
  if (!form.diary_title) {
    toast.error('Title is required')
    return
  }

  saving.value = true
  const formData = new FormData()
  if (selectedFile.value) {
    formData.append('diary_image', selectedFile.value)
  }
  formData.append('diary_title', form.diary_title)
  formData.append('diary_brief_title', form.diary_brief_title)
  formData.append('diary_brief_description', form.diary_brief_description)
  formData.append('diary_instagram_link', form.diary_instagram_link)

  try {
    if (isEditing.value && currentId.value) {
      await diaryService.update(currentId.value, formData)
      toast.success('Diary entry updated successfully')
    } else {
      await diaryService.create(formData)
      toast.success('Diary entry created successfully')
    }
    closeModal()
    fetchItems()
  } catch (error: any) {
    toast.error(error.message || 'Failed to save diary entry')
  } finally {
    saving.value = false
  }
}

const confirmDelete = (id: number) => {
  itemToDelete.value = id
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  itemToDelete.value = null
}

const executeDelete = async () => {
  if (!itemToDelete.value) return
  
  deleting.value = true
  try {
    const response = await diaryService.delete(itemToDelete.value) as any
    if (response.success) {
      toast.success('Diary entry deleted successfully')
    } else {
      toast.error(response.message || 'Failed to delete entry')
    }
  } catch (error: any) {
    toast.error(error.message || 'Failed to delete entry')
  } finally {
    deleting.value = false
    fetchItems()
    closeDeleteModal()
  }
}

onMounted(fetchItems)
</script>
