import React from "react"
import { Circle } from "../ui/circle/circle";
import Styles from './string-animation.module.css';
import { TElement } from "../../types/types";
import { getRecursionArray } from "./string-func";

type TProps = {
  data: TElement<string>[];
  setProgress: (value: React.SetStateAction<boolean>) => void;
}

export default function StringAnimation({ data, setProgress }: TProps) {
  const [array, setArray] = React.useState<TElement<string>[]>([]);

  React.useEffect(() => {
    getRecursionArray(data, setArray, setProgress);
  }, [data]);

  return (
    <div className={Styles.result}>
      {array.map((item, i) => (
        <Circle letter={item.value} key={i} state={item.state} />
      ))}
    </div>
  )
}