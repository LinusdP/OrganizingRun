import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import{ Player } from '../tournament-detail/player';

/**
 * Generated class for the PlayersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-players',
  templateUrl: 'players.html'
})
export class PlayersPage {

  tournamentPlayers: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayersPage');
  }

}