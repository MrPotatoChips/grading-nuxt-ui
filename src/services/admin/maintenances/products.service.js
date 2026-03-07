import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/products', { params })
  },

  async show (id) {
    return axios.get(`admin/products/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/products', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/products/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/products/${data.id}`, { data })
  }
}
