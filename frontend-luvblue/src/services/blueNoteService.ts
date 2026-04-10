import { request } from './api'

export const blueNoteService = {
  getAll(page: number = 1, limit: number = 10) {
    return request(`/blue-notes?page=${page}&limit=${limit}`, {
      method: 'GET'
    })
  },

  getById(id: number | string) {
    return request(`/blue-notes/${id}`, {
      method: 'GET'
    })
  },

  create(data: FormData) {
    return request('/blue-notes', {
      method: 'POST',
      body: data
    })
  },

  update(id: number | string, data: FormData) {
    return request(`/blue-notes/${id}`, {
      method: 'PUT',
      body: data
    })
  },

  delete(id: number | string) {
    return request(`/blue-notes/${id}`, {
      method: 'DELETE'
    })
  }
}
