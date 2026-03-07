import axios from 'axios'

export default {
  async getTasks (params = {}) {
    return axios.get('shared/list/tasks', { params })
  }
}
