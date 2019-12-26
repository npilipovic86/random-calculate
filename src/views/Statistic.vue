<template>
  <div class="statistic-wrapper" :style="[ (theme === 'dark') ? {  background: '#0b1055' } : { background: 'bisque' } ]">
    
    <Chart class="chart"
      :key="componentKey"
      v-if="items.length > 0 && labels.length > 0 && !chartLoad"
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
import { ChartData } from '@/models/ChartData'
import { ChartOption } from '@/models/ChartOption'
import { EventBus } from '@/services/EventBus'


@Component({
  components: {
    Chart
  }
})
export default class Statistic extends Vue {
  private items: Item[]
  private labels: number[]
  private height: number
  private componentKey: number
  private chartData: ChartData
  private chartOptions: ChartOption
  private theme: string
  private chartLoad: boolean

  constructor() {
    super()
    this.labels = []
    this.items = []
    this.height = 0
    this.componentKey = 0
    this.theme = 'dark'
    this.chartLoad = true
  }

  created() {
    this.init()
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }
  mounted() {
    EventBus.$on('toggleTheme', (theme: string) =>  this.theme = theme)
    this.theme = localStorage.getItem('theme') || 'dark'
    setTimeout(() => { this.chartLoad = false }, 1000)
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
    if (this.items.length > 0 && this.labels.length > 0) {
      this.chartData =  {
          labels: this.labels,
          datasets: []
      }

      const colors = ['red', 'purple',  'blue', 'green', 'cyan', 'brown', 'magenta', 'blueviolet', 'grey', 'chartreuse']

      for (let i = 0; i < 10; i++) {
        this.chartData.datasets.push({
            borderColor: colors[i],
            label: this.items[i].key,
            backgroundColor: colors[i],
            data: this.items[i].valueList,
            pointRadius: 0
        })
      }
    }

    this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            fill: false,
            borderWidth: 1,
            tension: 0
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
              },
              gridLines: {
                display: true,
                color: 'rgba(255,99,132,0.2)',
                zeroLineColor: 'rgba(255,99,132,0.5)'
              }
            }
          ],
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Time (seconds)'
              },
              gridLines: {
                display: true,
                color: 'rgba(255,99,132,0.2)',
                zeroLineColor: 'rgba(255,99,132,0.5)'
              }
            }
          ]
        }

    }
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    EventBus.$off('toggleTheme')
  }
}
</script>
