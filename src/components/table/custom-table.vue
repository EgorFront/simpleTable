<script>
import customTableHeadCell from './custom-table-head-cell'

import { addParamUrl, deleteParamUrl, getParamUrl } from '../../utils/location'

export default {
  name: 'CustomTable',

  components: {
    customTableHeadCell,
  },

  data() {
    return {
      currentSort: '',
      currentDir: '',

      filters: {},
    }
  },

  props: {
    data: {
      type: Array,
      default: () => [],
    },

    headers: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    sortValues() {
      return this.data.slice().sort((a, b) => {
        let modifier = 1
        if (this.currentDir === 'desc') {
          modifier = -1
        }

        if (this.currentDir === '') {
          return 0
        }

        if (a[this.currentSort] < b[this.currentSort]) {
          return -1 * modifier
        }
        if (a[this.currentSort] > b[this.currentSort]) {
          return 1 * modifier
        }

        return 0
      })
    },

    filteredValues() {
      const filtersMap = {
        default(arr, key) {
          if (!arr.length) return []
          return arr.filter((row) => {
            return row[key]
              .toLowerCase()
              .includes(this.filters[key].value.toLowerCase())
          })
        },

        between(arr, key) {
          if (!arr.length) return []
          return arr.filter((row) => {
            const value = +row[key]
            const min =
              this.filters[key].valueFrom !== ''
                ? +this.filters[key].valueFrom
                : -Infinity
            const max =
              this.filters[key].valueTo !== ''
                ? +this.filters[key].valueTo
                : +Infinity

            return value <= max && value >= min
          })
        },
      }

      return this.headers.reduce((acc, cur) => {
        if (cur.filter) {
          acc = filtersMap[cur.filter].bind(this, acc, cur.name)()
        }
        return acc
      }, this.sortValues.slice())
    },
  },

  created() {
    this.fillFilters()
    this._getSortFromUrl()
  },

  watch: {
    headers() {
      this.fillFilters()
    },

    data() {
      this._getSortFromUrl()
    },
  },

  methods: {
    sortBy(name) {
      if (this.currentDir === 'desc' && this.currentSort === name) {
        this.currentDir = ''
        this.currentSort = ''
        deleteParamUrl('sort', this.currentSort)
        deleteParamUrl('dir', this.currentDir)
        return void 0
      }

      this.currentDir = this.currentDir === 'asc' ? 'desc' : 'asc'
      this.currentSort = name

      addParamUrl('sort', this.currentSort)
      addParamUrl('dir', this.currentDir)
    },

    setFilter({ name, filter, valueKey }) {
      this.filters[name][valueKey] = filter

      if (filter === '') {
        deleteParamUrl(`${name}_${valueKey}`)
      } else {
        addParamUrl(`${name}_${valueKey}`, filter)
      }
    },

    fillFilters() {
      const filtersTemplateMap = {
        default() {
          return {
            value: '',
          }
        },

        between() {
          return {
            valueFrom: '',
            valueTo: '',
          }
        },
      }

      this.headers.forEach((head) => {
        head.filter &&
          this.$set(this.filters, head.name, filtersTemplateMap[head.filter]())
      })
    },

    _getSortFromUrl() {
      const sort = getParamUrl('sort')
      const dir = getParamUrl('dir')

      this.currentSort = sort
      this.currentDir = dir
    },
  },
}
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="headCell in headers" :key="headCell.id">
          <custom-table-head-cell
            @onSort="sortBy"
            @onFilter="setFilter"
            :filterType="headCell.filter"
            :name="headCell.name"
            :text="headCell.text"
            :currentSort="currentSort"
            :currentDir="currentDir"
          />
        </th>
      </tr>
    </thead>
    <slot name="body" :sortValues="filteredValues"></slot>
  </table>
</template>

<style lang="scss" scoped>
/* stylelint-disable */
::v-deep td {
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
  padding: 8px 16px;
}
/* stylelint-enable */
</style>
