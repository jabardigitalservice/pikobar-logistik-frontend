import { fetchList, doPostUpdate, doDetailDelete } from '@/api'

export default {
  async getListOutgoingMail({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/outgoing-letter', 'GET', params)
      commit('SET_LIST_OUTGOING_MAIL', response.data.data)
      commit('SET_TOTAL_LIST_OUTGOING_MAIL', response.data.last_page)
      commit('SET_TOTAL_DATA_OUTGOING_MAIL', response.data.total)
    } catch (e) {
      return e
    }
  },
  async getListIncomingMail({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/incoming-letter', 'GET', params)
      commit('SET_LIST_INCOMING_MAIL', response.data.data)
      commit('SET_TOTAL_LIST_INCOMING_MAIL', response.data.last_page)
      commit('SET_TOTAL_DATA_INCOMING_MAIL', response.data.total)
    } catch (e) {
      return e
    }
  },
  async getApplicationLetter({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/application-letter/search-by-letter-number', 'GET', params)
      commit('SET_APPLICATION_LETTER', response.data)
    } catch (e) {
      return e
    }
  },
  async postOutgoingMail({ commit }, params) {
    try {
      const response = await doPostUpdate('/api/v1/outgoing-letter', 'POST', params)
      return response
    } catch (e) {
      return e
    }
  },
  async postOutgoingMailApplication({ commit }, params) {
    try {
      const response = await doPostUpdate('/api/v1/application-letter', 'POST', params)
      return response
    } catch (e) {
      return e
    }
  },
  async uploadOutgoingMail({ commit }, params) {
    try {
      const response = await doPostUpdate('/api/v1/outgoing-letter/upload', 'POST', params)
      return response
    } catch (e) {
      return e
    }
  },
  async getDetailLetter({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/outgoing-letter/' + params, 'GET')
      commit('SET_DETAIL_LETTER', response.data)
      return response
    } catch (e) {
      return e
    }
  },
  async getDetailLetterByOutgoing({ commit }, params) {
    try {
      const response = await fetchList('/api/v1/application-letter', 'GET', params)
      commit('SET_DETAIL_LETTER_APPLICATION', response.data)
      commit('SET_TOTAL_LIST_OUTGOING_MAIL_APPLICATION', response.data.last_page)
      commit('SET_TOTAL_DATA_OUTGOING_MAIL_APPLICATION', response.data.total)
      return response
    } catch (e) {
      return e
    }
  },
  async getDetailLetterPrint({ commit }, id) {
    try {
      const response = await fetchList(`/api/v1/outgoing-letter-print/${id}`, 'GET')
      commit('SET_DETAIL_LETTER_PRINT', response.data)
      return response
    } catch (e) {
      return e
    }
  },
  async deleteApplicationLetter({ commit }, id) {
    try {
      const response = await doDetailDelete(`/api/v1/application-letter`, 'DELETE', id)
      return response
    } catch (error) {
      return error.response
    }
  },
  async updateApplicationLetter({ commit }, params) {
    const id = params.id
    try {
      const response = await doPostUpdate(`/api/v1/application-letter/${id}`, 'PUT', params)
      return response
    } catch (e) {
      return e
    }
  }
}
