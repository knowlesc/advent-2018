import { Solver } from './solver';

class node {
  metadata: number[] = [];
  children: node[] = [];
}

export class Day8 extends Solver<node> {
  inputFile = './inputs/day8.txt';

  formatInput(input: string[]) {
    const inputAsNumberArray = input[0].split(' ').map((i) => parseInt(i));
    let root = new node();

    const getChildrenLength = (header: number[], numChildren: number, parent?: node) => {
      let length = 0;

      for (let i = 0; i < numChildren; i++) {
        const numChildren = header[0];
        const numMetadata = header[1];
        let currentNode = new node();

        if (numChildren > 0) {
          const remainder = header.slice(2);
          const childrenLength = getChildrenLength(remainder, numChildren, currentNode);
          length += childrenLength;
          header.splice(2, childrenLength);
        }

        length += 2 + numMetadata;
        currentNode.metadata = (header.splice(0, 2 + numMetadata).slice(2));

        if (parent) {
          parent.children.push(currentNode);
        } else {
          root = currentNode;
        }
      }

      return length;
    };

    getChildrenLength(inputAsNumberArray, 1, null);

    return root;
  }

  solutions = [
    (input: node) => {
      const sumMetadata = (n: node) => {
        let sum = n.metadata.reduce((a, b) => a + b);

        if (n.children.length > 0) {
          sum += n.children
            .map((c) => sumMetadata(c))
            .reduce((a, b) => a + b);
        }

        return sum;
      }

      return sumMetadata(input);
    },

    (input: node) => {
      const valueOfNode = (n: node): number => {

        if (!n) {
          return 0;
        } else if (n.children.length === 0) {
          return n.metadata.reduce((a, b) => a + b);
        }

        return n.metadata
          .map((m) => valueOfNode(n.children[m - 1]))
          .reduce((a, b) => a + b);
      }

      return valueOfNode(input);
    }
  ];
}

new Day8().run();