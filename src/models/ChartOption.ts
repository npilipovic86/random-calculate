export interface ChartOption {
  responsive: boolean;
  maintainAspectRatio: boolean;
  elements: Elements;
  title: Title;
  tooltips: Tooltips;
  hover: Tooltips;
  scales: Scales;
}

interface Scales {
  yAxes: YXAx[];
  xAxes: YXAx[];
}

interface YXAx {
  display: boolean;
  scaleLabel: ScaleLabel;
  gridLines: GridLines;
}

interface ScaleLabel {
  display: boolean;
  labelString: string;
}

interface Tooltips {
  mode: string;
  intersect: boolean;
}

interface Title {
  display: boolean;
  text: string;
}

interface Elements {
  line: Line;
}

interface Line {
  fill: boolean;
  borderWidth: number;
  tension: number;
}
interface GridLines {
  display: boolean,
  color: string;
  zeroLineColor: string;
}
