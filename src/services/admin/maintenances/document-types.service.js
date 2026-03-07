import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/document-types', { params })
  },

  async show (id) {
    return axios.get(`admin/document-types/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/document-types', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/document-types/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/document-types/${data.id}`, { data })
  }
}
