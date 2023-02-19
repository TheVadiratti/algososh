import React from "react"
import { Circle } from "../ui/circle/circle";
import Styles from './string.module.css';
import { TStringObj } from "../../types/types";

import { recursionArray } from "../../utils/utils";

type TProps = {
  data: TStringObj[];
  setProgress: (value: React.SetStateAction<boolean>) => void;
}

export default function StringAnimation({ data, setProgress }: TProps) {
  const [array, setArray] = React.useState<TStringObj[]>([]);

  React.useEffect(() => {
    recursionArray(data, setArray, setProgress);
  }, [data]);

  return (
    <div className={Styles.result}>
      {array.map((item, i) => (
        <Circle letter={item.value} key={i} state={item.state} />
      ))}
    </div>
  )
}