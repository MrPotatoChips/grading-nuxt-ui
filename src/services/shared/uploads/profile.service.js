import axios from 'axios'
import { isFunction } from 'lodash'

const ProfilePhotoService = {
  /**
   * Retrieve data based on the provided parameters
   * @async
   * @param {Object} params - Query parameters to filter data
   * @param {number} params.page - Name of the cluster to search for
   * @param {number} params.per_page - Number of data per page
   * @param {string} params.sort - Sort by field (e.g., 'name', 'created_at')
   * @param {boolean} params.sort_desc - Sorting if descending (e.g., 'true' or 'false')
   * @param {string} params.filter_text - Text to filter data by name
   * @returns {Promise<Object>} The API response containing data
   */
  async get (params = {}) {
    return axios.get('shared/uploads/profile-photos', { params })
  },

  async show (id) {
    return axios.get(`shared/uploads/profile-photos/${id}`)
  },

  async post (params = {}, useUploadProgress = null) {
    const defaultConfig = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    const finalConfig = isFunction(useUploadProgress) ? Object.assign(defaultConfig, {
      onUploadProgress: progressEvent => {
        const { loaded, total } = progressEvent
        const progress = Math.round((loaded * 100) / total).toFixed(2)
        useUploadProgress(progress, loaded, total)
      }
    }) : defaultConfig

    return axios.post('shared/uploads/profile-photos', params, finalConfig)
  },

  async put (params = { id: '' }) {
    return axios.put(`shared/uploads/profile-photos/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`shared/uploads/profile-photos/${data.id}`, { data })
  }
}

export default ProfilePhotoService
