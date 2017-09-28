import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild } from '@angular/core';

import { TimerComponent } from '../../components/timer/timer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(TimerComponent) timer: TimerComponent;

  constructor(public navCtrl: NavController) {

  }

}
