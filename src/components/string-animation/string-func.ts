import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TElement } from "../../types/types";
import { setDelay, swap } from "../../utils/utils";

export const getRecursionArray = async (
  array: TElement<string>[],
  setArray: React.Dispatch<React.SetStateAction<TElement<string>[]>>,
  setProgress: (value: React.SetStateAction<boolean>) => void
) => {

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