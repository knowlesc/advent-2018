import { Solver } from './solver';

interface nap {
  start: number;
  end: number;
  guard: string;
}

type lookup = { [key: string]: number };
const wakingUp = 'wakes up';
const startsShift = 'begins shift';
const getHighestValueKey = (obj: lookup) => Object.keys(obj)
  .reduce((a, b) => obj[a] > obj[b] ? a : b);

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
      if (a.action === startsShift) {
        currentGuard = a.guard;
      } else if (a.action === wakingUp) {
        formattedInput[formattedInput.length - 1].end = a.time.getMinutes();
      } else {
        formattedInput.push({ guard: currentGuard, start: a.time.getMinutes(), end: null });
      }
    });

    return formattedInput;
  }

  solutions = [
    function part1(input: nap[]) {
      const guardTotals: lookup = {};
      input.forEach((nap) => {
        guardTotals[nap.guard] = (guardTotals[nap.guard] || 0) + (nap.end - nap.start);
      });

      const mostAsleepGuard = getHighestValueKey(guardTotals);

      const guardNaps = input.filter((nap) => nap.guard === mostAsleepGuard);

      const frequency: lookup = {};
      guardNaps.forEach((nap) => {
        for (let time = nap.start; time < nap.end; time++) {
          frequency[time] = (frequency[time] || 0) + 1;
        }
      });

      const mostAsleepMinute = getHighestValueKey(frequency);

      return Number(mostAsleepMinute) * Number(mostAsleepGuard);
    },

    function part2(input: nap[]) {
      const guardFrequencies: lookup = {};
      input.forEach((nap) => {
        for (let time = nap.start; time < nap.end; time++) {
          guardFrequencies[`${nap.guard}_${time}`] = (guardFrequencies[`${nap.guard}_${time}`] || 0) + 1;
        }
      });

      const mostAsleepGuardMinute = getHighestValueKey(guardFrequencies).split('_');

      return Number(mostAsleepGuardMinute[0]) * Number(mostAsleepGuardMinute[1]);
    }
  ];
}

new Day4().run();