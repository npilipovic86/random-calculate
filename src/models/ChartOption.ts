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
  yAxes: YAx[];
  xAxes: YAx[];
}

interface YAx {
  display: boolean;
  scaleLabel: ScaleLabel;
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
}