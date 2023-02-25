import { ElementStates } from "./element-states";
import { SortTypes } from "./sort-types";
import { Direction } from "./direction";

export type TElement<T> = {
  value: T;
  state: ElementStates;
};

export type TSortSettings = {
  type: SortTypes;
  direction: Direction;
};