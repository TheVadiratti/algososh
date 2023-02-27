import React from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import Styles from './queue-page.module.css';
import { Input } from "../../components/ui/input/input";
import { Button } from "../../components/ui/button/button";
import { Queue } from "./Queue";
import { TElement } from "../../types/types";
import { Circle } from "../../components/ui/circle/circle";
import { ElementStates } from "../../types/element-states";

const queue = new Queue<string>(7);

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const [state, setState] = React.useState<(TElement<string> | null)[]>([]);

  const convertQueue = (queue: Queue<string>) => {
    return queue.container.map(item => {
      if(item) {
        return {
          value: item,
          state: ElementStates.Default
        }
      }
      else {
        return null;
      }
    })
  }

  React.useEffect(() => {
    const initialState = convertQueue(queue);
    setState([...initialState]);
  }, [])

  const enterText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const addElement = () => {
    queue.enqueue(inputValue);
    const newState = convertQueue(queue);
    setState([...newState]);
  }

  const deleteElement = () => {
    queue.dequeue();
    const newState = convertQueue(queue);
    setState([...newState]);
  }

  const resetQueue = () => {
    queue.reset();
    const newState = convertQueue(queue);
    setState([...newState]);
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
          onClick={deleteElement}
        />
        <Button
          type="reset"
          text="Очистить"
          style={{ marginLeft: '68px' }}
          onClick={resetQueue}
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
