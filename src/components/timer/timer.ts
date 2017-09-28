import { Component, Input } from '@angular/core';
import { AlertController } from 'ionic-angular';

import {ITimer} from './itimer';

/**
 * Generated class for the TimerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'timer',
  templateUrl: 'timer.html'
})
export class TimerComponent {

    @Input() timeInSeconds: number;
    public timer: ITimer;
    public myDate: String = new Date().toISOString();
 
    constructor(private alertCtrl: AlertController) {
    }
 
    ngOnInit() {
        this.initTimer();
    }
 
    hasFinished() {
        return this.timer.hasFinished;
    }
 
    initTimer() {
        if(!this.timeInSeconds) { this.timeInSeconds = 0; }
 
        this.timer = <ITimer>{
            seconds: this.timeInSeconds,
            runTimer: false,
            hasStarted: false,
            hasFinished: false,
            secondsRemaining: this.timeInSeconds
        };
 
        this.timer.displayHours = this.getSecondsAsDigitalClock(this.timer.secondsRemaining).hours;
        this.timer.displayMinutes = this.getSecondsAsDigitalClock(this.timer.secondsRemaining).minutes;
        this.timer.displaySeconds = this.getSecondsAsDigitalClock(this.timer.secondsRemaining).seconds;
    }
 
    startTimer() {
        this.timer.hasStarted = true;
        this.timer.runTimer = true;
        this.timerTick();
    }
 
    pauseTimer() {
        this.timer.runTimer = false;
    }
 
    resumeTimer() {
        this.startTimer();
    }
 
    timerTick() {
        setTimeout(() => {
            if (!this.timer.runTimer) { return; }
            this.timer.secondsRemaining--;
            this.timer.displayHours = this.getSecondsAsDigitalClock(this.timer.secondsRemaining).hours;
            this.timer.displayMinutes = this.getSecondsAsDigitalClock(this.timer.secondsRemaining).minutes;
            this.timer.displaySeconds = this.getSecondsAsDigitalClock(this.timer.secondsRemaining).seconds;
            if (this.timer.secondsRemaining > 0) {
                this.timerTick();
            }
            else {
                this.timer.hasFinished = true;
            }
        }, 1000);
    }
 
    getSecondsAsDigitalClock(inputSeconds: number) {
        var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        var hoursString = '';
        var minutesString = '';
        var secondsString = '';
        hoursString = (hours < 10) ? "0" + hours : hours.toString();
        minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
        secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
        return {'hours': hoursString, 'minutes': minutesString, 'seconds': secondsString};
    }


    presentPrompt(title) {
        let alert = this.alertCtrl.create({
            title: "Set " + title,
            inputs: [
            {
                name: 'input',
                placeholder: title,
                type: 'number',
                min: 0,
                max: 59
            }
            ],
            buttons: [
            {
                text: 'Cancel',
                role: 'cancel',
                handler: data => {
                    console.log('Cancel clicked');
                }
            },
            {
                text: 'Set',
                handler: data => {
                    let validated_input = data.input;
                    //Quick validation of data
                    if(isNaN(parseInt(validated_input))){
                        validated_input = "00";
                    }
                    else if(parseInt(validated_input) < 10){
                        validated_input = "0" + validated_input;
                    }

                    //Set hours, minutes or seconds
                    if( title == "hours" ){
                        this.timer.displayHours = validated_input;
                    }
                    else if( title == "minutes" ){
                        this.timer.displayMinutes = validated_input;
                    }
                    else if( title == "seconds" ){
                        this.timer.displaySeconds = validated_input;
                    }
                    this.timeInSeconds = parseInt(this.timer.displayHours) * 3600 +
                                         parseInt(this.timer.displayMinutes) * 60 +
                                         parseInt(this.timer.displaySeconds);
                    this.initTimer();
                }
            }
            ]
        });
        alert.present();
    }

}
