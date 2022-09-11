import React from 'react';

import classes from './TaskBlock.module.scss';
import DayBlock from '../DayBlock';

const TaskBlock = (props) => {

  return (
    <div className={classes.task_block}>
      <div className={classes.task_name}>Задача {props.task.taskId}</div>
        {
          props.task.days.map((item, index) => (
            <DayBlock
              key={index}
              dayIndex={index}
              categoryId={props.categoryId}
              taskId={props.task.taskId}
              id={item.dayId}
            />
          ))
        }
    </div>
  );
};

export default TaskBlock;