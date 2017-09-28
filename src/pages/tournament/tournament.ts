import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TournamentDetailPage } from '../tournament-detail/tournament-detail';

@Component({
  selector: 'page-tournament',
  templateUrl: 'tournament.html'
})
export class TournamentPage {
  tournaments: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tournaments = [
      {id:"1", title: "Oktoberfest", date: "2017-10-21", description: "Ölen väntar efter 5 rundor swiss!", type: "casual", image: "assets/img/t_casual.jpg"},
      {id:"2", title: "Lucia on the run", date: "2017-12-13", description: "10 spelare, 4 rundor sviss. Go stämning!", type: "competitive", image: "assets/img/t_competitive.png"},
      {id:"3", title: "Store Championship", date: "2017-12-29", description: "20 spelare, Double elimination + finals", type: "official", image: "assets/img/t_official.jpg"}
    ];
  }

  itemTapped(item) {
    this.navCtrl.push(TournamentDetailPage, {
      item: item
    });
  }
}