import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const mockData = [
  {
    id: '1',
    number: 1,
    login: 'smith@gmail.com',
    orders: 312,
    status: 'Ценитель красоты',
  },
  {
    id: '2',
    number: 2,
    login: 'lenin@gmail.com',
    orders: 98,
    status: 'Поставщик аксессуаров',
  },
  {
    id: '3',
    number: 3,
    login: 'mask@gmail.com',
    orders: 120,
    status: 'Конкурент минздрава',
  },
  {
    id: '4',
    number: 4,
    login: 'dog@mail.ru',
    orders: 64,
    status: 'рыбак',
  },
  {
    id: '5',
    number: 5,
    login: 'nightmare@mail.ru',
    orders: 34,
    status: 'охотник',
  },
  {
    id: '6',
    number: 6,
    login: 'cat@mail.ru',
    orders: 1,
    status: 'Ценитель красоты',
  },
  {
    id: '7',
    number: 7,
    login: 'fish@mail.ru',
    orders: -21,
    status: 'Тестовый',
  },
]

const table = {
  namespaced: true,
  state: () => ({
    tableData: [],
  }),
  getters: {
    getTableData: (state) => state.tableData,
  },
  mutations: {
    setTableData: (state, payload) => (state.tableData = payload),
  },
  actions: {
    async fetchTableData() {
      return new Promise((res) => {
        setTimeout(() => {
          res(mockData)
        }, 400)
      })
    },
  },
}

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    table,
  },
})
