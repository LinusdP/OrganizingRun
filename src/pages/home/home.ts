import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CardDataProvider } from '../../providers/card-data';
import { NRCard } from '../../providers/nrcard';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CardDataProvider]
})
export class HomePage {

  syncdata: any;

  constructor(public navCtrl: NavController, public cardService: CardDataProvider) {
    this.cardService.allCards().then((data) => {
      this.syncdata = data;
    });
  }

  syncWithNRDB() {
    this.cardService.syncCardsWithNetrunnerDB();
  }

}
