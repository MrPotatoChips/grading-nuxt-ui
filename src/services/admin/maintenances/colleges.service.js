import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/maintenances/colleges', { params })
  },

  async show (id) {
    return axios.get(`admin/maintenances/colleges/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/maintenances/colleges', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/maintenances/colleges/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/maintenances/colleges/${data.id}`, { data })
  }
}
