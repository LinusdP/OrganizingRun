import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import PouchDB from 'pouchdb';
import 'rxjs/add/operator/map';

/*
  Generated class for the CardDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CardDataProvider {
  private isInstantiated: boolean;
  private database: any;
  private listener: EventEmitter<any> = new EventEmitter();

  cards: any;
  runner_identities: any;
  corp_identities: any;
  netrunnerDBSync: any;

  constructor(public http: Http) {
    console.log('Hello CardDataProvider Provider');
    if(!this.isInstantiated) {
      this.database = new PouchDB('nr_cards');
      this.isInstantiated = true;
    }

    let options = {
      live: true,
      retry: true,
      continuous: true
    };  
    this.database.sync('http://localhost:5984/nr_cards', options)
      .on('change', change => {
        this.listener.emit(change);
    }).on('error', error => {
        console.error(JSON.stringify(error));
    });

  }

  public allCards() {
    
    if (this.cards) {
      return Promise.resolve(this.cards);
    }
   
    return new Promise(resolve => {
      this.database.allDocs({
        include_docs: true
      }).then((result) => {
        this.cards = [];
        let docs = result.rows.map((row) => {
          this.cards.push(row.doc);
        });
   
        resolve(this.cards);

        //Filter out identities and store separately in runner or corp array
        this.runner_identities = this.cards.filter(
          card => card.type_code == "identity" && card.side_code == "runner" && card.pack_code != "draft");
        this.corp_identities = this.cards.filter(
          card => card.type_code == "identity" && card.side_code == "corp" && card.pack_code != "draft");
   
        this.database.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        });
   
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  public getRunnerIdentities(){
    return this.runner_identities;
  }

  public getCorpIdentities(){
    return this.corp_identities;
  }

  public getCard(id: string) {
    return this.database.get(id);
  }

  handleChange(change){
    
     let changedDoc = null;
     let changedIndex = null;
    
     this.cards.forEach((doc, index) => {
    
       if(doc._id === change.id){
         changedDoc = doc;
         changedIndex = index;
       }
    
     });
    
     //A document was deleted
     if(change.deleted){
       this.cards.splice(changedIndex, 1);
     }
     else {
       //A document was updated
       if(changedDoc){
         this.cards[changedIndex] = change.doc;
       }
       //A document was added
       else {
         this.cards.push(change.doc);
       }
     }
   }

  /* Only used if/when syncing with NEtrunnerDB */
  public putCard(id: string, document: any) {
    document._id = id;
    return this.getCard(id).then(result => {
        document._rev = result._rev;
        console.log(document);
        return this.database.put(document);
    }, error => {
        if(error.status == "404") {
            return this.database.put(document);
        }
        else {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    });
  }

  /* Only used if/when syncing with NetrunnerDB */
  public deleteCard(id: string, rev: string) {
    this.database.remove(id, rev);
  }

  public getChangeListener() {
    return this.listener;
  }

  getCardDataFromNetrunnerDB(){
    console.log("Trying to get the data (card-data.ts)");
    if (this.netrunnerDBSync) {
      // already loaded data
      console.log("there seems to be data already (card-data.ts line 23)");
      return Promise.resolve(this.netrunnerDBSync);
    }
    return new Promise(resolve =>{
      this.http.get('https://netrunnerdb.com/api/2.0/public/cards')
        .map(res => res.json())
          .subscribe(data => {
            console.log(data);
            this.netrunnerDBSync = data.data;
            resolve(this.netrunnerDBSync);
            console.log("Here's some new data (card-data.ts line 32)");
          },
          err => {
            console.log("We're doomed!");
          }
      );
    })
  }
}
