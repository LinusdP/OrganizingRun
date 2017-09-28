import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TournamentDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tournament-detail',
  templateUrl: 'tournament-detail.html',
})
export class TournamentDetailPage {
  selectedTournament: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // We should be here by navigation with a tournamentId
    this.selectedTournament = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TournamentDetailPage');
  }

}
