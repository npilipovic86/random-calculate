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
          <tr class="table-row" v-for="(item, index) in items" :key="index">
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
import { EventBus } from '@/services/EventBus'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  private timer: number
  private items: Item[]
  private interval: number[]

  constructor() {
    super()
    this.timer = 0
    this.interval = [0]
    this.items = [
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
    ]
  }

  mounted() {
    EventBus.$on('reset', () => this.reset())
    this.init()
    this.timer = setInterval(() => this.updateValue(this.items), 2000)
  }

  reset() {
    this.interval = [0]
    this.items = [
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
    ]
  }

  init(): void {
    const itemsList: Item[] = JSON.parse(localStorage.getItem('items')) || []
    const intervalList: number[] = JSON.parse(localStorage.getItem('interval')) || []
    if (itemsList.length > 0 && intervalList.length > 0) {
      this.items = itemsList
      this.interval = intervalList
    }
  }

  toggleActive(index: number): void {
    this.items[index].active = !this.items[index].active
  }

  getRandomInteger(min: number, max: number): number {
    const randomNumber: number = Math.round(Math.random() * (max - min) + min)
    if (randomNumber === 0) {
      return this.getRandomInteger(-2, 2)
    }
    return randomNumber
  }

  updateValue(array: Item[]): void {
    this.interval.push(this.interval[this.interval.length - 1] + 2)
    array.map((item) => {
      if (item.active) {
        const num: number = this.getRandomInteger(-2, 2)
        item.value += num
        item.operation = Math.sign(num) === 1 ? '+' : '-'
        item.valueList.push(item.value)
      } else {
        item.valueList.push(item.value)
      }
      return item
    });
    localStorage.setItem('items', JSON.stringify(array))
    localStorage.setItem('interval', JSON.stringify(this.interval))
  }

  beforeDestroy() {
    clearInterval(this.timer)
    EventBus.$off()
  }
}
</script>

<style scoped lang="scss">
 @import '@/styles/_home.scss';
</style>
