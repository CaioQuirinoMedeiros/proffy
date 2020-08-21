import axios from 'axios'

const api = axios.create({
  baseURL: 'https://proffy-caio.herokuapp.com'
})

export default api
