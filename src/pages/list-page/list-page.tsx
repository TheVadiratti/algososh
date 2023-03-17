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
import { TProgress } from "../../types/list";

const list = new List<string>();
list.append('0');
list.append('34');
list.append('8');
list.append('1');

export const ListPage: React.FC = () => {
  const [state, setState] = React.useState<TElement<string>[]>([]);
  const [progress, setProgress] = React.useState<TProgress>({ inProgress: false, type: null });
  const [inputValue, setInputValue] = React.useState<string>('');
  const [inputIndex, setInputIndex] = React.useState<string>('');

  const convertList = (list: List<string>) => {
    return list.getElements().map((item, i) => {
      return {
        value: item,
        state: ElementStates.Default,
        head: i === 0 ? 'head' : null,
        tail: null
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
    setProgress({ inProgress: true, type: 'addAtHead' });

    let newState = state;

    // анимация с маленьким кругом, только если в списке есть элементы
    if (state.length) {
      newState[0].head = Circle({ state: ElementStates.Changing, letter: inputValue, isSmall: true });
      setState([...newState]);
      await setDelay(SHORT_DELAY_IN_MS);
    }

    list.prepend(inputValue);
    newState = convertList(list);
    newState[0].state = ElementStates.Modified;
    setState([...newState]);
    await setDelay(SHORT_DELAY_IN_MS);

    newState[0].state = ElementStates.Default;
    setState([...newState]);

    setInputValue('');
    setProgress({ inProgress: false, type: null });
  }

  const addAtTail = async () => {
    setProgress({ inProgress: true, type: 'addAtTail' });

    let newState = state;

    // анимация с маленьким кругом, только если в списке есть элементы
    if (state.length) {
      newState[newState.length - 1].head = Circle({ state: ElementStates.Changing, letter: inputValue, isSmall: true });
      setState([...newState]);
      await setDelay(SHORT_DELAY_IN_MS);
    }

    list.append(inputValue);
    newState = convertList(list);
    newState[newState.length - 1].state = ElementStates.Modified;
    setState([...newState]);
    await setDelay(SHORT_DELAY_IN_MS);

    newState[newState.length - 1].state = ElementStates.Default;
    setState([...newState]);

    setInputValue('');
    setProgress({ inProgress: false, type: null });
  }

  const deleteHead = async () => {
    setProgress({ inProgress: true, type: 'deleteHead' });

    let newState = state;

    newState[0].head = Circle({ state: ElementStates.Changing, letter: newState[0].value, isSmall: true });
    newState[0].value = '';
    setState([...newState]);
    await setDelay(SHORT_DELAY_IN_MS);
    list.cutAt(0);
    newState = convertList(list);
    setState([...newState]);

    setProgress({ inProgress: false, type: null });
  }

  const deleteTail = async () => {
    setProgress({ inProgress: true, type: 'deleteHead' });

    let newState = state;

    newState[newState.length - 1].head = Circle({ state: ElementStates.Changing, letter: newState[newState.length - 1].value, isSmall: true });
    newState[newState.length - 1].value = '';
    setState([...newState]);
    await setDelay(SHORT_DELAY_IN_MS);
    list.cutAt(newState.length - 1);
    newState = convertList(list);
    setState([...newState]);

    setProgress({ inProgress: false, type: null });
  }

  const addAtIndex = async () => {
    setProgress({ inProgress: true, type: 'addAtIndex' });

    const targetIndex = Number(inputIndex);
    let newState = state;

    for(let i = 0; i <= targetIndex; i++) {
      newState[i].state = ElementStates.Changing;
      const tmp = newState[i].head;
      newState[i].head = Circle({ state: ElementStates.Changing, letter: inputValue, isSmall: true });
      setState([...newState]);
      await setDelay(SHORT_DELAY_IN_MS);
      newState[i].head = tmp;
      setState([...newState]);
    }
    list.insertAt(inputValue, targetIndex);
    newState = convertList(list);
    newState[targetIndex].state = ElementStates.Modified;
    setState([...newState]);
    await setDelay(SHORT_DELAY_IN_MS);
    
    newState[targetIndex].state = ElementStates.Default;
    setState([...newState]);

    setInputValue('');
    setInputIndex('');
    setProgress({ inProgress: false, type: null });
  }

  const deleteAtIndex = async () => {
    setProgress({ inProgress: true, type: 'deleteAtIndex' });

    const targetIndex = Number(inputIndex);
    let newState = state;

    for(let i = 0; i <= targetIndex; i++) {
      newState[i].state = ElementStates.Changing;
      setState([...newState]);
      await setDelay(SHORT_DELAY_IN_MS);
    }

    const tmp = newState[targetIndex].value;
    newState[targetIndex].value = '';
    newState[targetIndex].tail = Circle({ state: ElementStates.Changing, letter: tmp, isSmall: true });
    setState([...newState]);
    await setDelay(SHORT_DELAY_IN_MS);

    list.cutAt(targetIndex);
    newState = convertList(list);
    setState([...newState]);

    setInputIndex('');
    setProgress({ inProgress: false, type: null });
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
            isLoader={progress.type === 'addAtHead'}
            disabled={(progress.inProgress && progress.type !== 'addAtHead') || !inputValue.length}
          />
          <Button
            type="button"
            text="Добавить в tail"
            extraClass={Styles.smallButton}
            onClick={addAtTail}
            isLoader={progress.type === 'addAtTail'}
            disabled={(progress.inProgress && progress.type !== 'addAtTail') || !inputValue.length}
          />
          <Button
            type="button"
            text="Удалить из head"
            extraClass={Styles.smallButton}
            onClick={deleteHead}
            isLoader={progress.type === 'deleteHead'}
            disabled={(progress.inProgress && progress.type !== 'deleteHead') || !state.length}
          />
          <Button
            type="button"
            text="Удалить из tail"
            extraClass={Styles.smallButton}
            onClick={deleteTail}
            isLoader={progress.type === 'deleteTail'}
            disabled={(progress.inProgress && progress.type !== 'deleteTail') || !state.length}
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
            onClick={addAtIndex}
            isLoader={progress.type === 'addAtIndex'}
            disabled={progress.inProgress && progress.type !== 'addAtIndex' || !inputIndex.length || !inputValue}
          />
          <Button
            type="button"
            text="Удалить по индексу"
            extraClass={Styles.largeButton}
            onClick={deleteAtIndex}
            isLoader={progress.type === 'deleteAtIndex'}
            disabled={progress.inProgress && progress.type !== 'deleteAtIndex' || !inputIndex.length}
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
                tail={item.tail ? item.tail : (i === state.length - 1 && state.length > 1 ? 'tail' : '')}
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
