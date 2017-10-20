import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';

//import { NRCard } from '../../providers/nrcard';
import 'rxjs/add/operator/map';

import { CardDataProvider } from '../../providers/card-data';
import{ TPlayer } from './tplayer';
import { TimerComponent } from '../../components/timer/timer';

/**
 * Generated class for the TournamentDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tournament-detail',
  templateUrl: 'tournament-detail.html'
})

export class TournamentDetailPage {

  @ViewChild(TimerComponent) timer: TimerComponent;

  selectedTournament: any;
  section: string = "players";
  allCards: any;
  tournamentPlayers: any;
  timerSeconds: number = 3600;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cardService: CardDataProvider) {
    // We should be here by navigation with a tournamentId
    this.selectedTournament = navParams.get('item');
    this.tournamentPlayers = [{id: "2", firstName: 'Roger', lastName: 'Tónlist', nickName: "aglet", runnerID: "01001", corpID: "01067" }];
  }

  ionViewDidLoad() {
    this.loadAllCards();
    console.log('ionViewDidLoad TournamentDetailPage');
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

  addPlayer(): void{
    this.tournamentPlayers.push(new TPlayer);
  }

  deletePlayer(item){
    var index = this.tournamentPlayers.indexOf(item, 0);
    if (index > -1) {
       this.tournamentPlayers.splice(index, 1);
    }
  }

  updateTime(seconds: number) {
    this.timerSeconds = seconds;
  }

}