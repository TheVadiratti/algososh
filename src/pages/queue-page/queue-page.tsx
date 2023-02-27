import React from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import Styles from './queue-page.module.css';
import { Input } from "../../components/ui/input/input";
import { Button } from "../../components/ui/button/button";

export const QueuePage: React.FC = () => {
  return (
    <SolutionLayout title="Очередь">
      <form className={Styles.form} >
        <Input
          maxLength={4}
          isLimitText={true}
          style={{ width: '377px' }}
          
        />
        <Button
          type="button"
          text="Добавить"
          
        />
        <Button
          type="button"
          text="Удалить"
          
          
        />
        <Button
          type="reset"
          text="Очистить"
          style={{ marginLeft: '68px' }}
          
        />
      </form>
      <div className={Styles.result}>
        
      </div>
    </SolutionLayout>
  );
};
