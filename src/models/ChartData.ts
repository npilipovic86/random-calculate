export interface ChartData {
  labels: number[]
  datasets: Dataset[]
}

interface Dataset {
  borderColor: string
  label: string
  backgroundColor: string
  data: number[]
}
