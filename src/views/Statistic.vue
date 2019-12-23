<template>
  <div class="statistic-wrapper" :style="[ (theme === 'dark') ? {  background: '#0b1055' } : { background: 'bisque' } ]">
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
import { EventBus } from '@/services/EventBus'

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
  private theme: string

  constructor() {
    super()
    this.labels = []
    this.items = []
    this.height = 0
    this.componentKey = 0
    this.theme = 'dark'
  }

  created() {
    this.init()
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }
  mounted() {
    EventBus.$on('toggleTheme', (theme: string) =>  this.theme = theme)
    this.theme = localStorage.getItem('theme') || 'dark'
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
          datasets: [
            {
              borderColor: 'red',
              label: this.items[0].key,
              backgroundColor: 'red',
              data: this.items[0].valueList,
              pointRadius: 0
            },
            {
              borderColor: 'orange',
              label: this.items[1].key,
              backgroundColor: 'orange',
              data: this.items[1].valueList,
              pointRadius: 0
            },
            {
              borderColor: 'blue',
              label: this.items[2].key,
              backgroundColor: 'blue',
              data: this.items[2].valueList,
              pointRadius: 0
            },
            {
              borderColor: 'green',
              label: this.items[3].key,
              backgroundColor: 'green',
              data: this.items[3].valueList,
              pointRadius: 0
            },
            {
              borderColor: 'cyan',
              label: this.items[4].key,
              backgroundColor: 'cyan',
              data: this.items[4].valueList,
              pointRadius: 0
            },
            {
              borderColor: 'brown',
              label: this.items[5].key,
              backgroundColor: 'brown',
              data: this.items[5].valueList,
              pointRadius: 0
            },
            {
              borderColor: 'magenta',
              label: this.items[6].key,
              backgroundColor: 'magenta',
              data: this.items[6].valueList,
              pointRadius: 0
            },
            {
              borderColor: 'blueviolet',
              label: this.items[7].key,
              backgroundColor: 'blueviolet',
              data: this.items[7].valueList,
              pointRadius: 0
            },
            {
              borderColor: 'chartreuse',
              label: this.items[8].key,
              backgroundColor: 'chartreuse',
              data: this.items[8].valueList,
              pointRadius: 0
            },
            {
              borderColor: 'grey',
              label: this.items[9].key,
              backgroundColor: 'grey',
              data: this.items[9].valueList,
              pointRadius: 0
            }
          ]
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

<style scoped lang="scss">
 @import '@/styles/_statistic.scss';
</style>
