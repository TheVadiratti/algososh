import React from "react";
import Styles from "./fibonacci-animation.module.css"
import { fibonacciArray } from "../../utils/utils";
import { Circle } from "../ui/circle/circle";

type TProps = {
  maxIndex: number;
  setProgress: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FibonacciAnimation({ maxIndex, setProgress }: TProps) {
  const [array, setArray] = React.useState<string[]>([]);

  React.useEffect(() => {
    fibonacciArray(maxIndex, setArray, setProgress);
  }, [maxIndex]);

  return (
    <div className={Styles.result}>
      {array.map((item, i) => (
        <Circle letter={item} index={i} key={i} />
      ))}
    </div>
  )
}