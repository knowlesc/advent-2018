import { Solver } from './solver';

interface nap {
  start: number;
  end: number;
  guard: string;
}

enum actions {
  wakingUp = 'wakes up',
  startsShift = 'begins shift'
}

type lookup = { [key: string]: number };

export class Day4 extends Solver<nap> {
  inputFile = './inputs/day4.txt';

  formatInput(input: string[]) {
    const sorted = input.map((i) => {
      const groups = /\[(.+)\] (Guard #(\d+) )?(.+)/.exec(i);

      return {
        time: new Date(groups[1]),
        guard: groups[4] ? groups[3] : groups[1],
        action: groups[4] ? groups[4] : groups[2]
      }
    }).sort((a, b) => a.time.getTime() - b.time.getTime());


    let formattedInput: nap[] = [];
    let currentGuard = '';
    sorted.forEach((a) => {
      if (a.action === actions.startsShift) {
        currentGuard = a.guard;
      } else if (a.action === actions.wakingUp) {
        formattedInput[formattedInput.length - 1].end = a.time.getMinutes();
      } else {
        formattedInput.push({ guard: currentGuard, start: a.time.getMinutes(), end: null });
      }
    });

    return formattedInput;
  }

  private getHighestValueKey(obj: lookup) {
    return Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
  }

  solutions = [
    (input: nap[]) => {
      const guardTotals: lookup = {};
      input.forEach((nap) => {
        guardTotals[nap.guard] = (guardTotals[nap.guard] || 0) + (nap.end - nap.start);
      });

      const mostAsleepGuard = this.getHighestValueKey(guardTotals);

      const guardNaps = input.filter((nap) => nap.guard === mostAsleepGuard);

      const frequency: lookup = {};
      guardNaps.forEach((nap) => {
        for (let time = nap.start; time < nap.end; time++) {
          frequency[time] = (frequency[time] || 0) + 1;
        }
      });

      const mostAsleepMinute = this.getHighestValueKey(frequency);

      return Number(mostAsleepMinute) * Number(mostAsleepGuard);
    },

    (input: nap[]) => {
      const guardFrequencies: lookup = {};
      input.forEach((nap) => {
        for (let time = nap.start; time < nap.end; time++) {
          guardFrequencies[`${nap.guard}_${time}`] = (guardFrequencies[`${nap.guard}_${time}`] || 0) + 1;
        }
      });

      const mostAsleepGuardMinute = this.getHighestValueKey(guardFrequencies).split('_');

      return Number(mostAsleepGuardMinute[0]) * Number(mostAsleepGuardMinute[1]);
    }
  ];
}

new Day4().run();