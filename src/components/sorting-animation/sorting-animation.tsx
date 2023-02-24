import React from 'react';
import { Column } from '../ui/column/column';
import Styles from './sorting-animation.module.css';
import { TSortObj, TSortSettings } from '../../types/types';
import { sortBubble, sortSelection } from '../../utils/utils';
import { SortTypes } from '../../types/sort-types';

type TProps = {
  data: TSortObj[];
  settings: TSortSettings;
  inProgress: boolean;
  setProgress: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SortingAnimation ({ data, settings, inProgress, setProgress}: TProps) {
  const [arr, setArr] = React.useState<TSortObj[]>(data);
  React.useEffect(() => {
    setArr(data);
  }, [data]);

  React.useEffect(() => {
    if(inProgress) {
      if(settings.type === SortTypes.Bubble) {
        sortBubble(arr, settings.direction, setArr, setProgress);
      }
      else {
        sortSelection(arr, settings.direction, setArr, setProgress);
      }
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