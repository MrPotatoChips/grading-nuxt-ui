import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/maintenances/semesters', { params })
  },

  async show (id) {
    return axios.get(`admin/maintenances/semesters/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/maintenances/semesters', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/maintenances/semesters/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/maintenances/semesters/${data.id}`, { data })
  }
}
