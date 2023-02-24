import React from "react";
import Styles from "./sorting-page.module.css";
import { RadioInput } from "../../components/ui/radio-input/radio-input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { Button } from "../../components/ui/button/button";
import { Direction } from "../../types/direction";
import SortingAnimation from "../../components/sorting-animation/sorting-animation";

export const SortingPage: React.FC = () => {
  const [isShow, setIsShow] = React.useState<boolean>(false);
  return (
    <SolutionLayout title="Сортировка массива">
      <form className={Styles.form}>

        <div className={Styles.typeCnt}>
          <RadioInput label="Выбор" style={{ marginRight: '40px' }} />
          <RadioInput label="Пузырёк" />
        </div>

        <div className={Styles.directionCnt}>
          <Button text="По возрастанию" sorting={Direction.Ascending} />
          <Button text="По убыванию" sorting={Direction.Descending} />
        </div>

        <Button text="Новый массив" />
      </form>
      {isShow && (
        <SortingAnimation />
      )}
    </SolutionLayout>
  );
};
