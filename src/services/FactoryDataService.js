import http from './http-common'

class apiDataService {
  getAll() {
    return http.get('/')
  }

  get(id) {
    return http.get(`/people/${id}`)
  }

  create(data) {
    return http.post('/people', data)
  }

  update(id, data) {
    return http.put(`/people/${id}`, data)
  }

  delete(id) {
    return http.delete(`/people/${id}`)
  }

  deleteAll() {
    return http.delete('/people')
  }

  findByfirstname(firstname) {
    return http.get(`/people?firstname=${firstname}`)
  }
}

export default new apiDataService()
