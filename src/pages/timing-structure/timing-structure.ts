import { Component } from '@angular/core';

import { CorpTab } from './corp-tab';
import { RunnerTab } from './runner-tab';
import { RunTab } from './run-tab';

@Component({
  templateUrl: 'timing-structure.html'
})
export class TimingStructurePage {

  corptab: any;
  runnertab: any;
  runtab: any;

  constructor() {
    this.corptab = CorpTab;
    this.runnertab = RunnerTab;
    this.runtab = RunTab;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimingStructurePage');
  }
}
