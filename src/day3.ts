import { Solver } from './solver';

interface claim {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
}

export class Day3 extends Solver<claim> {
  inputFile = './inputs/day3.txt';

  formatInput(input: string[]) {
    return input.map((i) => {
      const groups = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/.exec(i);

      return <claim>{
        id: parseInt(groups[1]),
        left: parseInt(groups[2]),
        top: parseInt(groups[3]),
        width: parseInt(groups[4]),
        height: parseInt(groups[5])
      }
    });
  }

  private generateFabricArray(input: claim[]) {
    const fabricSize = 1000;
    const fabric: number[][] = [];

    for (let y = 0; y < fabricSize; y++) {
      fabric.push([]);
      for (let x = 0; x < fabricSize; x++) {
        fabric[y].push(0);
      }
    }

    input.forEach((claim) => {
      for (let i = claim.top; i < claim.top + claim.height; i++) {
        for (let j = claim.left; j < claim.left + claim.width; j++) {
          fabric[i][j]++;
        }
      }
    });

    return fabric;
  }

  solutions = [
    (input: claim[]) => {
      return this.generateFabricArray(input)
        .map((row) => row.reduce((sum, i) => sum + (i >= 2 ? 1 : 0)))
        .reduce((sum, i) => sum + i);
    },

    (input: claim[]) => {
      const fabric = this.generateFabricArray(input);

      let answer: number = null;
      input.some((claim) => {
        for (let i = claim.top; i < claim.top + claim.height; i++) {
          for (let j = claim.left; j < claim.left + claim.width; j++) {
            if (fabric[i][j] > 1) {
              return false;
            }
          }
        }

        answer = claim.id;
        return true;
      });

      return answer;
    }
  ];
}

new Day3().run();