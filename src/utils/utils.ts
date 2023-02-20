import { TStringObj } from "../types/types";
import { ElementStates } from "../types/element-states";
import { DELAY_IN_MS } from "../constants/delays";

export const swap = (array: any[], firstIndex: number, secondIndex: number) => {
  const tmp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = tmp;
};

const setDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const recursionArray = async (array: TStringObj[], setArray: React.Dispatch<React.SetStateAction<TStringObj[]>>, setProgress: (value: React.SetStateAction<boolean>) => void) => {
  let start = 0;
  let end = array.length - 1;

  while(start <= end) {
    const res = array;

    // 1. окрас в розовый
    res[start].state = ElementStates.Changing;
    res[end].state = ElementStates.Changing;

    setArray([...res]);
    await setDelay(DELAY_IN_MS);

    // 2. перестановка
    swap(res, start, end);
    setArray([...res]);

    // 3. окрас в зеленый
    res[start].state = ElementStates.Modified;
    res[end].state = ElementStates.Modified;
    setArray([...res]);

    start++;
    end--;
  }
  setProgress(false);
}

export const fibonacciArray = async (maxIndex: number, setArray: React.Dispatch<React.SetStateAction<string[]>>, setProgress: (value: React.SetStateAction<boolean>) => void) => {
  const res = [];

  res.push('0');
  setArray([...res]);
  await setDelay(DELAY_IN_MS);

  res.push('1');
  setArray([...res]);
  await setDelay(DELAY_IN_MS);

  for(let i = 0; i <= maxIndex - 2; i++) {
    if(maxIndex === 1) {
      setArray([...res]);
      break;
    }
    res.push(String(Number(res[i]) + Number(res[i + 1])));
    setArray([...res]);
    await setDelay(DELAY_IN_MS);
  }
  setProgress(false);
}