import React from 'react';

import TaskBlock from '../TaskBlock/TaskBlock';
import classes from './CategoryBlock.module.scss';

const CategoryBlock = (props) => {
  return (
    <div className={classes.planer_block}>
      <div className={classes.category_title}>Категория {props.dataItem.categoryId}</div>
        {
          props.dataItem.tasks.map(task => (
            <TaskBlock key={task.taskId} categoryId={props.dataItem.categoryId} task={task} />
          ))
        }
    </div>
  );
};

export default CategoryBlock;