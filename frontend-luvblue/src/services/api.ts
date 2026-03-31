const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token')
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  // If using FormData (for image upload), remove Content-Type to let the browser set it with boundary
  if (options.body instanceof FormData) {
    delete headers['Content-Type']
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }

  return data
}
