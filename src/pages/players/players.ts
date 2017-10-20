import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.database = new PouchDB('nr_global_players');
    console.log(this.database);
    let options = {
      live: true,
      retry: true,
      continuous: true
    };  
    this.database.sync('http://localhost:5984/nr_global_players', options)
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

  getAvatar(email) {
    let link = "https://www.gravatar.com/avatar/";
    return link + Md5.hashStr(email);
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
