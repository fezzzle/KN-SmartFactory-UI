import axios from 'axios'

export default axios.create({
  baseURL: 'https://json-server-testing-v1.herokuapp.com/factory_api/',
  headers: {
    'Content-type': 'application/json',
  },
})
