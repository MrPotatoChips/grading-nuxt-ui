import axios from 'axios'

export default {
  async getActivities (params = {}) {
    return axios.get('shared/lists/activities', { params })
  },

  async getCropCategories (params = {}) {
    return axios.get('shared/lists/crop-categories', { params })
  },

  async getCrops (params = {}) {
    return axios.get('shared/lists/crops', { params })
  },

  async getDocumentTypes (params = {}) {
    return axios.get('shared/lists/document-types', { params })
  },

  async getProductGroups (params = {}) {
    return axios.get('shared/lists/product-groups', { params })
  },

  async getProductCategories (params = {}) {
    return axios.get('shared/lists/product-categories', { params })
  },

  async getProducts (params = {}) {
    return axios.get('shared/lists/products', { params })
  }
}
