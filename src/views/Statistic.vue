<template>
  <div class="container">
    <Chart
      :key="componentKey"
      v-if="items.length > 0 && labels.length > 0"
      :data="chartData"
      :options="chartOptions"
      :height="height"
    /> 
  </div>
</template>

<script lang="ts">
import Chart from '@/components/Chart.vue'
import { Item } from '@/models/Item'
import { Component, Vue, Watch } from 'vue-property-decorator'
import Socket from 'vue-loading-spinner/src/components/Socket'
import { ChartData } from '@/models/ChartData'
import { ChartOption } from '@/models/ChartOption'

@Component({
  components: {
    Chart,
    Socket
  }
})
export default class Statistic extends Vue {
  private items: Item[]
  private labels: number[]
  private height: number
  private componentKey: number
  private chartData: ChartData
  private chartOptions: ChartOption

  constructor() {
    super()
    this.labels = []
    this.items = []
    this.height = 0
    this.componentKey = 0
  }

  created() {
    this.init();
    this.handleResize();
    window.addEventListener('resize', this.handleResize)
  }

  @Watch('height', { immediate: true })
  onPropertyChanged(value: number, oldValue: number) {
    this.forceRender()
  }

  handleResize() {
    this.height = window.innerHeight - 78
  }

  forceRender() {
    this.componentKey += 1
  }

  init() {
    this.items = JSON.parse(localStorage.getItem('items')) || []
    this.labels = JSON.parse(localStorage.getItem('interval')) || []
    this.chartData =  {
        labels: this.labels,
        datasets: [
          {
            borderColor: 'red',
            label: this.items[0].key,
            backgroundColor: 'red',
            data: this.items[0].valueList
          },
          {
            borderColor: 'orange',
            label: this.items[1].key,
            backgroundColor: 'orange',
            data: this.items[1].valueList
          },
          {
            borderColor: 'blue',
            label: this.items[2].key,
            backgroundColor: 'blue',
            data: this.items[2].valueList
          },
          {
            borderColor: 'green',
            label: this.items[3].key,
            backgroundColor: 'green',
            data: this.items[3].valueList
          },
          {
            borderColor: 'cyan',
            label: this.items[4].key,
            backgroundColor: 'cyan',
            data: this.items[4].valueList
          },
          {
            borderColor: 'brown',
            label: this.items[5].key,
            backgroundColor: 'brown',
            data: this.items[5].valueList
          },
          {
            borderColor: 'magenta',
            label: this.items[6].key,
            backgroundColor: 'magenta',
            data: this.items[6].valueList
          },
          {
            borderColor: 'blueviolet',
            label: this.items[7].key,
            backgroundColor: 'blueviolet',
            data: this.items[7].valueList
          },
          {
            borderColor: 'chartreuse',
            label: this.items[8].key,
            backgroundColor: 'chartreuse',
            data: this.items[8].valueList
          },
          {
            borderColor: 'grey',
            label: this.items[9].key,
            backgroundColor: 'grey',
            data: this.items[9].valueList
          }
        ]
      }
    
    
    this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            fill: false,
            borderWidth: 1
          }
        },
        title: {
          display: true,
          text: 'Random calculate Chart'
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Value'
              }
            }
          ],
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Time (seconds)'
              }
            }
          ]
        }
      }
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped lang="scss">
.container {
  overflow: hidden;
  background: bisque;
  margin: 5px;
}
@media screen and (max-width: 600px) {
 .container {
  //  margin:0 1em;
 }
}
</style>
