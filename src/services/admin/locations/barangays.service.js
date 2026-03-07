import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/barangays', { params })
  },

  async show (id) {
    return axios.get(`admin/barangays/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/barangays', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/barangays/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/barangays/${data.id}`, { data })
  }
}
