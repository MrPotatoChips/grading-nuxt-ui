import axios from 'axios'

export default {
  /**
   * Retrieve roles data based on the provided parameters
   * @async
   * @param {Object} params - Query parameters to filter data
   * @param {number} params.page - Page number for pagination
   * @param {number} params.per_page - Number of roles per page
   * @param {string} params.sort - Sort by field (e.g., 'name', 'created_at')
   * @param {boolean} params.sort_desc - Sorting if descending (e.g., 'true' or 'false')
   * @param {string} params.filter_text - Text to filter roles by name
   * @returns {Promise<Object>} The API response containing roles data
   */
  async get (params = {}) {
    return axios.get('admin/accounts/roles', { params })
  },

  async show (id) {
    return axios.get(`admin/accounts/roles/${id}`)
  },

  async post (params = {}) {
    return axios.post('admin/accounts/roles', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`admin/accounts/roles/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`admin/accounts/roles/${data.id}`, { data })
  }
}
