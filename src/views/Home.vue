<template>
  <div class="container">
    <table >
      <thead>
      <tr>
        <th>Key</th>
        <th>Value</th>
        <th>Operation</th>
        <th>Control</th>
      </tr>
      </thead>
      <tbody>
      <tr class="tr" v-for="(item, index) in items" :key="index" >
        <td>{{ item.key }}</td>
        <td>{{ item.value }}</td>
        <td class="arrow">
          <div class="arrow-icon" :style="[item.active ? { 'visibility': 'visible' } : { 'visibility': 'hidden' } ]" :class="{ 'arrow-up': item.operation === '+', 'arrow-down': item.operation === '-' }">&#129093;</div>
        </td>
        <td>
          <div class="button" :class="{ paused: item.active }" @click="toggleActive(index)"></div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Item } from '@/models/Item';
import { EventBus } from '@/services/EventBus'
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  private timer: number
  private items: Item[]

  constructor() {
    super()
    this.timer = 0
    this.items = [
      { key: 'a', value: 3, active: false, operation: '', valueList: [3], interval: [0] },
      { key: 'b', value: 3, active: true, operation: '', valueList: [3], interval: [0] },
      { key: 'c', value: 3, active: true, operation: '' , valueList: [3], interval: [0] },
      { key: 'd', value: 3, active: true, operation: '', valueList: [3], interval: [0] },
      { key: 'e', value: 3, active: true, operation: '', valueList: [3], interval: [0] },
      { key: 'f', value: 3, active: true, operation: '' , valueList: [3], interval: [0] },
      { key: 'g', value: 3, active: true, operation: '' , valueList: [3], interval: [0] },
      { key: 'h', value: 3, active: true, operation: '' , valueList: [3], interval: [0] },
      { key: 'i', value: 3, active: true, operation: '' , valueList: [3], interval: [0] },
      { key: 'j', value: 3, active: true, operation: '' , valueList: [3], interval: [0] }
    ]
  }

  mounted() {
    EventBus.$on('reset', () => this.reset());
    this.init()
    this.timer = setInterval(() => this.updateValue(this.items), 2000)
  }
  reset() {
    this.items = [
      { key: 'a', value: 3, active: false, operation: '', valueList: [3], interval: [0] },
      { key: 'b', value: 3, active: true, operation: '', valueList: [3], interval: [0] },
      { key: 'c', value: 3, active: true, operation: '' , valueList: [3], interval: [0] },
      { key: 'd', value: 3, active: true, operation: '', valueList: [3], interval: [0] },
      { key: 'e', value: 3, active: true, operation: '', valueList: [3], interval: [0] },
      { key: 'f', value: 3, active: true, operation: '' , valueList: [3], interval: [0] },
      { key: 'g', value: 3, active: true, operation: '' , valueList: [3], interval: [0] },
      { key: 'h', value: 3, active: true, operation: '' , valueList: [3], interval: [0] },
      { key: 'i', value: 3, active: true, operation: '' , valueList: [3], interval: [0] },
      { key: 'j', value: 3, active: true, operation: '' , valueList: [3], interval: [0] }
    ] as Item[]
  }
  init(): void {
    const list: Item[] = JSON.parse(localStorage.getItem('items')) || false
    if (list) {
      this.items = list
    }
  }
  toggleActive(index: number): void {
    this.items[index].active ? this.items[index].active = false : this.items[index].active = true
  }
  getRandomInteger(min: number, max: number): number {
    const randomNumber: number = Math.round( Math.random() * (max - min) + min )
    if (randomNumber === 0) {
      return this.getRandomInteger(-2, 2)
    }
    return randomNumber
  }
  updateValue(array: Item[]): void {
    array.map( (item)  => {
      if (item.active) {
        const num: number = this.getRandomInteger(-2, 2)
        item.value += num
        item.operation = Math.sign(num) === 1 ? '+' : '-'
        item.valueList.push(item.value)
        if (item.valueList.length > 1) {
          item.interval.push(item.interval[item.interval.length - 1] + 2)
        }
        return item
      }
    })
    localStorage.setItem('items', JSON.stringify(array))
  }
  beforeDestroy() {
    clearInterval(this.timer)
    EventBus.$off()
  }
}
</script>

<style scoped lang="scss">
// animation for arrow
  /*.animated {*/
    /*background-color: green;*/
    /*background-position: left top;*/
    /*padding-top:95px;*/
    /*margin-bottom:60px;*/
    /*-webkit-animation-duration: 10s;animation-duration: 10s;*/
    /*-webkit-animation-fill-mode: both;animation-fill-mode: both;*/
  /*}*/
  /*@-webkit-keyframes fadeOut {*/
    /*0% {opacity: 1;}*/
    /*100% {opacity: 0;}*/
  /*}*/
  /*@keyframes fadeOut {*/
    /*0% {opacity: 1;}*/
    /*100% {opacity: 0;}*/
  /*}*/
  /*.fadeOut {*/
    /*-webkit-animation-name: fadeOut;*/
    /*animation-name: fadeOut;*/
  /*}*/
/*<div id="animated-example" class="animated fadeOut"></div>*/

// fadeIn effect
/*.visible {*/
  /*visibility: visible;*/
  /*opacity: 1;*/
  /*transition: opacity 2s linear;*/
/*}*/

//fadeOut effect
/*.hidden {*/
  /*visibility: hidden;*/
  /*opacity: 0;*/
  /*transition: visibility 0s 2s, opacity 2s linear;*/
/*}*/
  .arrow {
      font-size:35px;
    /*opacity: 0;*/
    /*transition: visibility 0s 2s, opacity 2s linear;*/

    -webkit-transition: opacity 3s ease-in-out;
    -moz-transition: opacity 3s ease-in-out;
    -ms-transition: opacity 3s ease-in-out;
    -o-transition: opacity 3s ease-in-out;
    opacity: 1;

      &-icon {
        transition: all 0.75s 0.25s;
      }
      &-down {
        transform: rotate(-180deg);
      }
      &-up {
        transform: rotate(0deg);
      }
  }
  .button {
    $height: 35px;
    $left: $height - 10px;
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box;
    width: 0;
    height: $height;
    border-style: solid;
    border-width:  $height/2 0 $height/2 $left;
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
    text-align: center;
    display:flex;
    padding-top: 2em;
  }
  table {
    margin: auto auto 10px auto;
  }
  table, th, td {
    border: 1px solid;
    border-collapse: collapse;
  }
  th, td {
    padding: 10px;
  }
  .tr {
    height: 80px;
  }
  td {
    font-size: 20px;
  }
</style>
