import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('admin/crops', { params })
  },

  async show (id) {
    return axios.get(`admin/crops/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/crops', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/crops/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/crops/${data.id}`, { data })
  }
}
