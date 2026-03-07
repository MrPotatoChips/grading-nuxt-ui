import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('dga/grower-documents', { params })
  },

  async show (id) {
    return axios.get(`dga/grower-documents/${id}`)
  },

  async post (params = {}) {
    return axios.post('dga/grower-documents', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`dga/grower-documents/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`dga/grower-documents/${data.id}`, { data })
  }
}
