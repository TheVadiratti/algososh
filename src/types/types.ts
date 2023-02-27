import { ElementStates } from "./element-states";
import { SortTypes } from "./sort-types";
import { Direction } from "./direction";

export type TElement<T> = {
  value: T;
  state: ElementStates;
  isHead?: boolean;
  isTail?: boolean;
};

export type TSortSettings = {
  type: SortTypes;
  direction: Direction;
};