import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TournamentPage } from '../pages/tournament/tournament';
import { PlayersPage } from '../pages/players/players';
import { EditPlayerModal } from '../pages/players/players';
import { TournamentDetailPage } from '../pages/tournament-detail/tournament-detail';
import { TimerComponent } from '../components/timer/timer';
import { TimingStructurePage } from '../pages/timing-structure/timing-structure';
import { CorpTab } from '../pages/timing-structure/corp-tab';
import { RunnerTab } from '../pages/timing-structure/runner-tab';
import { RunTab } from '../pages/timing-structure/run-tab';
import { SettingsPage } from '../pages/settings/settings';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CardDataProvider } from '../providers/card-data';
import { NrEventProvider } from '../providers/nr-event/nr-event';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TournamentPage,
    PlayersPage,
    TournamentDetailPage,
    TimerComponent,
    TimingStructurePage,
    CorpTab,
    RunnerTab,
    RunTab,
    SettingsPage,
    EditPlayerModal
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TournamentPage,
    PlayersPage,
    TournamentDetailPage,
    TimingStructurePage,
    CorpTab,
    RunnerTab,
    RunTab,
    SettingsPage,
    EditPlayerModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CardDataProvider,
    NrEventProvider
  ]
})
export class AppModule {}
