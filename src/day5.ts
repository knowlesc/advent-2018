import { Solver } from './solver';

const isLower = (char: string) => char === char.toLowerCase();
const annihilate = (c1: string, c2: string) => c2 && isLower(c1) !== isLower(c2) && c1.toLowerCase() === c2.toLowerCase();

export class Day5 extends Solver<string> {
  inputFile = './inputs/day5.txt';

  formatInput(input: string[]) {
    return input;
  }

  solutions = [
    function part1(input: string[]) {
      let poly = input[0].trim().split('')
        .map((unit) => {
          return {
            value: unit,
            prev: null,
            next: null
          }
        });

      poly.forEach((unit, i, arr) => {
        unit.next = arr[i + 1] || null;
        unit.prev = arr[i - 1] || null;
      });

      let unit = poly[0];
      let length = poly.length;
      while (unit && unit.next) {
        if (annihilate(unit.value, unit.next.value)) {
          const before = unit.prev;
          const after = unit.next ? unit.next.next : null;

          if (before) before.next = after;
          if (after) after.prev = before;

          unit = before || after;
          length -= 2;
        } else if (unit.next) {
           unit = unit.next;
        }
      }

      return length;
    }
  ];
}

new Day5().run();