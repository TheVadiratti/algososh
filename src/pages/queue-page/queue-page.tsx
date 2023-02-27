import React from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import Styles from './queue-page.module.css';
import { Input } from "../../components/ui/input/input";
import { Button } from "../../components/ui/button/button";
import { Queue } from "./Queue";
import { TElement } from "../../types/types";
import { Circle } from "../../components/ui/circle/circle";
import { ElementStates } from "../../types/element-states";

const queue = new Queue<TElement<string>>(7);

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const [state, setState] = React.useState<(TElement<string> | null)[]>([]);

  React.useEffect(() => {
    setState([...queue.container]);
  }, [])

  const enterText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const addElement = () => {
    queue.enqueue({
      value: inputValue,
      state: ElementStates.Default
    });
    setState([...queue.container]);
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={Styles.form} >
        <Input
          maxLength={4}
          isLimitText={true}
          style={{ width: '377px' }}
          onChange={enterText}
          value={inputValue}
        />
        <Button
          type="button"
          text="Добавить"
          onClick={addElement}
        />
        <Button
          type="button"
          text="Удалить"


        />
        <Button
          type="reset"
          text="Очистить"
          style={{ marginLeft: '68px' }}

        />
      </form>
      <div className={Styles.result}>
        {state.map((item, i) => {
          return (
            <Circle
              letter={item?.value}
              state={item?.state}
              head={queue.head === i ? 'head' : ''}
              tail={queue.tail - 1 === i ? 'tail' : ''}
              index={i}
              key={i}
            />
          )
        })}
      </div>
    </SolutionLayout>
  );
};
