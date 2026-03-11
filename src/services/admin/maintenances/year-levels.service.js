import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/maintenances/year-levels', { params })
  },

  async show (id) {
    return axios.get(`admin/maintenances/year-levels/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/maintenances/year-levels', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/maintenances/year-levels/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/maintenances/year-levels/${data.id}`, { data })
  }
}
