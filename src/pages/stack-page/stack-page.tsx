import React from "react";
import Styles from './stack-page.module.css';
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { Button } from "../../components/ui/button/button";
import StackAnimation from "../../components/stack-animation/stack-animation";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('');

  const enterText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  return (
    <SolutionLayout title="Стек">
      <form className={Styles.form}>
        <Input
          maxLength={4}
          isLimitText={true}
          style={{width: '377px'}}
          onChange={enterText}
          value={inputValue}
        />
        <Button type="button" text="Добавить" />
        <Button type="button" text="Удалить" />
        <Button type="reset" text="Очистить" style={{marginLeft: '68px'}} />
        <StackAnimation />
      </form>
    </SolutionLayout>
  );
};
