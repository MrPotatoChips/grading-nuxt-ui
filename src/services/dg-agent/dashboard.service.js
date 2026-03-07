import axios from 'axios'

export default {
  async getStats () {
    return axios.get('dga/dashboard/stats')
  },

  async getRecentTasks (params = {}) {
    return axios.get('dga/dashboard/recent-tasks', { params })
  },

  async getActivities (params = {}) {
    return axios.get('dga/dashboard/activities', { params })
  }
}
