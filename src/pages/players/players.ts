import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CardDataProvider } from '../../providers/card-data';
//import { NRCard } from '../../providers/nrcard';

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
  providers: [CardDataProvider]
})
export class PlayersPage {

  allCards: any;
  tournamentPlayers: any;
  toggleNew: boolean;
  newRow: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cardService: CardDataProvider) {

    this.tournamentPlayers = [{ firstName: 'Roger', lastName: 'Tónlist' }];
    this.toggleNew = false;
    this.newRow = [{ firstName: 'First Name', lastName: 'Last Name' }];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayersPage');
  }

  loadAllCards(){
    this.cardService.getCardData()
      .then(data => {
        this.allCards = data;
        console.log("I have gotten cards (player.ts)")
        console.log(this.allCards);
      });
  }

  addNewRow(): void{
    this.tournamentPlayers.push(this.newRow);
    this.toggleNew = false;
  }
}
