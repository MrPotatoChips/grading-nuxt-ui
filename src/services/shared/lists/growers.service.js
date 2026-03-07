import axios from 'axios'

export default {
  async getGrowerFarms (params = {}) {
    return axios.get('shared/lists/grower-farms', { params })
  },

  async getGrowerCrops (params = {}) {
    return axios.get('shared/lists/grower-crops', { params })
  }
}
