import React from "react";
import Styles from "./fibonacci-animation.module.css"
import { getFibonacciNumbers } from "./fibonacci-func";
import { Circle } from "../ui/circle/circle";

type TProps = {
  maxIndex: number;
  setProgress: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FibonacciAnimation({ maxIndex, setProgress }: TProps) {
  const [array, setArray] = React.useState<string[]>([]);

  React.useEffect(() => {
    getFibonacciNumbers(maxIndex, setArray, setProgress);
  }, [maxIndex]);

  return (
    <div className={Styles.result}>
      {array.map((item, i) => (
        <Circle letter={item} index={i} key={i} />
      ))}
    </div>
  )
}