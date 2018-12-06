import * as fs from 'fs';
import { performance } from 'perf_hooks';

type Solution<T> = (input: T[]) => any;

export abstract class Solver<T> {
  protected abstract inputFile: string;
  protected abstract solutions: Solution<T>[];
  protected abstract formatInput(input: string[]): T[];

  run() {
    const input = this.formatInput(this.readInputAsArray(this.inputFile));

    this.solutions.forEach((solution) => {
      this.profileFunction(solution, input);
    });
  }

  private readInputAsArray(filename: string) {
    return fs.readFileSync(filename)
      .toString()
      .split(/\r?\n/)
      .filter((line) => line.length > 0);
  }

  private profileFunction(fn: Solution<T>, input: T[]) {
    console.log(`\n----------------------`);
    console.log(`Executing ${fn.name}`);
    console.log(`----------------------\n`);

    const now = performance.now();
    const output = fn(input);
    const elapsed = performance.now() - now;

    console.log(`Output: ${output}`);
    console.log(`Elapsed time: ${elapsed.toFixed(3)}ms\n`);
  }
}