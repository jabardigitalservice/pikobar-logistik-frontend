import { fetchList, doPostUpdate } from '@/api'

export default {
  async getListFaskes({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/master-faskes', 'GET', params)
      commit('SET_TOTAL_LIST_FASKES', response.data.last_page)
      commit('SET_LIST_FASKES', response.data.data)
      return response
    } catch (error) {
      return error.response
    }
  },
  async getDetailFaskes({ commit }, faskesId) {
    try {
      const response = await fetchList(`/api/v1/master-faskes/${faskesId}`, 'GET')
      commit('SET_DETAIL_FASKES', response.data)
      return response
    } catch (e) {
      return e
    }
  },
  async postVerificationFaskes({ commit }, params) {
    try {
      const response = await doPostUpdate('/api/v1/verify-master-faskes/' + params.id, 'POST', { verification_status: params.verification_status })
      return response
    } catch (e) {
      return e
    }
  }
}
