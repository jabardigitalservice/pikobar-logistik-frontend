import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  listOutgoingMail: [],
  totalListOutgoingMail: 0,
  totalDataOutgoingMail: 0
}

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state
}