import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CardDataProvider } from '../../providers/card-data';
import { NRCard } from '../../providers/nrcard';


/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  syncdata: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cardService: CardDataProvider) {
  }

  ionViewDidLoad() {
    this.cardService.allCards().then((data) => {
      this.syncdata = data;
    });
    console.log('ionViewDidLoad SettingsPage');
  }

  syncWithNRDB() {
    this.cardService.syncCardsWithNetrunnerDB();
  }

}
