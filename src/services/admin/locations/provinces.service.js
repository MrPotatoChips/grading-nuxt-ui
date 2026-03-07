import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/provinces', { params })
  },

  async show (id) {
    return axios.get(`admin/provinces/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/provinces', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/provinces/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/provinces/${data.id}`, { data })
  }
}
