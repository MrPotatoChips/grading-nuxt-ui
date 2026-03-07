import axios from 'axios'
import { isFunction } from 'lodash'

const GrowerProgramService = {

  /**
   * Retrieve a file based on the provided parameters
   * @async
   * @param {Object} params - The cluster data to be created
   * @param {string} params.file_name - The name of the file to be retrieved
   * @param {string|undefined} params.attachment_path - The path of the attachment to be retrieved
   * @returns {Promise<Object>} The API response containing the created cluster
   */
  async retrieveFile (params = {}, storage = 'attachment', useDownloadProgress = null) {
    const defaultConfig = {
      params,
      responseType: 'blob'
    }

    const finalConfig = isFunction(useDownloadProgress) ? Object.assign(defaultConfig, {
      onDownloadProgress: progressEvent => {
        const { loaded, total } = progressEvent
        const progress = Math.round((loaded * 100) / total).toFixed(2)

        useDownloadProgress(progress, loaded, total)
      }
    }) : defaultConfig

    return axios.get(`shared/uploads/retrieve-${storage}`, finalConfig)
  },

  async uploadFiles (params, useUploadProgress = null) {
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

    return axios.post('shared/uploads/grower-programs', params, finalConfig)
  },

  async removeFile (data = { attachment_path: '', file_name: '' }) {
    return axios.delete('shared/uploads/grower-programs/remove', { data })
  },

  async removeFiles (data = { attachment_path: '' }) {
    return axios.delete('shared/uploads/grower-programs/remove-all', { data })
  }

}

export default GrowerProgramService
