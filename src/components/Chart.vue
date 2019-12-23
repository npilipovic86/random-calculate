<script>
import { Line } from 'vue-chartjs'
import { Component, Vue, Prop } from 'vue-property-decorator'


@Component({ extends: Line })
export default class Chart extends Vue {
  @Prop({type: Object, default: null}) data
  @Prop({type: Object, default: null}) options

  mounted() {
    this.renderChart(this.data, this.options)
  }
}
</script>
