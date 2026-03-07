import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/clusters', { params })
  },

  async show (id) {
    return axios.get(`admin/clusters/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/clusters', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/clusters/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/clusters/${data.id}`, { data })
  }
}
