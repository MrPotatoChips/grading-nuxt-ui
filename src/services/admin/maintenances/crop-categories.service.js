import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/crop-categories', { params })
  },

  async show (id) {
    return axios.get(`admin/crop-categories/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/crop-categories', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/crop-categories/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/crop-categories/${data.id}`, { data })
  }
}
