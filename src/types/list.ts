export type TProgress = {
  inProgress: boolean;
  type: 'addAtHead' | 'addAtTail' | 'deleteHead' | 'deleteTail' | null;
};