import { request } from './api'

export const authService = {
  async login(credentials: any) {
    const response: any = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
    
    if (response.success && response.data?.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    
    return response
  },

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  isLoggedIn() {
    return !!localStorage.getItem('token')
  },

  getUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }
}
