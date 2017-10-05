import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CardDataProvider } from '../../providers/card-data';
//import { NRCard } from '../../providers/nrcard';
import 'rxjs/add/operator/map';

import{ Player } from './player';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public cardService: CardDataProvider) {

    //TODO: read data from provider (move to ionViewDidLoad)
    this.tournamentPlayers = [{id: "2", firstName: 'Roger', lastName: 'Tónlist', nickName: "aglet", runnerID: "01001", corpID: "01067" }];
  }

  ionViewDidLoad() {
    this.loadAllCards();
    console.log('ionViewDidLoad PlayersPage');
  }

  loadAllCards(){
    this.cardService.allCards()
      .then(data => {
        this.allCards = data;
        console.log("I have gotten cards (player.ts)")
        console.log(this.allCards);
        console.log(this.cardService.getRunnerIdentities());
      });
  }

  addNewRow(): void{
    this.tournamentPlayers.push(new Player);
  }

  deletePlayer(item){
    var index = this.tournamentPlayers.indexOf(item, 0);
    if (index > -1) {
       this.tournamentPlayers.splice(index, 1);
    }
  }

  runnerSelected(text){
    console.log(text);
  }
}