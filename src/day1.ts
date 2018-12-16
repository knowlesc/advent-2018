import { Solver } from './solver';

export class Day1 extends Solver<number[]> {
  inputFile = './inputs/day1.txt';

  formatInput(input: string[]) {
    return input.map((i) => parseInt(i));
  }

  solutions = [
    (input: number[]) => {
      return input.reduce((a, b) => a + b);
    },

    (input: number[]) => {
      let output = null;
      let i = 0;
      let total = 0;
      let seen: { [key: number]: boolean } = { 0: true };

      while (1) {
        if (i === input.length) i = 0;
        total += input[i];
        if (seen[total]) {
          output = total;
          break;
        }
        seen[total] = true;
        i++;
      }

      return output;
    }
  ];
}

new Day1().run();