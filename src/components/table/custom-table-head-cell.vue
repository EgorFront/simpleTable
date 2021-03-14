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
    isSortActive() {
      return this.currentSort === this.name && this.currentDir
    },

    rotateIcon() {
      return this.currentDir === 'desc'
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
    <div
      @click="$emit('onSort', name)"
      :class="{ active: isSortActive }"
      class="top"
    >
      <span class="top__text">
        {{ text }}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        style="enable-background:new 0 0 512 512;"
        xml:space="preserve"
        class="top__icon"
        :class="{ rotate: rotateIcon }"
      >
        <path
          d="M374.176,110.386l-104-104.504c-0.006-0.006-0.013-0.011-0.019-0.018c-7.818-7.832-20.522-7.807-28.314,0.002 c-0.006,0.006-0.013,0.011-0.019,0.018l-104,104.504c-7.791,7.829-7.762,20.493,0.068,28.285    c7.829,7.792,20.492,7.762,28.284-0.067L236,68.442V492c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20V68.442l69.824,70.162    c7.792,7.829,20.455,7.859,28.284,0.067C381.939,130.878,381.966,118.214,374.176,110.386z"
        />
      </svg>
    </div>
    <div class="bottom"></div>

    <template v-if="filterType === 'default'">
      <div class="filter-wrap">
        <input
          placeholder="Фильтр"
          class="input"
          @input="(e) => filterInput(e.target.value, 'value')"
          :value="filter.value"
          type="text"
        />
      </div>
    </template>

    <template v-if="filterType === 'between'">
      <div class="filter-wrap filter-wrap--between">
        <input
          class="input"
          @input="(e) => filterInput(e.target.value, 'valueFrom')"
          :value="filter.valueFrom"
          type="number"
          placeholder="От"
        />
        <input
          class="input"
          @input="(e) => filterInput(e.target.value, 'valueTo')"
          :value="filter.valueTo"
          type="number"
          placeholder="До"
        />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
}

.top {
  display: inline-flex;
  cursor: pointer;

  &:hover {
    .top__icon {
      opacity: 0.3;
    }
  }

  &.active {
    .top__icon {
      opacity: 1;
    }
  }

  &__text {
    color: #2f323c;
    white-space: nowrap;
  }

  &__icon {
    width: 16px;
    height: 16px;
    margin-left: 4px;
    color: #2f323c;
    opacity: 0;
    fill: currentColor;
    transition: transform 0.3s, opacity 0.3s;

    &.rotate {
      transform: rotate(180deg);
    }
  }
}

.filter-wrap {
  display: flex;
  margin-top: 8px;
  .input {
    padding: 8px 4px;
    font-size: 14px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #9c9c9c;
  }

  &--between {
    justify-content: space-between;
    .input {
      width: 100%;
      max-width: calc(50% - 8px);
    }
  }
}
</style>
