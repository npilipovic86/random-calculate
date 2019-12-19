<script>
import { Line } from 'vue-chartjs'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Item } from '@/models/Item'

@Component({ extends: Line })
export default class Chart extends Vue {
  @Prop({type: Object, default: null}) data
  @Prop({type: Object, default: null}) options

  mounted() {
    this.renderChart(this.data, this.options)
    this.$nextTick(() => {
       console.log('tick');
       console.log(this.$el.querySelector('.chartjs-render-monitor'))
       if ( this.$el.querySelector('.chartjs-render-monitor') !== null) {
            console.log('stop loader')
       }
    })
  }
}
</script>
