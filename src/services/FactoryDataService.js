import http from './http-common'

class apiDataService {
  getAll() {
    return http.get('/factory_api')
  }

  get(id) {
    return http.get(`/factory_api/${id}`)
  }

  create(data) {
    return http.post('/factory_api', data)
  }

  update(id, data) {
    return http.put(`/factory_api/${id}`, data)
  }

  patch(id, data) {
    return http.patch(`/factory_api/${id}`, data)
  }

  delete(id) {
    return http.delete(`/factory_api/${id}`)
  }

  deleteAll() {
    return http.delete('/factory_api')
  }

  // findByfirstname(firstname) {
  //   return http.get(`/people?firstname=${firstname}`)
  // }
}

export default new apiDataService()
