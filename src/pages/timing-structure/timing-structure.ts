import { Component } from '@angular/core';

import { CorpTab } from './corp-tab';
import { RunnerTab } from './runner-tab';

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
    this.runtab = CorpTab;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimingStructurePage');
  }
}
