<template>
  <div id="app">
    <div class="container">
      <custom-table :headers="table.headers" :data="table.data">
        <template #body="{ sortValues }">
          <tbody>
            <tr v-for="row in sortValues" :key="row.id">
              <td>{{ row.number }}</td>
              <td>{{ row.login }}</td>
              <td>{{ row.orders }}</td>
              <td>{{ row.status }}</td>
            </tr>
          </tbody>
        </template>
      </custom-table>
    </div>
  </div>
</template>

<script>
import CustomTable from './components/table/custom-table'

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

const fetchData = () =>
  new Promise((res) => {
    setTimeout(() => {
      res(mockData)
    }, 400)
  })

export default {
  name: 'App',
  components: {
    CustomTable,
  },

  data() {
    return {
      table: {
        headers: [
          {
            name: 'number',
            text: 'Место',
          },
          {
            name: 'login',
            text: 'Логин',

            filter: 'default',
          },
          {
            name: 'orders',
            text: 'Подтвержденные заказы',

            filter: 'between',
          },
          {
            name: 'status',
            text: 'Статус',

            filter: 'default',
          },
        ],
        data: [],
      },
    }
  },

  created() {
    this.fetchTableData()
  },

  methods: {
    async fetchTableData() {
      try {
        const data = await fetchData()
        this.table.data = data
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style lang="scss">
@import '~normalize.css/normalize.css';

* {
  box-sizing: border-box;
}

#app {
  // TODO: fix vh units on ios
  min-height: 100vh;
  background-color: #f6f6f4;
}

.container {
  padding: 20px;
  overflow-x: auto;
}
</style>
