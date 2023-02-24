import { TSortObj, TStringObj } from "../types/types";
import { ElementStates } from "../types/element-states";
import { DELAY_IN_MS } from "../constants/delays";
import { Direction } from "../types/direction";

export const swap = (array: any[], firstIndex: number, secondIndex: number) => {
  const tmp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = tmp;
};

const setDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const randomArr = (): number[] => {
  const length = Math.floor(Math.random() * (17 - 3) + 3);
  const arr = [];

  for (let i = 0; i < length; i++) {
    const newNumb = Math.random() * (100 + 1);

    arr.push(Math.floor(newNumb));
  }
  return arr;
}

export const recursionArray = async (array: TStringObj[], setArray: React.Dispatch<React.SetStateAction<TStringObj[]>>, setProgress: (value: React.SetStateAction<boolean>) => void) => {
  let start = 0;
  let end = array.length - 1;

  while (start <= end) {
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

  for (let i = 0; i <= maxIndex - 2; i++) {
    if (maxIndex === 1) {
      setArray([...res]);
      break;
    }
    res.push(String(Number(res[i]) + Number(res[i + 1])));
    setArray([...res]);
    await setDelay(DELAY_IN_MS);
  }
  setProgress(false);
}

export const sortBubble = async (
  array: TSortObj[],
  direction: Direction,
  setArray: React.Dispatch<React.SetStateAction<TSortObj[]>>,
  setProgress: React.Dispatch<React.SetStateAction<boolean>>
) => {
  
  for(let i = array.length - 1; i >= 0; i--) {
    const newArr = array;
    for(let j = 0; j < i; j++) {

      newArr[j].state = ElementStates.Changing;
      newArr[j + 1].state = ElementStates.Changing;
      setArray([...newArr]);
      await setDelay(DELAY_IN_MS);

      if(direction === Direction.Ascending) {
        if(newArr[j].value > newArr[j + 1].value) {
          swap(newArr, j, j + 1);
          setArray([...newArr]);
          await setDelay(DELAY_IN_MS);
        }
      }
      else {
        if(newArr[j].value < newArr[j + 1].value) {
          swap(newArr, j, j + 1);
          setArray([...newArr]);
          await setDelay(DELAY_IN_MS);
        }
      }  

      newArr[j].state = ElementStates.Default;
      newArr[j + 1].state = ElementStates.Default;
      setArray([...newArr]);
    }
    newArr[i].state = ElementStates.Modified;
  }
  setProgress(false);
}

export const sortSelection = async (
  array: TSortObj[],
  direction: Direction,
  setArray: React.Dispatch<React.SetStateAction<TSortObj[]>>,
  setProgress: React.Dispatch<React.SetStateAction<boolean>> 
) => {
  const newArr = array;

  for(let i = 0; i < newArr.length; i++) {
    let mostMaxMin = i;
    newArr[i].state = ElementStates.Changing;
    setArray([...newArr]);

    for(let j = i + 1; j < newArr.length; j++) {
      
      newArr[j].state = ElementStates.Changing;
      setArray([...newArr]);
      await setDelay(DELAY_IN_MS);
      
      if(direction === Direction.Ascending) {
        if(newArr[j].value < newArr[mostMaxMin].value) {
          mostMaxMin = j;
        }
      }
      else {
        if(newArr[j].value > newArr[mostMaxMin].value) {
          mostMaxMin = j;
        }
      }
      newArr[j].state = ElementStates.Default;
      setArray([...newArr]);
    }

    swap(newArr, i, mostMaxMin);
    newArr[mostMaxMin].state = ElementStates.Default;
    newArr[i].state = ElementStates.Modified;
    setArray([...newArr]);
  }
  setProgress(false);
}