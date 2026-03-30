<template>
  <AdminLayout title="Instagram Management">
    <PageBreadcrumb page-title="Instagram Management" />
    
    <div class="mt-6">
      <InstagramTable
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
    <Modal :show="showModal" :title="isEditing ? 'Edit Post' : 'Create New Post'" @close="closeModal">
      <form @submit.prevent="savePost" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Users (comma separated)</label>
          <input
            v-model="form.instagram_users"
            type="text"
            placeholder="e.g. user1, user2"
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
          <img :src="previewUrl" class="h-32 rounded-lg object-cover border border-gray-200 dark:border-gray-700" />
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
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import InstagramTable from '@/components/instagram/InstagramTable.vue'
import Modal from '@/components/common/modal/Modal.vue'
import { instagramService } from '@/services/instagramService'
import { useToast } from '@/composables/useToast'

const toast = useToast()
const items = ref([])
const loading = ref(false)
const saving = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)
const showModal = ref(false)
const isEditing = ref(false)
const currentId = ref<number | null>(null)
const selectedFile = ref<File | null>(null)
const previewUrl = ref('')

const form = reactive({
  instagram_users: ''
})

const fetchItems = async () => {
  loading.value = true
  try {
    const response = await instagramService.getAll(currentPage.value) as any
    if (response.success) {
      items.value = response.data.data
      totalPages.value = response.data.meta.totalPages
    }
  } catch (error: any) {
    toast.error('Failed to fetch Instagram posts')
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
  form.instagram_users = ''
  showModal.value = true
}

const openEditModal = (item: any) => {
  isEditing.value = true
  currentId.value = item.id
  selectedFile.value = null
  previewUrl.value = item.image_url.split(',')[0].trim() // Best effort preview
  form.instagram_users = item.instagram_users || ''
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const savePost = async () => {
  if (!isEditing.value && !selectedFile.value) {
    toast.error('Please select an image')
    return
  }

  saving.value = true
  const formData = new FormData()
  if (selectedFile.value) {
    formData.append('instagram_image', selectedFile.value)
  }
  formData.append('instagram_users', form.instagram_users)

  try {
    if (isEditing.value && currentId.value) {
      await instagramService.update(currentId.value, formData)
      toast.success('Post updated successfully')
    } else {
      await instagramService.create(formData)
      toast.success('Post created successfully')
    }
    closeModal()
    fetchItems()
  } catch (error: any) {
    toast.error(error.message || 'Failed to save post')
  } finally {
    saving.value = false
  }
}

const confirmDelete = async (id: number) => {
  if (confirm('Are you sure you want to delete this post?')) {
    try {
      await instagramService.delete(id)
      toast.success('Post deleted successfully')
      fetchItems()
    } catch (error: any) {
      toast.error('Failed to delete post')
    }
  }
}

onMounted(fetchItems)
</script>
