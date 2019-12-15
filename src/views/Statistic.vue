<template>
  <div class="container">
    <Chart :data=values :labels=labels />
  </div>
</template>
<script lang="ts">
import Chart from '@/components/Chart.vue'
import {Item} from '@/models/Item';

export default {

    name: 'Statistic',
    components: { Chart },
    data() {
      return {
        values: [] as number[],
        labels: [] as string[]
      }
    },
    mounted() {

      // const ctx = this.$refs['myChart']
      // console.log(ctx)

    },
    created() {
      this.init()
    },
    methods: {
      init() {
        const data = JSON.parse(localStorage.getItem('items'))
        this.values = data.map( (item: Item) =>   item.value  )
        this.labels = data.map( (item: Item) =>   item.key  )
        console.log('ite', this.items, this.labels)
      }
    }
  }
</script>
<style scoped lang="scss">
  Chart {
    /*height: 800px;*/
    /*width: 800px;*/
  }
  .container {
    background:white;
    margin:  5px;

    /*margin: auto;*/
    /*height: 800px;*/
    /*width: 800px;*/
  }
</style>
