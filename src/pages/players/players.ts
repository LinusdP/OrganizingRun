import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CardDataProvider } from '../../providers/card-data';

import 'rxjs/add/operator/map';

/**
 * Generated class for the PlayersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-players',
  templateUrl: 'players.html',
})
export class PlayersPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public cardService: CardDataProvider) {
  this.allCards =[];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayersPage');
  }

  loadAllCards(){
    this.cardService.getCardData().then(data => {
      this.allCards = data;
      console.log("I have gotten cards (player.ts)")
      console.log(data);
    });
  }
}
