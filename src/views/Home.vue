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
      <tr v-for="(item, index) in items" :key="index">
        <td>{{ item.key }}</td>
        <td>{{ item.value }}</td>
        <td>{{ item.operation }}</td>
        <td>
          <div class="button" :class="{ paused: item.active }" @click="toggleActive(index)"></div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {Item} from '@/models/Item';

export default {
  name: 'Home',
  data() {
    return {
      timer: 0,
      items: [
        { key: 'a', value: 3, active: false, operation: '' },
        { key: 'b', value: 3, active: true, operation: ''},
        { key: 'c', value: 3, active: true, operation: '' },
        { key: 'd', value: 3, active: true, operation: '' },
        { key: 'e', value: 3, active: true, operation: '' },
        { key: 'f', value: 3, active: true, operation: '' },
        { key: 'g', value: 3, active: true, operation: '' },
        { key: 'h', value: 3, active: true, operation: '' },
        { key: 'i', value: 3, active: true, operation: '' },
        { key: 'j', value: 3, active: true, operation: '' }
      ]
    }
  },
  created() {
    this.init()
    this.timer = setInterval(() => this.updateValue(this.items), 2000)
  },
  // mounted() { },
  methods: {
   init() {
     const lsItems: Item[] = JSON.parse(localStorage.getItem('items')) || null
     if (lsItems) {
       this.items = lsItems
     }
    },
    toggleActive(index: number): void {
      console.log( index)
      this.items[index].active ? this.items[index].active = false : this.items[index].active = true
    },
    getRandomInteger(min: number, max: number): number {
      const randomNum: number = Math.floor(Math.random() * (max - min + 1)) + min
      if (randomNum === 0) {
        return this.getRandomInteger(-2, 2)
      }
      return randomNum
    },
    updateValue(array: Item[]) {
      array.map( (item)  => {
        if (item !== undefined && item.active) {
          const num: number = this.getRandomInteger(-2, 2)
          item.value += num
          item.operation = Math.sign(num) === 1 ? '+' : '-'
          return item
        }
       });
      localStorage.setItem('items', JSON.stringify(array));
     }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>
<style scoped lang="scss">
  .button {
    $height: 35px;
    $left: $height - 10px;
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box;
    width: 0;
    height: $height;
    border-style: solid;
    /* top | right | bottom | left */
    /*border-width: 37px 0 37px 60px;*/
    border-width:  $height/2 0 $height/2 $left;
    border-color: transparent transparent transparent #202020;
    cursor: pointer;
    will-change: border-width;
    transition: all .2s ease;
    &.paused {
      border-style: double;
      /*border-width: 0px 0 0px 60px;*/
      border-width: 0px 0 0px $left;
    }
    &:hover {
      border-color: transparent transparent transparent #404040;
    }
  }
  .container {
    text-align: center;
    display:flex;
  }
  table {
    margin:  auto;
  }
  th, td {
    padding: 15px;
  }
  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
  }
</style>
