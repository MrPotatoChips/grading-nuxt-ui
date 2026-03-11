import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/maintenances/sections', { params })
  },

  async show (id) {
    return axios.get(`admin/maintenances/sections/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/maintenances/sections', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/maintenances/sections/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/maintenances/sections/${data.id}`, { data })
  }
}
