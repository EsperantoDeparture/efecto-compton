import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
          width: '0px',
          display: 'none'
        })
      ),
      transition('void <=> *', animate(500))
    ])
  ]
})
export class HeaderComponent implements OnInit {
  constructor(public location: Location, private router: Router) {}

  ngOnInit() {}

  home() {
    this.router.navigate(['/']);
  }
}
