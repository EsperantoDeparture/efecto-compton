import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  data: string;
  h = 6.62607004 * Math.pow(10, -34);
  c = 3 * Math.pow(10, 8);
  me = 9.10938356 * Math.pow(10, -31);
  options: any = {
    pointSize: 3,
    highlightCircleSize: 2.5,
    drawPoints: true,
    strokeWidth: 0.0,
    displayAnnotations: true,
    width: '100%',
    height: 250,
    legend: 'always',
    axes: {
      y: {
        valueFormatter: (v: number) => {
          return `${v.toExponential(4)}m`; // controls formatting in the legend/mouseover
        },
        axisLabelFormatter: (v: number) => {
          return `${v.toExponential(2)}m`; // controls formatting of the y-axis labels
        }
      },
      x: {
        valueFormatter: (v: number) => {
          return `${v}°`; // controls formatting in the legend/mouseover
        },
        axisLabelFormatter: (v: number) => {
          return `${v}°`; // controls formatting of the y-axis labels
        }
      }
    }
  };
  comptonWaveLength = this.h / (this.me * this.c);
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      const angles: number[] = params['angles'].split(',');
      let aux = 'Angulo, \u03BB\'\n';
      const waveLength = parseFloat(params['waveLength']);
      for (const angle of angles) {
        aux += `${angle}, ${waveLength +
          this.comptonWaveLength * (1 - Math.cos(angle))}\n`;
      }
      this.data = aux;
    });
  }

  ngOnInit() {}
}
