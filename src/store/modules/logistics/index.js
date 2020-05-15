import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  dataListAPD: [],
  dataListApdUnit: [],
  dataInstanceType: [],
  dataListLogisticRequest: [],
  totalListLogisticRequest: 0,
  totalDataLogisticRequest: 0,
  dataDetailLogisticRequest: {},
  totalDetailLogisticNeeds: 0,
  dataListDetailLogisticNeeds: []
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
