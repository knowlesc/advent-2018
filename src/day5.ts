import { Solver } from './solver';



export class Day5 extends Solver<string> {
  inputFile = './inputs/day5.txt';

  formatInput(input: string[]) {
    return input;
  }

  private isLower(char: string) {
    return char === char.toLowerCase();
  }

  private  annihilate(c1: string, c2: string) {
    return c2
      && this.isLower(c1) !== this.isLower(c2)
      && c1.toLowerCase() === c2.toLowerCase();
  }

  private react(polymer: string) {
    let poly = polymer.split('')
      .map((unit) => ({ value: unit, prev: null, next: null }));

    poly.forEach((unit, i, arr) => {
      unit.next = arr[i + 1] || null;
      unit.prev = arr[i - 1] || null;
    });

    let unit = poly[0];
    let length = poly.length;
    while (unit && unit.next) {
      if (this.annihilate(unit.value, unit.next.value)) {
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

  solutions = [
    (input: string[]) => {
      return this.react(input[0].trim());
    },

    (input: string[]) => {
      let min = 50000;

      'abcdefghijklmnopqrstuvwxyz'.split('')
        .forEach((char) => {
          const poly = input[0].replace(new RegExp(`[${char}${char.toUpperCase()}]`, 'g'), '');
          const length = this.react(poly);
          min = Math.min(min, length)
        });

      return min;
    }
  ];
}

new Day5().run();