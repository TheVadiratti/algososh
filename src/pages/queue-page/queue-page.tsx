import React from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import Styles from './queue-page.module.css';
import { Input } from "../../components/ui/input/input";
import { Button } from "../../components/ui/button/button";
import { Queue } from "./Queue";
import { TElement } from "../../types/types";
import { Circle } from "../../components/ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { setDelay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

const queue = new Queue<string>(7);

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const [state, setState] = React.useState<(TElement<string> | null)[]>([]);

  const convertQueue = (queue: Queue<string>) => {
    return queue.container.map(item => {
      if (item) {
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

  const addElement = async () => {
    queue.enqueue(inputValue);
    setInputValue('');
    
    const newState = convertQueue(queue);
    newState[queue.tail - 1]!.state = ElementStates.Changing;
    setState([...newState]);
    await setDelay(SHORT_DELAY_IN_MS);

    newState[queue.tail - 1]!.state = ElementStates.Default;
    setState([...newState]);
  }

  const deleteElement = async () => {
    let newState = convertQueue(queue);

    newState[queue.head]!.state = ElementStates.Changing;
    setState([...newState]);
    await setDelay(SHORT_DELAY_IN_MS);

    queue.dequeue();
    newState = convertQueue(queue);
    setState([...newState]);
  }

  const resetQueue = () => {
    queue.reset();
    const newState = convertQueue(queue);
    setState([...newState]);
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={Styles.form} onReset={resetQueue}>
        <Input
          maxLength={4}
          isLimitText={true}
          style={{ width: '377px' }}
          onChange={enterText}
          value={inputValue}
          data-cy="input"
        />
        <Button
          type="button"
          text="Добавить"
          onClick={addElement}
          disabled={inputValue === ''}
          data-cy="button-add"
        />
        <Button
          type="button"
          text="Удалить"
          onClick={deleteElement}
          disabled={queue.isEmpty()}
          data-cy="button-delete"
        />
        <Button
          type="reset"
          text="Очистить"
          style={{ marginLeft: '68px' }}
          disabled={queue.tail === 0}
          data-cy="button-reset"
        />
      </form>
      <div className={Styles.result}>
        {state.map((item, i) => {
          return (
            <Circle
              letter={item?.value}
              state={item?.state}
              head={queue.head === i ? 'head' : ''}
              tail={queue.tail - 1 === i && !queue.isEmpty() ? 'tail' : ''}
              index={i}
              key={i}
            />
          )
        })}
      </div>
    </SolutionLayout>
  );
};
