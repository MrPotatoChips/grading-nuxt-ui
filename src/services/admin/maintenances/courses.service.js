import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/maintenances/courses', { params })
  },

  async show (id) {
    return axios.get(`admin/maintenances/courses/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/maintenances/courses', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/maintenances/courses/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/maintenances/courses/${data.id}`, { data })
  }
}
