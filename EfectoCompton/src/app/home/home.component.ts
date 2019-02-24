import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  angles: number[] = [];
  newAngle: number;

  constructor() {}

  ngOnInit() {}

  add() {
    if (this.newAngle === undefined) {
      return;
    }
    this.angles.push(this.newAngle);
    this.newAngle = undefined;
  }

  remove(val: number) {
    this.angles.splice(this.angles.findIndex(angle => angle === val), 1);
  }
}
