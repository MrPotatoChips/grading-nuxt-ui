import axios from 'axios'

export default {
  async getGrowerFarms (params = {}) {
    return axios.get('shared/list/grower-farms', { params })
  },

  async getGrowerCrops (params = {}) {
    return axios.get('shared/list/grower-crops', { params })
  }
}
