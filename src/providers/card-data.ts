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

  cardResult: any;

  constructor(public http: Http) {
    console.log('Hello CardDataProvider Provider');
  }

  getCardData(){
    console.log("Trying to get the data (card-data.ts)");
    if (this.cardResult) {
      // already loaded data
      console.log("there seems to be data already (card-data.ts line 23)");
      return Promise.resolve(this.cardResult);
    }
    return new Promise(resolve =>{
      this.http.get('https://netrunnerdb.com/api/2.0/public/cards')
        .map(res => res.json())
          .subscribe(data => {
            console.log(data);
            this.cardResult = data.data;
            resolve(this.cardResult);
            console.log("Here's some new data (card-data.ts line 32)");
          },
          err => {
            console.log("We're doomed!");
          }
      );
    })
  }
}
