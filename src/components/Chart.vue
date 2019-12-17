<script >
import { Line } from 'vue-chartjs'
import {Component, Mixins, Vue} from 'vue-property-decorator';

@Component({
    // name: 'Chart',
    extends: Line,
    props: ['data', 'labels'],
})
export default class Chart extends Vue {
  mounted() {
    this.chart()
  }
  chart() {
        this.renderChart({
            labels: this.labels,
            datasets: [
                {
                    borderColor: 'red',
                    label: this.data[0].key,
                    backgroundColor: 'red',
                    data: this.data[0].valueList,
                },
                {
                    borderColor: 'orange',
                    label: this.data[1].key,
                    backgroundColor: 'orange',
                    data: this.data[1].valueList,
                },
                {
                    borderColor: 'blue',
                    label: this.data[2].key,
                    backgroundColor: 'blue',
                    data: this.data[2].valueList,
                },
                {
                    borderColor: 'green',
                    label: this.data[3].key,
                    backgroundColor: 'green',
                    data: this.data[3].valueList,
                },
                {
                    borderColor: 'cyan',
                    label: this.data[4].key,
                    backgroundColor: 'cyan',
                    data: this.data[4].valueList,
                },
                {
                    borderColor: 'brown',
                    label: this.data[5].key,
                    backgroundColor: 'brown',
                    data: this.data[5].valueList,
                },
                {
                    borderColor: 'magenta',
                    label: this.data[6].key,
                    backgroundColor: 'magenta',
                    data: this.data[6].valueList,
                },
                {
                    borderColor: 'blueviolet',
                    label: this.data[7].key,
                    backgroundColor: 'blueviolet',
                    data: this.data[7].valueList,
                },
                {
                    borderColor: 'chartreuse',
                    label: this.data[8].key,
                    backgroundColor: 'chartreuse',
                    data: this.data[8].valueList,
                },
                {
                    borderColor: 'grey',
                    label: this.data[9].key,
                    backgroundColor: 'grey',
                    data: this.data[9].valueList,
                },

            ]
        }, {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                line: {
                    fill: false,
                    borderWidth: 1,
                }
            },
            title: {
                display: true,
                text: 'Random calculate Chart'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }],
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Time (seconds)'
                    }
                }]
            }
        })
    }
}
</script>
