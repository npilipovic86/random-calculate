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
      <tr v-for="(item, index) in items" :key="index" >
        <td>{{ item.key }}</td>
        <td>{{ item.value }}</td>
        <td class="arrow arrow1">
          <div :ref="index" class="arrow1-icon " :class="{ 'arrow1-up': item.operation === '+', 'arrow1-down': item.operation === '-' }">&#129093;</div>
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

export default {
  name: 'Home',
  data() {
    return {
      timer: 0 as number,
      items: [
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
  },
  created() {
    EventBus.$on('reset', () => this.reset());
    console.log('refs', this.$refs)
  },
  mounted() {
    console.log('refs', this.$refs)
    this.init()
    this.timer = setInterval(() => this.updateValue(this.items), 2000)
  },
  methods: {
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
    },
   init(): void {
     const itemsLs: Item[] = JSON.parse(localStorage.getItem('items')) || false
     if (itemsLs) {
       this.items = itemsLs
     }
    },
    toggleActive(index: number): void {
      this.items[index].active ? this.items[index].active = false : this.items[index].active = true
      this.items[index].active ? this.$refs[index][0].style.visibility = 'visible' : this.$refs[index][0].style.visibility = 'hidden'
              console.log('refs',index, this.$refs[index][0].style)
    },
    getRandomInteger(min: number, max: number): number {
      const randomNumber: number = Math.round( Math.random() * (max - min) + min )
      if (randomNumber === 0) {
        return this.getRandomInteger(-2, 2)
      }
      return randomNumber
    },
    updateValue(array: Item[]): void {
       array.map( (item)  => {
        if (item.active) {
          const num: number = this.getRandomInteger(-2, 2)
          item.value += num
          item.operation = Math.sign(num) === 1 ? '+' : '-'
          item.valueList.push(item.value);
          if (item.valueList.length > 1) {
            item.interval.push(item.interval[item.interval.length - 1] + 2)
          }
          return item
        }
       });
       localStorage.setItem('items', JSON.stringify(array))
     }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    EventBus.$off();
  }
}
</script>
<style scoped lang="scss">
  .arrow1 {
      font-size:35px;
      &-icon {
        transition: all 0.75s 0.25s;
      }
      &-down {
        transform: rotate(180deg);
      }
      &-up {
        transform: rotate(0deg);
      }
    &-show {
      visibility: visible;
      opacity: 1;
      transition: opacity .5s linear;
    }
    &-hide {
      visibility: hidden;
      opacity: 0;
      transition: visibility 0s .5s, opacity .5s linear;
    }
  }
  .arrow {
    font-size:35px;
    &-top {
      /*display:none;*/
      span {
        content: "\1F845";
      }
    }
    &-down {
      /*display:none;*/
      span {
        content: "\1F847";
      }
    }
    /*transition: opacity .25s ease-in-out;*/
    /*-moz-transition: opacity .25s ease-in-out;*/
    /*-webkit-transition: opacity .25s ease-in-out;*/
    &-show {
      /*display:block;*/
      visibility: visible;
      opacity: 1;
      transition: opacity .5s linear;
    }
    &-hide {
      /*display:none;*/
      visibility: hidden;
      opacity: 0;
      transition: visibility 0s .5s, opacity .5s linear;
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
  th, td {
    padding: 10px;
  }
  td {
    font-size: 20px;
  }
  table, th, td {
    border: 1px solid;
    border-collapse: collapse;
  }

</style>
