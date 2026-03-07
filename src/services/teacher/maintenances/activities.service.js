import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/maintenances/activities', { params })
  },

  async show (id) {
    return axios.get(`admin/maintenances/activities/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/maintenances/activities', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/maintenances/activities/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/maintenances/activities/${data.id}`, { data })
  }
}
