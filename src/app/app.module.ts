import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TournamentPage } from '../pages/tournament/tournament';
import { TournamentDetailPage } from '../pages/tournament-detail/tournament-detail';
import { TimerComponent } from '../components/timer/timer';
import { TimingStructurePage } from '../pages/timing-structure/timing-structure';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TournamentPage,
    TournamentDetailPage,
    TimerComponent,
    TimingStructurePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TournamentPage,
    TournamentDetailPage,
    TimingStructurePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
