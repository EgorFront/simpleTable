<template>
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
</template>

<script>
import CustomTable from '@/components/table/custom-table'

export default {
  name: 'Home',
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
        const data = await this.$store.dispatch('table/fetchTableData')
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

.container {
  padding: 20px;
  overflow-x: auto;
}
</style>
