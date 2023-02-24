import { ElementStates } from "./element-states";
import { SortTypes } from "./sort-types";
import { Direction } from "./direction";

export type TStringObj = {
  value: string;
  state: ElementStates;
};

export type TSortObj = {
  value: number;
  state: ElementStates;
}

export type TSortSettings = {
  type: SortTypes;
  direction: Direction;
};