type NodeType<T> = ListNode<T> | null;

interface DebugResult<T> {
  value: T; next: T | null; prev: T | null
}

interface ILinkedList<T> {
  toArray(): T[];
  append(val: T): void;
  debug(): DebugResult<T>[]
}

class ListNode<T> {
  value: T;
  next: NodeType<T>;
  prev: NodeType<T>;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  head: NodeType<T>;
  tail: NodeType<T>;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  static fromArray<T>(values: T[]) {
    const list = new LinkedList<T>();
    for (const val of values) {
      list.append(val);
    }

    return list;
  }

  toArray() {
    const result: T[] = [];
    let current = this.head;

    while (current) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }

  append(value: T) {
    const newNode = new ListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    }
  }

  debug() {
    const result: DebugResult<T>[] = [];
    let current = this.head;

    while (current) {
      result.push({
        value: current.value,
        next: current.next ? current.next.value : null,
        prev: current.prev ? current.prev.value : null,
      });
      current = current.next;
    }

    return result;
  }
}

const list = LinkedList.fromArray([2, 3, 5]);
console.log(list.debug());

