import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CardDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CardDataProvider {

  constructor(public http: Http) {
    console.log('Hello CardDataProvider Provider');
    this.cardResult = [];
  }

  getCardData(){
    console.log("Trying to get the data (card-data.ts)");
    if (this.data) {
      // already loaded data
      console.log("there seems to be data already (card-data.ts line 23)");
      return Promise.resolve(this.data);
    }
    return new Promise(resolve =>{
      this.http.get('https://netrunnerdb.com/api/2.0/public/cards')
        .map(res => res.json())
          .subscribe(data => {
            this.cardResult = data.results;
            resolve(this.data);
            console.log("Here's some new data (card-data.ts line 32)");
          },
          err => {
            console.log("We're doomed!");
          }
      );
    })
  }
}
