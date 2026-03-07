import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/locations/barangays', { params })
  },

  async show (id) {
    return axios.get(`admin/locations/barangays/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/locations/barangays', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/locations/barangays/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/locations/barangays/${data.id}`, { data })
  }
}
