<script >
import { Bar, Line } from 'vue-chartjs'
// import {Component, Mixins} from 'vue-property-decorator';

// @Component({
//     name: 'Chart',
//     extends: Bar,
//     props: ['data', 'labels'],
// })
// export default class Chart extends Mixins(Bar) {
//       mounted() {
//           console.log(this.items,this.labels)
//     // Overwriting base render method with actual data.
//         this.renderChart({
//             labels: this.labels,
//             datasets: [{
//                 label: 'Calculate chart',
//                 backgroundColor: '#f87979',
//                 data: this.data
//             }]
//         }, {responsive: true, maintainAspectRatio: false})
//      }
//
// }
export default {
    extends: Bar,
    props: ['data', 'labels'],
    mounted() {
        this.renderChart({
            labels: this.labels,
            datasets: [{
                label: 'Random calculate chart',
                backgroundColor: '#f87979',
                data: this.data
            }]
        }, {responsive: true, maintainAspectRatio: false})
    }
}
</script>
<style>

</style>
