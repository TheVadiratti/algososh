import React from "react";
import { Input } from "../../components/ui/input/input";
import { Button } from "../../components/ui/button/button";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import Styles from './string.module.css';
import StringAnimation from "../../components/string-animation/string-animation";
import { ElementStates } from "../../types/element-states";
import { TStringObj } from "../../types/types";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const [inProgress, setProgress] = React.useState<boolean>(false);
  const [data, setData] = React.useState<TStringObj[]>([]);
  const [isShow, setIsShow] = React.useState<boolean>(false);

  const enterText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const toBegin: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // подготовка массива с буквами
    const forRender = Array.from(inputValue).map(item => {
      return {
        value: item,
        state: ElementStates.Default
      }
    });
    setData(forRender);

    setProgress(true);
    setIsShow(true);
  }

  return (
    <SolutionLayout title="Строка">
      <form className={Styles.form} onSubmit={toBegin}>
        <Input
          maxLength={11}
          type='text'
          isLimitText={true}
          style={{width: '377px'}}
          onChange={enterText}
          value={inputValue}
        />
        <Button type="submit" text="Развернуть" isLoader={inProgress} />
      </form>
      {isShow && (
        <StringAnimation data={data} setProgress={setProgress} />
      )}
    </SolutionLayout>
  );
};
