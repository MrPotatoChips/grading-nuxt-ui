import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/growers', { params })
  },

  async show (id) {
    return axios.get(`admin/growers/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/growers', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/growers/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/growers/${data.id}`, { data })
  }
}
