import { ElementStates } from "./element-states";
import { SortTypes } from "./sort-types";
import { Direction } from "./direction";
import React from "react";

export type TElement<T> = {
  value: T;
  state: ElementStates;
  isHead?: boolean;
  isTail?: boolean;
  head?: React.ReactElement | string | null;
  tail?: React.ReactElement | string | null;
};

export type TSortSettings = {
  type: SortTypes;
  direction: Direction;
};