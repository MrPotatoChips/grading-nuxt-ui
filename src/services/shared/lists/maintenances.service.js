import axios from 'axios'

export default {
  async getActivities (params = {}) {
    return axios.get('shared/list/activities', { params })
  },

  async getCropCategories (params = {}) {
    return axios.get('shared/list/crop-categories', { params })
  },

  async getCrops (params = {}) {
    return axios.get('shared/list/crops', { params })
  },

  async getDocumentTypes (params = {}) {
    return axios.get('shared/list/document-types', { params })
  },

  async getProductGroups (params = {}) {
    return axios.get('shared/list/product-groups', { params })
  },

  async getProductCategories (params = {}) {
    return axios.get('shared/list/product-categories', { params })
  },

  async getProducts (params = {}) {
    return axios.get('shared/list/products', { params })
  }
}
