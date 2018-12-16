import { Solver } from './solver';

interface step {
  before: string[];
  after: string[];
  executing?: boolean;
}

interface steps {
  [key: string]: step;
}

interface worker {
  available: number;
  executing: string;
}

export class Day7 extends Solver<steps> {
  inputFile = './inputs/day7.txt';

  formatInput(input: string[]) {
    const steps: steps = {};

    input.forEach((i) => {
      const groups = /(\w) must be finished before step (\w)/.exec(i);
      const step = groups[1];
      const before = groups[2];

      if (!steps[step]) {
        steps[step] = { before: [], after: [] };
      }

      if (!steps[before]) {
        steps[before] = { before: [], after: [] };
      }

      steps[step].before.push(before);
      steps[before].after.push(step);
    });

    return steps;
  }

  private availableSteps(steps: steps) {
    return Object.keys(steps)
      .filter((s) => !steps[s].after.length && !steps[s].executing)
      .sort();
  }

  private removeStep(steps: steps, remove: string) {
    steps[remove].before
      .forEach((s) =>
        steps[s].after = steps[s].after
          .filter((s) => s !== remove));

    steps[remove].after
      .forEach((s) =>
        steps[s].before = steps[s].before
          .filter((s) => s !== remove));

    delete steps[remove];
  }

  solutions = [
    (input: steps) => {
      let order = '';
      let available = this.availableSteps(input);

      while (available.length > 0) {
        this.removeStep(input, available[0]);
        order += available[0];
        available = Object.keys(input)
          .filter((s) => !input[s].after.length)
          .sort();
      }

      return order;
    },

    (input: steps) => {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const workers: worker[] = [
        { available: 0, executing: null },
        { available: 0, executing: null },
        { available: 0, executing: null },
        { available: 0, executing: null },
        { available: 0, executing: null }
      ];

      let currentTime = 0;

      const start = (step: string, worker: worker) => {
        worker.available = currentTime + 60 + alphabet.indexOf(step) + 1;
        worker.executing = step;
        input[step].executing = true;
      }

      const finish = (worker: worker) => {
        this.removeStep(input, worker.executing);
        worker.executing = null;
      }

      while (Object.keys(input).length > 0) {
        const nextAvailableStep = this.availableSteps(input)[0];
        const nextAvailableWorker = workers.filter((w) => w.available <= currentTime)[0];

        if (nextAvailableStep && nextAvailableWorker) {
          start(nextAvailableStep, nextAvailableWorker);
        } else {
          currentTime = workers
            .map((w) => w.available)
            .filter((t) => t > currentTime)
            .sort((a, b) => a - b)[0];

          workers
            .filter((w) => w.available === currentTime && w.executing)
            .forEach((w) => finish(w))
        }
      }

      return currentTime;
    }
  ];
}

new Day7().run();