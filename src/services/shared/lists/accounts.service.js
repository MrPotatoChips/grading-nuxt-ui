import axios from 'axios'

export default {
  async getRoles (params = {}) {
    return axios.get('shared/lists/accounts/roles', { params })
  },

  async getStudents (params = {}) {
    return axios.get('shared/lists/accounts/students', { params })
  },

  async getTeachers (params = {}) {
    return axios.get('shared/lists/accounts/teachers', { params })
  }
}
