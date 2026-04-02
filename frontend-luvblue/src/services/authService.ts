import { request } from './api'

export const authService = {
  async login(credentials: any) {
    const response: any = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })

    // Support both root-level and data-level token/user (OpenAPI vs common patterns)
    const token = response.token || response.data?.token
    const user = response.user || response.data?.user

    if (response.success && token) {
      localStorage.setItem('token', token)
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
      }
    }

    return response
  },

  async logout() {
    try {
      await request('/auth/logout', {
        method: 'POST',
      })
    } catch (error) {
      console.error('Logout API call failed', error)
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },

  isLoggedIn() {
    const token = localStorage.getItem('token')
    if (!token) return false

    try {
      // Basic JWT decoding to check expiration
      const parts = token.split('.')
      if (parts.length !== 3) {
        this.clearAuth()
        return false
      }

      const payload = JSON.parse(atob(parts[1]!))
      const isExpired = payload.exp * 1000 < Date.now()
      if (isExpired) {
        this.clearAuth()
        return false
      }
      return true
    } catch (e) {
      this.clearAuth()
      return false
    }
  },

  clearAuth() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }
}
