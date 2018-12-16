import * as fs from 'fs';
import { performance } from 'perf_hooks';

type Solution<T> = (input: T) => any;

export abstract class Solver<T> {
  protected abstract inputFile: string;
  protected abstract solutions: Solution<T>[];
  protected abstract formatInput(input: string[]): T;

  run() {
    this.solutions.forEach((solution, i) => {
      this.profileFunction(solution, `part ${i + 1}`);
    });
  }

  private readInputAsArray(filename: string) {
    return fs.readFileSync(filename)
      .toString()
      .split(/\r?\n/)
      .filter((line) => line.length > 0);
  }

  private profileFunction(fn: Solution<T>, name: string) {
    console.log(`\n----------------------`);
    console.log(`Executing ${name}`);
    console.log(`----------------------\n`);

    const now = performance.now();
    const input = this.formatInput(this.readInputAsArray(this.inputFile));
    const output = fn(input);
    const elapsed = performance.now() - now;

    console.log(`Output: ${output}`);
    console.log(`Elapsed time: ${elapsed.toFixed(3)}ms\n`);
  }
}