import { TypeKeys } from "./types";

export type Timer = {
    seconds: number;
};

export type TimerParts = TypeKeys<Timer>;

export function createInitialTimeLeft(initialTimeLeftSeconds: number): Timer {
    const initialTimer: Timer = { seconds: 0 };

    const secondsLeft = Math.floor(initialTimeLeftSeconds);
    initialTimer.seconds = secondsLeft >= 0 ? secondsLeft : 0;

    return initialTimer;
}

export function updateTimeLeft(timer: Timer): Timer {
    // Clone timer to avoid mutating the original object and this way React re-renders the component
    const newTimer = { ...timer };

    if (newTimer.seconds > 0) newTimer.seconds--;
    else newTimer.seconds = 0;

    return newTimer;
}

export function didTimerEnd(timer: Timer) {
    return Object.values(timer).every((item) => item <= 0);
}

export default function Timer() {}
