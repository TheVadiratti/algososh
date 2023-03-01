import { DELAY_IN_MS } from "../../constants/delays";
import { setDelay } from "../../utils/utils";

export const getFibonacciNumbers = async (
  maxIndex: number,
  setArray: React.Dispatch<React.SetStateAction<string[]>>,
  setProgress: (value: React.SetStateAction<boolean>) => void
) => {

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