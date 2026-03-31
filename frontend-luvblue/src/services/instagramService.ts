import { request } from './api'

export const instagramService = {
  async getAll(page = 1, limit = 10) {
    return request(`/instagram?page=${page}&limit=${limit}`)
  },

  async create(formData: FormData) {
    return request('/instagram', {
      method: 'POST',
      body: formData,
    })
  },

  async update(id: number | string, formData: FormData) {
    return request(`/instagram/${id}`, {
      method: 'PUT', // OpenAPI says PUT for /instagram/{id}
      body: formData,
    })
  },

  async delete(id: number | string) {
    return request(`/instagram/${id}`, {
      method: 'DELETE',
    })
  },

  async getStats() {
    return request('/instagram/stats')
  }
}
