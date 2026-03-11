import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/accounts/activities', { params })
  },

  async show (id) {
    return axios.get(`admin/accounts/activities/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/accounts/activities', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/accounts/activities/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/accounts/activities/${data.id}`, { data })
  }
}
