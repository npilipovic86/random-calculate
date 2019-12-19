<template>
  <div class="container">
    <div class="wrap">
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
            <td class="arrow">
              <div class="arrow-icon"
                :style="[ item.active ? { visibility: 'visible' } : { visibility: 'hidden' } ]"
                :class="{'arrow-up': item.operation === '+', 'arrow-down': item.operation === '-' }">
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
    const list: Item[] = JSON.parse(localStorage.getItem('items')) || []
    const interval: number[] = JSON.parse(localStorage.getItem('interval')) || []
    if (list.length > 0 && interval.length > 0) {
      this.items = list
      this.interval = interval
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
        return item
      }
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
.arrow {
  &-icon {
    $size: 25px;
    $lowSize: $size - 5px;
    transition: all .75s .25s;
    margin: auto;
    width: 0; 
    height: 0; 
    border-left: $size solid transparent;
    border-right: $size solid transparent;
    border-bottom: $lowSize solid black;     
    &-down {
       border-top: $lowSize solid black;
    }
  }
  
  &-down {
    transform: rotate(-180deg); 
  //  animation: down 1s infinite linear alternate;
  }
  &-up {
    // transform: rotate(0deg);
    animation: up 1s infinite linear alternate;
  }


  @keyframes up {
    0% {
      transform:  rotate(0deg);
    }
      
    100% {
      transform: translateY(-5px);
    }
  }
  @keyframes down {
    0% {
      transform:  rotate(-180deg);
      // transform: translateY(-5px);
    }
    //  50% {
    //   transform:  rotate(180deg);
    //   // transform:  rotate(180deg);
    // }
      
    100% {
      transform: translateY(5px);
      // transform:  rotate(180deg);
    }
  }
}

.btn {
  $height: 35px;
  $left: $height - 10px;
  cursor: pointer;
  margin: auto;
  box-sizing: border-box;
  width: 0;
  height: $height;
  border-style: solid;
  border-width: $height/2 0 $height/2 $left;
  border-color: transparent transparent transparent #202020;
  cursor: pointer;
  will-change: border-width;
  transition: all .2s ease;
  &.paused {
    border-style: double;
    border-width: 0px 0 0px $left;
  }
  &:hover {
    border-color: transparent transparent transparent #404040;
  }
}
.container {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 2em;
  padding-top:1em;
}

.wrap {
  border-radius: 10px;
  overflow: hidden;
}
thead {
  color: white;
  background: #6c7ae0;
}

th {
  width: 100px;
}
table,
th,
td {
  border-collapse: collapse;
}
th,
td {
  padding: 10px;
}
.table-row {
  height: 80px;
  background: white;
  border-bottom: 1px solid silver;
}

td {
  font-size: 25px;
}

@media screen and (max-width: 500px) {
  .container {
    margin: 0 1em 1em 1em;
  }
  td {
    font-size: 18px;
  }
  .table-row {
    height: 49px;
  }
  .arrow {
    font-size: 25px;
  }
  .btn {
    $height: 25px;
    $left: $height - 10px;
    height: $height;
    border-width: $height/2 0 $height/2 $left;
    &.paused {
      border-width: 0px 0 0px $left;
    }
  }
  .arrow {
    &-icon {
      $size: 18px;
      $lowSize: $size - 5px;
      border-left: $size solid transparent;
      border-right: $size solid transparent;
      border-bottom: $lowSize solid black;     
    }
}
}
</style>
