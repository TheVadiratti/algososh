interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  reset: () => void;
  isEmpty: () => boolean;
}

export class Queue<T> implements IQueue<T> {
  container: (T | null)[] = [];
  head: number = 0;
  tail: number = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T): void => {
    if (this.length < this.size) {
      this.container[this.tail] = item;
      this.tail++;
      this.length++;
    }
    else {
      console.log('Maximum length exceeded');
    }
  }

  dequeue = (): void => {
    if (this.container.length) {
      this.container[this.head] = null;
      this.head++;
      this.length--;
    }
    else {
      console.log('Queue is empty');
    }
  }

  reset = (): void => {
    this.container = Array(this.size);
    this.head = 0;
    this.tail = 0;
  };

  isEmpty = (): boolean => {
    return this.length === 0;
  }
}