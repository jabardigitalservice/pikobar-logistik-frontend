export default {
  listAPD: (state, getters) => {
    return state.dataListAPD
  },
  listApdUnit: (state, getters) => {
    return state.dataListApdUnit
  },
  listInstanceType: (state, getters) => {
    return state.dataInstanceType
  },
  listLogisticRequest: (state, getters) => {
    return state.dataListLogisticRequest
  },
  totalListLogisticRequest: (state, getters) => {
    return state.totalListLogisticRequest
  },
  detailLogisticRequest: (state, getters) => {
    return state.dataDetailLogisticRequest
  },
  listLogisticNeeds: (state, getters) => {
    return state.dataListDetailLogisticNeeds
  },
  totalLogisticNeeds: (state, getters) => {
    return state.totalDetailLogisticNeeds
  }
}
