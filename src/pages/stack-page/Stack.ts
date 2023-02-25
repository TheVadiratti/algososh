interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  get: () => T[];
  peak: () => T;
  reset: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  }

  pop = (): void => {
    this.container.pop();
  }

  get = (): T[] => {
    return this.container;
  }

  peak = (): T => {
    return this.container[this.container.length - 1];
  }

  reset = (): void => {
    this.container = [];
  };
}