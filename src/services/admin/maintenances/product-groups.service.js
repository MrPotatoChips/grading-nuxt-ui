import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/product-groups', { params })
  },

  async show (id) {
    return axios.get(`admin/product-groups/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/product-groups', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/product-groups/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/product-groups/${data.id}`, { data })
  }
}
