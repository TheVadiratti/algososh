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

const list = new List<string>();
list.append('0');
list.append('34');
list.append('8');
list.append('1');

export const ListPage: React.FC = () => {
  const [state, setState] = React.useState<TElement<string>[]>([]);

  const convertQueue = (list: List<string>) => {
    return list.getElements().map(item => {
      return {
        value: item,
        state: ElementStates.Default
      }
    })
  }

  React.useEffect(() => {
    const initialState = convertQueue(list);
    setState([...initialState]);
  }, [])

  return (
    <SolutionLayout title="Связный список">
      <form className={Styles.form}>
        <fieldset className={Styles.fieldset}>
          <Input
            maxLength={4}
            isLimitText={true}
            placeholder="Введите значение"
            extraClass={Styles.input}
          />
          <Button
            type="button"
            text="Добавить в head"
            extraClass={Styles.smallButton}
          />
          <Button
            type="button"
            text="Добавить в tail"
            extraClass={Styles.smallButton}
          />
          <Button
            type="button"
            text="Удалить из head"
            extraClass={Styles.smallButton}
          />
          <Button
            type="button"
            text="Удалить из tail"
            extraClass={Styles.smallButton}
          />
        </fieldset>
        <fieldset className={Styles.fieldset}>
          <Input
            placeholder="Введите индекс"
            extraClass={Styles.input}
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
                head={i === 0 ? 'head' : ''}
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
