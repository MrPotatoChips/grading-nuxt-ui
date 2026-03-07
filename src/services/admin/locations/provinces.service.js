import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/locations/provinces', { params })
  },

  async show (id) {
    return axios.get(`admin/locations/provinces/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/locations/provinces', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/locations/provinces/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/locations/provinces/${data.id}`, { data })
  }
}
