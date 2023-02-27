import React from "react";
import Styles from './stack-page.module.css';
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { Button } from "../../components/ui/button/button";
import { Stack } from "./Stack";
import { TElement } from "../../types/types";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../../components/ui/circle/circle";
import { setDelay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

const stack = new Stack<string>();

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const [state, setState] = React.useState<TElement<string>[]>([]);

  const enterText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const addElement = async () => {
    stack.push(inputValue);

    const newState = state;
    const newElement = {
      value: stack.peak(),
      state: ElementStates.Changing
    };

    newState.push(newElement);
    setState([...newState]);
    await setDelay(SHORT_DELAY_IN_MS);

    newState[newState.length - 1].state = ElementStates.Default;
    setState([...newState]);
    setInputValue('');
  }

  const deleteElement = async () => {
    stack.pop();

    const newState = state;

    newState[newState.length - 1].state = ElementStates.Changing;
    setState([...newState]);
    await setDelay(SHORT_DELAY_IN_MS);

    newState.pop();
    setState([...newState]);
  }

  const resetStack = () => {
    stack.reset();
    setState([]);
    setInputValue('');
  }

  return (
    <SolutionLayout title="Стек">
      <form className={Styles.form} onReset={resetStack}>
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
          disabled={inputValue === ''}
        />
        <Button
          type="button"
          text="Удалить"
          onClick={deleteElement}
          disabled={!state.length}
        />
        <Button
          type="reset"
          text="Очистить"
          style={{ marginLeft: '68px' }}
          disabled={!state.length}
        />
      </form>
      <div className={Styles.result}>
        {state.map((item, i) => {
          return (
            <Circle
              letter={item.value}
              state={item.state}
              index={i}
              head={state.length - 1 === i ? 'top' : ''}
              key={i}
            />
          )
        })}
      </div>
    </SolutionLayout>
  );
};
