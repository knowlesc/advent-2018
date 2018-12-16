import { Solver } from './solver';

type coord = [number, number];

export class Day6 extends Solver<coord[]> {
  inputFile = './inputs/day6.txt';

  formatInput(input: string[]) {
    return input.map((i) => {
      const split = i.split(', ');
      const coord: coord = [parseInt(split[0]), parseInt(split[1])];

      return coord;
    });
  }

  private dist(a: coord, b: coord) {
    const distX = Math.abs(a[0] - b[0]);
    const distY = Math.abs(a[1] - b[1]);

    return distX + distY;
  }

  solutions = [
    (input: coord[]) => {
      const minX = Math.min(...input.map((i) => i[0]));
      const minY = Math.min(...input.map((i) => i[1]));
      const maxX = Math.max(...input.map((i) => i[0]));
      const maxY = Math.max(...input.map((i) => i[1]));
      const counts = input.map(() => 0);

      for (let y = minY - 1; y <= maxY + 1; y++) {
        for (let x = minX - 1; x <= maxX + 1; x++) {
          const p: coord = [x, y];
          let closestPoint = 0;
          let minDist = Infinity;
          let multiple = false;

          input.some((i, index) => {
            const dist = this.dist(p, i);
            if (dist < minDist) {
              multiple = false;
              minDist = dist;
              closestPoint = index;
            } else if (dist === minDist) {
              multiple = true;
            }

            return dist === 0;
          });

          if (multiple) continue;

          counts[closestPoint]++;

          //  Any point closest to a coordinate outside the edge points will be closest to every adjacent
          // coordinate as you approach infinity in that direction, therefore the count will be infinity.
          if (y === minY - 1 || y === maxY + 1 || x === minX - 1 || x === maxX + 1) {
            counts[closestPoint] = Infinity;
          }
        }
      }

      return Math.max(...counts.filter((c) => c < Infinity));
    },

    (input: coord[]) => {
      let minX = Math.min(...input.map((i) => i[0]));
      let minY = Math.min(...input.map((i) => i[1]));
      let maxX = Math.max(...input.map((i) => i[0]));
      let maxY = Math.max(...input.map((i) => i[1]));
      const max = 9999;

      const countPoint = (p: coord) => {
        let sum = 0;
        for (let i = 0; i < input.length; i++) {
          sum += this.dist(p, input[i]);
          if (sum > max) break;
        }

        return sum <= max;
      }

      const countRange = (x1: number, x2: number, y1: number, y2: number) => {
        let count = 0;

        for (let y = y1; y <= y2; y++) {
          for (let x = x1 ; x <= x2; x++) {
            if (countPoint([x, y])) count++;
          }
        }

        return count;
      }

      let count = countRange(minX, maxX, minY, maxY);

      // Check outside the detected boundaries in case the points are grouped around a boundary
      let left = Infinity, right = Infinity, top = Infinity, bottom = Infinity;

      while (left + right + top + bottom > 0) {
        minX--;
        maxX++;
        minY--;
        maxY++;

        if (left > 0) count += left = countRange(minX, minX, minY + 1, maxY - 1);
        if (right > 0) count += right = countRange(maxX, maxX, minY + 1, maxY - 1);
        if (top > 0) count += top = countRange(minX, maxX, minY, minY);
        if (bottom > 0) count += bottom = countRange(minX, maxX, maxY, maxY);
      }

      return count;
    }
  ];
}

new Day6().run();