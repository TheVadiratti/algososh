import { Node } from "./Node";

interface IList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  insertAt: (element: T, atIndex: number) => void;
  cutAt: (atIndex: number) => void;
  getSize: () => number;
  getElements: () => T[];
}

export class List<T> implements IList<T> {
  head: Node<T> | null;
  size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  append = (element: T) => {
    const node = new Node(element);
    let current;

    if (!this.head) {
      this.head = node;
    }
    else {
      current = this.head;

      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  prepend = (element: T) => {
    const node = new Node(element);

    if (this.head) {
      node.next = this.head;
    }
    this.head = node;
    this.size++;
  }

  insertAt = (element: T, atIndex: number) => {
    if (atIndex < 0 || atIndex > this.size) {
      console.log('Invalid index.');
      return;
    }
    else if (!this.head && atIndex > 0) {
      console.log('List is empty, index cannot be more than 0');
      return;
    }
    else {
      const node = new Node(element);

      if (atIndex === 0) {
        this.prepend(element);
      }
      else {
        let current = this.head;
        let currentIndex = 0;
        let prev = this.head;

        while (currentIndex < atIndex) {
          // в уроке реализованно по другому
          prev = current;
          current = current!.next;
          currentIndex++;
        }

        prev!.next = node;
        node.next = current;
      }
    }
    this.size++;
  }

  cutAt = (atIndex: number) => {
    if (atIndex < 0 || atIndex > this.size) {
      console.log('Invalid index.');
      return;
    }
    else if (!this.head && atIndex > 0) {
      console.log('List is empty, index cannot be more than 0');
      return;
    }
    else {
      let current = this.head;
      let currentIndex = 0;
      let prev = this.head;

      while (currentIndex < atIndex) {
        // в уроке реализованно по другому
        prev = current;
        current = current!.next;
        currentIndex++;
      }
      prev!.next = current!.next;
    }
  }

  getSize = () => this.size;

  getElements = () => {
    let current = this.head;
    const res = [];
    while (current) {
      res.push(current.value);
      current = current.next;
    }
    return res;
  }
}