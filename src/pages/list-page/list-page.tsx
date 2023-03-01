import React from "react";
import Styles from './list-page.module.css';
import { Button } from "../../components/ui/button/button";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";

export const ListPage: React.FC = () => {
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
            text="Добавить в head"
            extraClass={Styles.largeButton}
          />
          <Button
            type="button"
            text="Добавить в tail"
            extraClass={Styles.largeButton}
          />
        </fieldset>
      </form>
      <div className={Styles.result}>

      </div>
    </SolutionLayout>
  );
};
