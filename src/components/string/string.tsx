import React from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import Styles from './string.module.css';

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [isLoader, setLoader] = React.useState(false);

  const enterText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const toBegin = () => {
    setLoader(true);
  }

  return (
    <SolutionLayout title="Строка">
      <div className={Styles.cnt}>
        <Input maxLength={11} type='text' isLimitText={true} extraClass={Styles.input} onChange={enterText} value={inputValue} />
        <Button type="button" text="Развернуть" isLoader={isLoader} onClick={toBegin} />
      </div>
      <div className={Styles.result}>

      </div>
    </SolutionLayout>
  );
};
