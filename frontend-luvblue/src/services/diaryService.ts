import { request } from './api'

export const diaryService = {
  getAll(page: number = 1, limit: number = 10) {
    return request(`/diary?page=${page}&limit=${limit}`, {
      method: 'GET'
    })
  },

  getById(id: number | string) {
    return request(`/diary/${id}`, {
      method: 'GET'
    })
  },

  create(data: FormData) {
    return request('/diary', {
      method: 'POST',
      body: data
    })
  },

  update(id: number | string, data: FormData) {
    return request(`/diary/${id}`, {
      method: 'PUT',
      body: data
    })
  },

  delete(id: number | string) {
    return request(`/diary/${id}`, {
      method: 'DELETE'
    })
  }
}
