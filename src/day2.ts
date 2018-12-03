import { Solver } from './solver';

export class Day2 extends Solver<string> {
  inputFile = './inputs/day2.txt';

  formatInput(input: string[]) {
    return input;
  }

  solutions = [
    function part1(input: string[]) {
      let lettersAppearingTwoTimes = 0;
      let lettersAppearingThreeTimes = 0;

      input.forEach((id) => {
        const sorted = id.split('').sort().join('');

        let currentStreak = sorted[0];
        let prev = sorted[0];
        let hasTwo = false;
        let hasThree = false;

        for (let i = 1; i < sorted.length; i++) {
          if (sorted[i] === prev) {
            currentStreak += prev;
          } else {
            if (!hasTwo && currentStreak.length === 2) {
              hasTwo = true;
              lettersAppearingTwoTimes++;
            } else if (!hasThree && currentStreak.length === 3) {
              hasThree = true;
              lettersAppearingThreeTimes++;
            }

            if (hasTwo && hasThree) {
              break;
            }

            currentStreak = sorted[i];
            prev = sorted[i];
          }
        }
      });

      return lettersAppearingThreeTimes * lettersAppearingTwoTimes;
    },

    function part2(input: string[]) {
      let answer: string = null;

      input.some((id, i) => {
        let candidates = input.slice(i + 1);
        let oneDifference: string[] = [];

        for (let cur = 0; oneDifference.length + candidates.length > 0 && cur < id.length; cur++) {
          const differentAtPosition = (i: string) => i[cur] !== id[cur];
          const sameAtPosition = (i: string) => i[cur] === id[cur];

          oneDifference = oneDifference.filter(sameAtPosition);
          oneDifference = oneDifference.concat(candidates.filter(differentAtPosition));
          candidates = candidates.filter(sameAtPosition);
        }

        if (oneDifference.length === 1) {
          const id1 = id.split('');
          const id2 = oneDifference[0].split('');

          answer = id1.filter((char, i) => char === id2[i]).join('');
        }

        return oneDifference.length === 1;
      });

      return answer;
    }
  ];
}

new Day2().run();