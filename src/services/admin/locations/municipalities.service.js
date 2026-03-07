import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/locations/municipalities', { params })
  },

  async show (id) {
    return axios.get(`admin/locations/municipalities/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/locations/municipalities', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/locations/municipalities/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/locations/municipalities/${data.id}`, { data })
  }
}
