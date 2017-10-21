import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import PouchDB from 'pouchdb';
import 'rxjs/add/operator/map';

/*
  Generated class for the NrEventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NrEventProvider {
  private isInstantiated: boolean;
  private database: any;
  private listener: EventEmitter<any> = new EventEmitter();
  private data: any;

  public constructor(public http: Http) {
    if(!this.isInstantiated) {
      this.database = new PouchDB('nr_events');
      this.isInstantiated = true;
    }

    let options = {
      live: true,
      retry: true,
      continuous: true
    };  
    this.database.sync('http://ldpholistic.se:5984/nr_events', options)
      .on('change', change => {
        this.listener.emit(change);
    }).on('error', error => {
        console.error(JSON.stringify(error));
    });

  }

  public allEvents() {
    
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
   
        this.database.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        });
   
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  public getEvent(id: string) {
    return this.database.get(id);
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

  public putEvent(id: string, document: any) {
    document._id = id;
    return this.getEvent(id).then(result => {
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

  public deleteEvent(id: string, rev: string) {
    this.database.remove(id, rev);
  }

  public getChangeListener() {
    return this.listener;
  }
}