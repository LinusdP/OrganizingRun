import { Component } from '@angular/core';

import { CorpTab} from './corp-tab';

@Component({
  templateUrl: 'timing-structure.html'
})
export class TimingStructurePage {

  corptab: any;
  runnertab: any;
  runtab: any;

  constructor() {
    this.corptab = CorpTab;
    this.runnertab = CorpTab;
    this.runtab = CorpTab;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimingStructurePage');
  }
}
