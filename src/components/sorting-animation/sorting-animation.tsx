import React from 'react';
import { Column } from '../ui/column/column';
import Styles from './sorting-animation.module.css';
import { TSortObj, TSortSettings } from '../../types/types';
import { sortBubble } from '../../utils/utils';

type TProps = {
  data: TSortObj[];
  setArray: React.Dispatch<React.SetStateAction<TSortObj[]>>;
  settings: TSortSettings;
  inProgress: boolean;
  setProgress: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SortingAnimation ({ data, setArray, settings, inProgress, setProgress}: TProps) {
  const [arr, setArr] = React.useState<TSortObj[]>(data);
  React.useEffect(() => {
    setArr(data);
  }, [data]);

  React.useEffect(() => {
    if(inProgress) {
      sortBubble(arr, setArr, setProgress);
    }
  }, [inProgress]);

  return (
    <div className={Styles.result}>
      {arr.map((item, i) => {
        return (
          <Column index={item.value} key={i} state={item.state} />
        )
      })}
    </div>
  )
}