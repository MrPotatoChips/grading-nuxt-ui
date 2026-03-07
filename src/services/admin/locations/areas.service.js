import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/areas', { params })
  },

  async show (id) {
    return axios.get(`admin/areas/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/areas', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/areas/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/areas/${data.id}`, { data })
  }
}
