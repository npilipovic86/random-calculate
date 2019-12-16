<template>
  <div class="container">
    <Chart v-if="this.items" :data=items :labels=labels :height='700'  />

  </div>
</template>
<script lang="ts">
import Chart from '@/components/Chart.vue'
import { Item } from '@/models/Item';
import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {
      Chart
    }
})
export default class Statistic extends Vue {
    items: Item[]
    labels: number[]

    constructor() {
      super()
    }

    created() {
      this.init()
    }

    init() {
      this.items = JSON.parse(localStorage.getItem('items'))
      if (this.items) {
        this.labels = this.getBiggestIntervalArray(this.items)
      }
    }
    getBiggestIntervalArray(array: Item[]): number[] {
      let max: number = 0
      let maxArray: number[] = []
      array.forEach((item: Item) => {
        if (item.interval.length > max) {
          max = item.interval.length
          maxArray = item.interval
        } else if (item.interval.length === max) {
          maxArray = item.interval
        }
      })
      return maxArray
    }
}

// export default {
//
//   name: 'Statistic',
//   components: { Chart },
//   data() {
//     return {
//       items: [] as Item[],
//       labels: [] as number[],
//
//     }
//   },
//   created() {
//     this.init()
//   },
//   methods: {
//     init() {
//       this.items = JSON.parse(localStorage.getItem('items'))
//       if (this.items) {
//         this.labels = this.getBiggestIntervalArray(this.items)
//       }
//     },
//     getBiggestIntervalArray(array: Item[]) {
//       let max: number = 0
//       let maxArray: number[] = []
//       array.forEach((item: Item) => {
//         if (item.interval.length > max) {
//           max = item.interval.length
//           maxArray = item.interval
//         } else if (item.interval.length === max) {
//           maxArray = item.interval
//         }
//       })
//       return maxArray
//     }
//   }
// }
</script>
<style scoped lang="scss">
  Chart {
    /*height: 800px;*/
    /*width: 800px;*/
  }
  .container {
    background: bisque;
    margin: 5px;
    /*margin: auto;*/
    /*height: 800px;*/
    /*width: 800px;*/
  }
</style>
