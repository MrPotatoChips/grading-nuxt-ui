import axios from 'axios'

export default {
  /**
   * Retrieve data based on the provided parameters
   * @async
   * @param {Object} params - Query parameters to filter data
   * @param {number} params.page - Name of the area to search for
   * @param {number} params.per_page - Number of data per page
   * @param {string} params.sort - Sort by field (e.g., 'name', 'created_at')
   * @param {boolean} params.sort_desc - Sorting if descending (e.g., 'true' or 'false')
   * @param {string} params.filter_text - Text to filter data by name
   * @returns {Promise<Object>} The API response containing data
   */
  async getUpcomingActivities (params = {}) {
    return axios.get('admin/upcoming-activities', { params })
  }
}
