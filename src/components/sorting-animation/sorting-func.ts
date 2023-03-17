import { TElement } from "../../types/types";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { setDelay, swap } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";

export const sortBubble = async (
  array: TElement<number>[],
  direction: Direction,
  setArray: React.Dispatch<React.SetStateAction<TElement<number>[]>>,
  setProgress: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const res = array.map(item => {
    return {
      ...item,
      state: ElementStates.Default
    }
  });
  
  for(let i = array.length - 1; i >= 0; i--) {

    for(let j = 0; j < i; j++) {

      res[j].state = ElementStates.Changing;
      res[j + 1].state = ElementStates.Changing;
      setArray([...res]);
      await setDelay(DELAY_IN_MS);

      if(direction === Direction.Ascending) {
        if(res[j].value > res[j + 1].value) {
          swap(res, j, j + 1);
          setArray([...res]);
          await setDelay(DELAY_IN_MS);
        }
      }
      else {
        if(res[j].value < res[j + 1].value) {
          swap(res, j, j + 1);
          setArray([...res]);
          await setDelay(DELAY_IN_MS);
        }
      }  

      res[j].state = ElementStates.Default;
      res[j + 1].state = ElementStates.Default;
      setArray([...res]);
    }
    res[i].state = ElementStates.Modified;
  }
  setProgress(false);
}

export const sortSelection = async (
  array: TElement<number>[],
  direction: Direction,
  setArray: React.Dispatch<React.SetStateAction<TElement<number>[]>>,
  setProgress: React.Dispatch<React.SetStateAction<boolean>> 
) => {
  const res = array.map(item => {
    return {
      ...item,
      state: ElementStates.Default
    }
  });

  for(let i = 0; i < res.length; i++) {
    let mostMaxMin = i;
    res[i].state = ElementStates.Changing;
    setArray([...res]);

    for(let j = i + 1; j < res.length; j++) {
      
      res[j].state = ElementStates.Changing;
      setArray([...res]);
      await setDelay(DELAY_IN_MS);
      
      if(direction === Direction.Ascending) {
        if(res[j].value < res[mostMaxMin].value) {
          mostMaxMin = j;
        }
      }
      // если в порядке убывания
      else {
        if(res[j].value > res[mostMaxMin].value) {
          mostMaxMin = j;
        }
      }
      res[j].state = ElementStates.Default;
      setArray([...res]);
    }

    swap(res, i, mostMaxMin);
    res[mostMaxMin].state = ElementStates.Default;
    res[i].state = ElementStates.Modified;
    setArray([...res]);
  }
  setProgress(false);
}