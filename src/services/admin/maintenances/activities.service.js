import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/activities', { params })
  },

  async show (id) {
    return axios.get(`admin/activities/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/activities', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/activities/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/activities/${data.id}`, { data })
  }
}
