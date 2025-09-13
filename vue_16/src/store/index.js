import { createStore } from 'vuex'
import getModuleSettingsObject from './helpers/getModuleSettingsObject'

import auth from './modules/auth'
import users from './modules/users'

export default createStore({
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    users,
    products: getModuleSettingsObject('products'),
    sellers: getModuleSettingsObject('sellers'),
    brands: getModuleSettingsObject('brands'),
  },
})