import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/product-categories', { params })
  },

  async show (id) {
    return axios.get(`admin/product-categories/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/product-categories', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/product-categories/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/product-categories/${data.id}`, { data })
  }
}
