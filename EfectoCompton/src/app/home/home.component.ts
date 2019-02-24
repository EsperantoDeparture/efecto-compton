import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
          height: '0px',
          display: 'none'
        })
      ),
      transition('void <=> *', animate(500))
    ])
  ]
})
export class HomeComponent implements OnInit {
  angles: number[] = [];
  newAngle: number;

  constructor(private router: Router) {}

  ngOnInit() {}

  add() {
    if (this.newAngle === undefined) {
      return;
    }
    if (this.angles.indexOf(this.newAngle) !== -1) {
      return;
    }
    this.angles.push(this.newAngle);
    this.angles.sort();
    this.newAngle = undefined;
  }

  remove(val: number) {
    this.angles.splice(this.angles.findIndex(angle => angle === val), 1);
  }

  graph() {
    if (!this.angles.length) {
      return;
    }
    this.router.navigate(['grafica'], {
      queryParams: {
        angles: this.angles.join()
      }
    });
  }
}
