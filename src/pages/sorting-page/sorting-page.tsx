import React from "react";
import Styles from "./sorting-page.module.css";
import { RadioInput } from "../../components/ui/radio-input/radio-input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { Button } from "../../components/ui/button/button";
import { Direction } from "../../types/direction";
import SortingAnimation from "../../components/sorting-animation/sorting-animation";
import { getRandomArr } from "../../utils/utils";
import { TSortObj, TSortSettings } from "../../types/types";
import { SortTypes } from "../../types/sort-types";
import { ElementStates } from "../../types/element-states";

export const SortingPage: React.FC = () => {
  const [array, setArray] = React.useState<TSortObj[]>([]);
  const [inProgress, setProgress] = React.useState<boolean>(false);
  const [settings, setSettings] = React.useState<TSortSettings>({ type: SortTypes.Selection, direction: Direction.Ascending });

  const createNewArr = () => {
    const newArr = getRandomArr().map(item => {
      return {
        value: item,
        state: ElementStates.Default
      }
    });
    setArray(newArr);
  }

  const checkboxHandler = () => {
    setSettings({
      ...settings,
      type: settings.type === SortTypes.Selection ? SortTypes.Bubble : SortTypes.Selection
    })
  }

  const toBeginAscending = () => {
    setSettings({
      ...settings,
      direction: Direction.Ascending
    })
    setProgress(true);
  }
  

const toBeginDescending = () => {
  setSettings({
    ...settings,
    direction: Direction.Descending
  })
  setProgress(true);
}

return (
  <SolutionLayout title="Сортировка массива">
    <form className={Styles.form}>

      <div className={Styles.typeCnt}>
        <RadioInput
          label="Выбор"
          name="type"
          onChange={checkboxHandler}
          checked={settings.type === SortTypes.Selection ? true : false}
          disabled={inProgress}
        />
        <RadioInput
          label="Пузырёк"
          name="type"
          onChange={checkboxHandler}
          checked={settings.type === SortTypes.Bubble ? true : false}
          disabled={inProgress}
        />
      </div>

      <div className={Styles.directionCnt}>
        <Button
          type="button"
          text="По возрастанию"
          sorting={Direction.Ascending}
          onClick={toBeginAscending}
          isLoader={inProgress && settings.direction === Direction.Ascending}
          disabled={inProgress && settings.direction !== Direction.Ascending}
          style={{width: '205px'}}
        />
        <Button
          type="button"
          text="По убыванию"
          sorting={Direction.Descending}
          onClick={toBeginDescending}
          isLoader={inProgress && settings.direction === Direction.Descending}
          disabled={inProgress && settings.direction !== Direction.Descending}
          style={{width: '186px'}}
        />
      </div>

      <Button text="Новый массив" onClick={createNewArr} disabled={inProgress} />
    </form>

    <SortingAnimation data={array} settings={settings} inProgress={inProgress} setProgress={setProgress} />
  </SolutionLayout>
);
};
