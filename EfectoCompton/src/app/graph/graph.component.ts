import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  csv: string;
  h = 6.62607004 * Math.pow(10, -34);
  c = 3 * Math.pow(10, 8);
  me = 9.10938356 * Math.pow(10, -31);
  dataTable: number[][] = [];
  options: any = {
    pointSize: 3,
    highlightCircleSize: 5,
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
    },
    dateWindow: [-10, 370]
  };
  comptonWaveLength = this.h / (this.me * this.c);
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      const angles: number[] = params['angles']
        .split(',')
        .map((angle: string) => parseFloat(angle));
      if (!angles || !angles.length) {
        return;
      }
      let aux = 'Angulo, \u03BB\'\n';
      const waveLength = parseFloat(params['waveLength']);
      for (const angle of angles) {
        const scatteredWavelength: number =
          waveLength +
          this.comptonWaveLength * (1 - Math.cos(0.0174532925 * angle));
        this.dataTable.push([angle, scatteredWavelength]);
        aux += `${angle}, ${scatteredWavelength}\n`;
      }
      this.options.dateWindow[0] = angles[0] - 10;
      this.options.dateWindow[1] = angles[angles.length - 1] + 10;
      console.log(angles);
      console.log(this.options.dateWindow);
      this.csv = aux;
    });
  }

  ngOnInit() {}
}
