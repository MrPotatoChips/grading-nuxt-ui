import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/maintenances/subjects', { params })
  },

  async show (id) {
    return axios.get(`admin/maintenances/subjects/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/maintenances/subjects', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/maintenances/subjects/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/maintenances/subjects/${data.id}`, { data })
  }
}
