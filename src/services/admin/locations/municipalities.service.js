import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/municipalities', { params })
  },

  async show (id) {
    return axios.get(`admin/municipalities/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/municipalities', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/municipalities/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/municipalities/${data.id}`, { data })
  }
}
