import React from "react";
import Styles from "./list-page.module.css";
import { Button } from "../../components/ui/button/button";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { List } from "./List";
import { TElement } from "../../types/types";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../../components/ui/circle/circle";
import { ArrowIcon } from "../../components/ui/icons/arrow-icon";
import { setDelay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

const list = new List<string>();
list.append('0');
list.append('34');
list.append('8');
list.append('1');

export const ListPage: React.FC = () => {
  const [state, setState] = React.useState<TElement<string>[]>([]);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [inputIndex, setInputIndex] = React.useState<string>('');

  const convertList = (list: List<string>) => {
    return list.getElements().map((item, i) => {
      return {
        value: item,
        state: ElementStates.Default,
        head: i === 0 ? 'head' : null
      }
    })
  }

  React.useEffect(() => {
    const initialState = convertList(list);
    setState([...initialState]);
  }, [])

  const enterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const enterIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputIndex(e.target.value);
  }

  const addAtHead = async () => {
    let newState = state;

    newState[0].head = Circle({state: ElementStates.Changing, letter: inputValue, isSmall: true});
    setState([...newState]);
    await setDelay(SHORT_DELAY_IN_MS);

    list.prepend(inputValue);
    newState = convertList(list);
    newState[0].state = ElementStates.Modified;
    setState([...newState]);
    await setDelay(SHORT_DELAY_IN_MS);

    newState[0].state = ElementStates.Default;
    setState([...newState]);

    setInputValue('');
  }

  const addAtTail = async () => {
    let newState = state;

    newState[newState.length - 1].head = Circle({state: ElementStates.Changing, letter: inputValue, isSmall: true});
    setState([...newState]);
    await setDelay(SHORT_DELAY_IN_MS);

    list.append(inputValue);
    newState = convertList(list);
    newState[newState.length - 1].state = ElementStates.Modified;
    setState([...newState]);
    await setDelay(SHORT_DELAY_IN_MS);

    newState[newState.length - 1].state = ElementStates.Default;
    setState([...newState]);

    setInputValue('');
  }

  const deleteHead = async () => {
    let newState = state;

    newState[0].head = Circle({state: ElementStates.Changing, letter: newState[0].value, isSmall: true});
    newState[0].value = '';
    setState([...newState]);
    await setDelay(SHORT_DELAY_IN_MS);
    list.cutAt(0);
    newState = convertList(list);
    setState([...newState]);
  }

  const deleteTail = async () => {
    let newState = state;

    newState[newState.length - 1].head = Circle({state: ElementStates.Changing, letter: newState[newState.length - 1].value, isSmall: true});
    newState[newState.length - 1].value = '';
    setState([...newState]);
    await setDelay(SHORT_DELAY_IN_MS);
    list.cutAt(newState.length - 1);
    newState = convertList(list);
    setState([...newState]);
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={Styles.form}>
        <fieldset className={Styles.fieldset}>
          <Input
            maxLength={4}
            isLimitText={true}
            placeholder="Введите значение"
            extraClass={Styles.input}
            onChange={enterValue}
            value={inputValue}
          />
          <Button
            type="button"
            text="Добавить в head"
            extraClass={Styles.smallButton}
            onClick={addAtHead}
          />
          <Button
            type="button"
            text="Добавить в tail"
            extraClass={Styles.smallButton}
            onClick={addAtTail}
          />
          <Button
            type="button"
            text="Удалить из head"
            extraClass={Styles.smallButton}
            onClick={deleteHead}
          />
          <Button
            type="button"
            text="Удалить из tail"
            extraClass={Styles.smallButton}
            onClick={deleteTail}
          />
        </fieldset>
        <fieldset className={Styles.fieldset}>
          <Input
            placeholder="Введите индекс"
            extraClass={Styles.input}
            onChange={enterIndex}
            value={inputIndex}
          />
          <Button
            type="button"
            text="Добавить по индексу"
            extraClass={Styles.largeButton}
          />
          <Button
            type="button"
            text="Удалить по индексу"
            extraClass={Styles.largeButton}
          />
        </fieldset>
      </form>
      <ul className={Styles.result}>
        {state.map((item, i) => {
          return (
            <li className={Styles.element} key={i}>
              <Circle
                letter={item.value}
                state={item.state}
                head={item.head}
                tail={i === state.length - 1 ? 'tail' : ''}
                index={i}
              />
              {i !== state.length - 1 && (
                <ArrowIcon />
              )}
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
