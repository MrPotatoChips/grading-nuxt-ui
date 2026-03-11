import axios from 'axios'

export default {
	async getColleges (params = {}) {
		return axios.get('shared/lists/maintenances/colleges', { params })
	},

	async getCourses (params = {}) {
		return axios.get('shared/lists/maintenances/courses', { params })
	},

	async getYearLevels (params = {}) {
		return axios.get('shared/lists/maintenances/year-levels', { params })
	},

	async getSemesters (params = {}) {
		return axios.get('shared/lists/maintenances/semesters', { params })
	},

	async getSections (params = {}) {
		return axios.get('shared/lists/maintenances/sections', { params })
	},

	async getSubjects (params = {}) {
		return axios.get('shared/lists/maintenances/subjects', { params })
	}
}
