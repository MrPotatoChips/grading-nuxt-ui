import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/regions', { params })
  },

  async show (id) {
    return axios.get(`admin/regions/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/regions', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/regions/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/regions/${data.id}`, { data })
  }
}
