import axios from 'axios'

export default axios.create({
  // baseURL: 'https://json-server-testing-v1.herokuapp.com/factory_api/',
  baseURL: 'http://localhost:3000/machines',
  headers: {
    'Content-type': 'application/json',
  },
})
