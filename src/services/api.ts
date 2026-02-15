import axios from 'axios'

// Default to the backend port exposed by docker-compose (HOST_WEB_PORT).
// If you set VITE_API_BASE in a .env file it will override this value.
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8001'

// Do not force a global `Content-Type` header — allow axios/browser
// to set the correct header for FormData (multipart/form-data).
const api = axios.create({
    baseURL: API_BASE,
})

export function setAccessToken(token: string | null) {
    if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    else delete api.defaults.headers.common['Authorization']
}

export default api

// Tasks API helpers
export async function fetchTasks(skip = 0, limit = 100) {
    const res = await api.get('/tasks', { params: { skip, limit } })
    return res.data
}

export async function createTask(title: string, description?: string) {
    const res = await api.post('/tasks/', { title, description })
    return res.data
}
