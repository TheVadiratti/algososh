import React from "react"
import { Circle } from "../ui/circle/circle";
import Styles from './string.module.css';
import { swap } from "../../utils/utils";
import { TStringObj } from "../../types/types";

type TProps = {
  data: TStringObj[];
  setProgress: (value: React.SetStateAction<boolean>) => void; 
}

export default function StringAnimation({ data, setProgress }: TProps) {
  const [array, setArray] = React.useState<TStringObj[]>(data);

  React.useEffect(() => {

    let start = 0;
    let end = array.length - 1;

    const timer = setInterval(() => {
      if(start < end) {
        setArray((prev) => {
          const curr = [...prev];
          swap(curr, start, end);
          return curr;
        })
        start++;
        end--;
      }
      else {
        
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  }, []);

  return (
    <div className={Styles.result}>
      {array.map((item, i) => (
        <Circle letter={item.value} key={i} />
      ))}
    </div>
  )
}