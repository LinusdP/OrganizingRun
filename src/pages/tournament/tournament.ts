import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NrEventProvider } from '../../providers/nr-event/nr-event';
import { TournamentDetailPage } from '../tournament-detail/tournament-detail';

@Component({
  selector: 'page-tournament',
  templateUrl: 'tournament.html'
})
export class TournamentPage { 
  tournaments: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventProvider: NrEventProvider) {
    this.tournaments = [];
  }

  ionViewDidLoad() {
    console.log("Loading event data...");
    this.eventProvider.allEvents().then((data) => {
      this.tournaments = data;
      console.log(this.tournaments);
    });
  }

  itemTapped(item) {
    this.navCtrl.push(TournamentDetailPage, {
      item: item
    });
  }
}