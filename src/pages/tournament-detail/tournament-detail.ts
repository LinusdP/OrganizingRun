import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';

//import { NRCard } from '../../providers/nrcard';
import 'rxjs/add/operator/map';

import { CardDataProvider } from '../../providers/card-data';
import { NrEventProvider } from '../../providers/nr-event/nr-event';
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
  timerSeconds: number = 3600;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventService: NrEventProvider, public cardService: CardDataProvider) {
    // We should be here by navigation with a tournamentId
    this.selectedTournament = navParams.get('item');
  }

  ionViewDidLoad() {
    this.loadAllCards();
    console.log('ionViewDidLoad TournamentDetailPage');
  }

  ngOnDestroy() {
    this.eventService.updateEvent(this.selectedTournament);
  }


  loadAllCards(){
    this.cardService.allCards()
      .then(data => {
        this.allCards = data;
        console.log("Loaded.")
      });
  }

  addPlayer(): void{
    this.selectedTournament.players.push(new TPlayer);
  }

  deletePlayer(item){
    var index = this.selectedTournament.players.indexOf(item, 0);
    if (index > -1) {
      this.selectedTournament.players.splice(index, 1);
    }
  }

  updateTime(seconds: number) {
    this.timerSeconds = seconds;
  }

}