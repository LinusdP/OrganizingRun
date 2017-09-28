    export interface ITimer {
      seconds: number;
      secondsRemaining: number;
      runTimer: boolean;
      hasStarted: boolean;
      hasFinished: boolean;
      displayHours: string;
      displayMinutes: string;
      displaySeconds: string;
    }