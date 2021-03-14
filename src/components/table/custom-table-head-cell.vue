<script>
import { getParamUrl } from '../../utils/location'

export default {
  data() {
    return {
      filter: {},
    }
  },

  props: {
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },

    currentSort: {
      type: String,
      default: '',
    },

    currentDir: {
      type: String,
      default: '',
    },

    filterType: {
      type: String,
      default: '',
      validator: (v) => ['', 'default', 'between'].includes(v),
    },
  },

  computed: {
    showIcon() {
      return this.currentSort === this.name && this.currentDir
    },

    arrowIcon() {
      return this.currentDir === 'asc' ? 'up' : 'down'
    },
  },

  methods: {
    filterInput(value, valueKey) {
      this.filter[valueKey] = value
      this.$emit('onFilter', {
        name: this.name,
        filter: this.filter[valueKey],
        valueKey,
      })
    },

    fillFilters() {
      if (!this.filterType) return

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

      this.$set(
        this.filter,
        this.filterType,
        filtersTemplateMap[this.filterType]()
      )
    },

    _getFiltersFromUrl() {
      if (this.filterType === 'default') {
        const value = getParamUrl(`${this.name}_value`)
        value && this.filterInput(value, 'value')
      }

      if (this.filterType === 'between') {
        const valueFrom = getParamUrl(`${this.name}_valueFrom`)
        const valueTo = getParamUrl(`${this.name}_valueTo`)
        valueFrom && this.filterInput(valueFrom, 'valueFrom')
        valueTo && this.filterInput(valueTo, 'valueTo')
      }
    },
  },

  created() {
    this.fillFilters()
    this._getFiltersFromUrl()
  },
}
</script>

<template>
  <div class="wrap">
    <button @click="$emit('onSort', name)" class="btn">
      {{ text }}
    </button>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      style="enable-background:new 0 0 512 512;"
      xml:space="preserve"
      v-if="showIcon"
      class="icon"
    >
      <path
        v-if="arrowIcon === 'up'"
        d="M374.176,110.386l-104-104.504c-0.006-0.006-0.013-0.011-0.019-0.018c-7.818-7.832-20.522-7.807-28.314,0.002    c-0.006,0.006-0.013,0.011-0.019,0.018l-104,104.504c-7.791,7.829-7.762,20.493,0.068,28.285    c7.829,7.792,20.492,7.762,28.284-0.067L236,68.442V492c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20V68.442l69.824,70.162    c7.792,7.829,20.455,7.859,28.284,0.067C381.939,130.878,381.966,118.214,374.176,110.386z"
      />
      <path
        v-if="arrowIcon === 'down'"
        d="M374.108,373.328c-7.829-7.792-20.492-7.762-28.284,0.067L276,443.557V20c0-11.046-8.954-20-20-20 c-11.046,0-20,8.954-20,20v423.558l-69.824-70.164c-7.792-7.829-20.455-7.859-28.284-0.067c-7.83,7.793-7.859,20.456-0.068,28.285 l104,104.504c0.006,0.007,0.013,0.012,0.019,0.018c7.792,7.809,20.496,7.834,28.314,0.001c0.006-0.007,0.013-0.012,0.019-0.018 l104-104.504C381.966,393.785,381.939,381.121,374.108,373.328z"
      />
    </svg>

    <template v-if="filterType === 'default'">
      <input
        placeholder="Фильтр"
        class="input"
        @input="(e) => filterInput(e.target.value, 'value')"
        :value="filter.value"
        type="text"
      />
    </template>

    <template v-if="filterType === 'between'">
      <input
        style="width: 45%;"
        class="input"
        @input="(e) => filterInput(e.target.value, 'valueFrom')"
        :value="filter.valueFrom"
        type="text"
        placeholder="От"
      />
      <input
        style="width: 45%;"
        class="input"
        @input="(e) => filterInput(e.target.value, 'valueTo')"
        :value="filter.valueTo"
        type="text"
        placeholder="До"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.input {
  display: block;
  margin-top: 5px;
}
.icon {
  width: 20px;
  height: 20px;
  margin-left: 10px;
}
</style>
