<template>
  <div class="home-wrapper">
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
            <th>Operation</th>
            <th>Control</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-row" v-for="(item, index) in $store.getters.items" :key="index">
            <td>{{ item.key }}</td>
            <td class="value">{{ item.value }}</td>
            <td>
              <div class="arrow"
                :style="[ item.active ? { visibility: 'visible' } : { visibility: 'hidden' } ]"
                :class="{ 'arrow-up': item.operation === '+', 'arrow-down': item.operation === '-' }">
              </div>
            </td>
            <td>
              <div class="btn" :class="{ paused: item.active }" @click="toggleActive(index)"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Item } from '@/models/Item'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  private timer: number
  private items: Item[]
  private interval: number[]

  constructor() {
    super()
    this.timer = 0
  }

  mounted() {
    this.timer = setInterval(() => this.updateValue(this.$store.getters.items), 2000)
  }

  toggleActive(index: number): void {
    this.$store.dispatch('toggleActive', index)
  }

  getRandomInteger(min: number, max: number, exclude: number): number {
    const randomNumber: number = Math.round(Math.random() * (max - min) + min)
    if (randomNumber === exclude) {
       return this.getRandomInteger(min, max, exclude)
    }
    return randomNumber
  }

  updateValue(array: Item[]): void {
    array.map((item) => {
      if (item.active) {
        const num: number = this.getRandomInteger(-2, 2, 0)
        item.value += num
        item.operation = Math.sign(num) === 1 ? '+' : '-'
        item.valueList.push(item.value)
      } else {
        item.valueList.push(item.value)
      }
      return item
    })
    this.$store.dispatch('updateItems', array)
    this.$store.dispatch('addInterval')
  }

  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>
