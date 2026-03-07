import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/locations/regions', { params })
  },

  async show (id) {
    return axios.get(`admin/locations/regions/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/locations/regions', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/locations/regions/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/locations/regions/${data.id}`, { data })
  }
}
