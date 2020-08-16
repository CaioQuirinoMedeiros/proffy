import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  validateStatus: (status) => status < 500,
})

export default api
