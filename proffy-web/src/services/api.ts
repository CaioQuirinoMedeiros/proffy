import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  validateStatus: (status) => status < 400 || status === 401
})

export default api
