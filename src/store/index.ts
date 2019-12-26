import { Item } from '@/models/Item'
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'random-calculate',
  storage: window.localStorage
})

const defaultState = () => {
  return {
    theme: 'dark',
    items: [
      { key: 'a', value: 3, active: true, operation: '', valueList: [3] },
      { key: 'b', value: 3, active: true, operation: '', valueList: [3] },
      { key: 'c', value: 3, active: true, operation: '', valueList: [3] },
      { key: 'd', value: 3, active: true, operation: '', valueList: [3] },
      { key: 'e', value: 3, active: true, operation: '', valueList: [3] },
      { key: 'f', value: 3, active: true, operation: '', valueList: [3] },
      { key: 'g', value: 3, active: true, operation: '', valueList: [3] },
      { key: 'h', value: 3, active: true, operation: '', valueList: [3] },
      { key: 'i', value: 3, active: true, operation: '', valueList: [3] },
      { key: 'j', value: 3, active: true, operation: '', valueList: [3] }
    ],
    interval: [0]
  }
}

export const store = new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: defaultState(),
  mutations: {
    SET_THEME(state: any, payload: string) {
      state.theme = payload
    },
    UPDATE_ITEMS(state: any, payload: Item[]) {
      state.items = payload
    },
    ADD_INTERVAL(state: any) {
      state.interval.push(state.interval[state.interval.length - 1] + 2)
    },
    RESET_VALUES(state: any) {
      Object.assign(state, defaultState())
    },
    TOGGLE_ACTIVE(state: any, index: number) {
      state.items[index].active = !state.items[index].active
    }
  },
  actions: {
    setTheme({ commit }, payload: string) {
      commit('SET_THEME', payload)
    },
    updateItems({ commit }, payload: Item[]) {
      commit('UPDATE_ITEMS', payload)
    },
    addInterval({ commit }) {
      commit('ADD_INTERVAL')
    },
    resetValues({ commit }) {
      commit('RESET_VALUES')
    },
    toggleActive({ commit }, payload: number) {
      commit('TOGGLE_ACTIVE', payload)
    }
  },
  getters: {
    theme: (state) => state.theme,
    items: (state) => state.items,
    interval: (state) => state.interval
  }
})
