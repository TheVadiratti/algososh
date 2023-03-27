import React from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import Styles from './fibonacci-page.module.css';
import { Input } from "../../components/ui/input/input";
import { Button } from "../../components/ui/button/button";
import FibonacciAnimation from "../../components/fibonacci-animation/fibonacci-animation";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const [inProgress, setProgress] = React.useState<boolean>(false);
  const [maxIndex, setMaxIndex] = React.useState<number>(0);
  const [isShow, setIsShow] = React.useState<boolean>(false);

  const enterText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const toBegin: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setMaxIndex(Number(inputValue));
    setProgress(true);
    setIsShow(true);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={Styles.form} onSubmit={toBegin}>
        <Input
          min={1}
          max={19}
          type='number'
          isLimitText={true}
          style={{width: '377px'}}
          onChange={enterText}
          value={inputValue}
          placeholder="Введите число"
          data-cy="input"
        />
        <Button type="submit" text="Рассчитать" isLoader={inProgress} disabled={inputValue.length === 0} data-cy="button" />
      </form>
      {isShow && (
        <FibonacciAnimation maxIndex={maxIndex} setProgress={setProgress} />
      )}
    </SolutionLayout>
  );
};
