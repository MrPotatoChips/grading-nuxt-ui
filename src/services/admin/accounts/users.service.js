import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/users', { params })
  },

  async show (id) {
    return axios.get(`admin/users/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/users', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/users/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/users/${data.id}`, { data })
  }
}
