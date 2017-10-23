import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import PouchDB from 'pouchdb';
import {Md5} from 'ts-md5/dist/md5';
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
  private globalPlayers: any;
  private database: any;
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.database = new PouchDB('nr_global_players');
    console.log(this.database);
    let options = {
      live: true,
      retry: true,
      continuous: true
    };  
    this.database.sync('http://ldpholistic.se:5984/nr_global_players', options)
      .on('error', error => {
        console.error(JSON.stringify(error));
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayersPage');

    this.allPlayers().then((data) => {
      this.globalPlayers = data;
      console.log(this.globalPlayers);
    });
  }

  /*Modal for editing user. See bottom of this file for the modal component */
  presentEditModal(item) {
    let editModal = this.modalCtrl.create(EditPlayerModal, { user: item });
    editModal.onDidDismiss(data => {
      console.log(data);
      if(data.save)
      {
        console.log("Updating player...");
      }
    });
    editModal.present();
  }

  getAvatar(email) {
    let link = "https://www.gravatar.com/avatar/";
    return link + Md5.hashStr(email);
  }
  createPlayer(player){
    this.database.post(player).catch((error) => {
      console.log("Error creating player: " + player);
    });
  }
  updatePlayer(player) {
    this.database.put(player).catch((error) => {
      console.log("Error updating player: " + player);
    });
  }

  public allPlayers() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.database.allDocs({
        include_docs: true
      }).then((result) => {
        this.data = [];
        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
        });

        resolve(this.data);

        console.log(this.data);
        console.log("Hit men inte längre.");
        this.database.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        });

      }).catch((error) => {
        console.log(error);
      });
    });
  }

  handleChange(change){

     let changedDoc = null;
     let changedIndex = null;

     this.data.forEach((doc, index) => {

       if(doc._id === change.id){
         changedDoc = doc;
         changedIndex = index;
       }

     });

     //A document was deleted
     if(change.deleted){
       this.data.splice(changedIndex, 1);
     }
     else {
       //A document was updated
       if(changedDoc){
         this.data[changedIndex] = change.doc;
       }
       //A document was added
       else {
         this.data.push(change.doc);
       }
     }
   }
}

@Component({
  template: `
  <ion-header>
  <ion-toolbar>
    <ion-title>
      Edit player
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close" showWhen="core,android,windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content padding>
  <ion-list>
    <ion-item>
      <ion-label color="primary" stacked>First name</ion-label>
      <ion-input [(ngModel)]="user.first_name" type="text" placeholder="First name" [value]="user.first_name" clearInput></ion-input>
    </ion-item>
    <ion-item>
      <ion-label color="primary" stacked>Last name</ion-label>
      <ion-input [(ngModel)]="user.last_name" type="text" placeholder="Last name" [value]="user.last_name" clearInput></ion-input>
    </ion-item>
    <ion-item>
      <ion-label color="primary" stacked>Email</ion-label>
      <ion-input [(ngModel)]="user.email" type="email" placeholder="Email" [value]="user.email"></ion-input>
    </ion-item>
  </ion-list>
    <button ion-button color="primary" (click)="setEdit(true)">Save</button>
    <button ion-button color="danger" outline (click)="setEdit(false)">Cancel</button>
</ion-content>
`
})
export class EditPlayerModal {
  user: any;
  save: boolean = false;
 constructor(public viewCtrl: ViewController, private navParams: NavParams) {
   this.user = this.navParams.get("user");
 }

 setEdit(save) {
  this.save = save;
  this.dismiss();
 }

 dismiss() {
   let data = { 'user': this.user, 'save': this.save };
   this.viewCtrl.dismiss(data);
 }

}