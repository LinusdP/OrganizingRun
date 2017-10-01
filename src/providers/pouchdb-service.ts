import { Injectable, EventEmitter } from '@angular/core';
import PouchDb from 'pouchdb';


@Injectable()
export class PouchDBService {
  private isInstantiated: boolean;
  private database: any;
  private listener: EventEmitter<any> = new EventEmitter();

  public constructor(db) {
    this.database = db;
    if(!this.isInstantiated) {
      this.database = new PouchDb(this.database);
      this.isInstantiated = true;
    }
  }

  public fetchAll() {
    return this.database.allDocs({include_docs: true});
  }

  public get(id: string) {
    return this.database.get(id);
  }

  public put(id: string, document: any) {
    document._id = id;
    return this.get(id).then(result => {
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

  public deleteDocument(id: string, rev: string) {
    this.database.remove(id, rev);
  }

  public sync(remote: string) {
     let remoteDatabase = new PouchDb(remote);
    this.database.sync(remoteDatabase, {
        live: true
    }).on('change', change => {
        this.listener.emit(change);
    }).on('error', error => {
        console.error(JSON.stringify(error));
    });
  }

  public getChangeListener() {
    return this.listener;
  }
}