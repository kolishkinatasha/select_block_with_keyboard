import React from 'react';
import { observer } from 'mobx-react';
import clsx from 'clsx';

import selectedDayStore from '../../stores/selectedDayStore';
import classes from './DayBlock.module.scss';

const DayBlock = ({ dayIndex, categoryId, taskId, id}) => {

  const { setSelectedDay, selectedDay } = selectedDayStore;

  const isCurrentDaySelected = selectedDay
    && dayIndex === selectedDay.colIndex
    && taskId === selectedDay.rowIndex
    && selectedDay.categoryIndex === categoryId;

  return (
    <div
      onClick={() => setSelectedDay(taskId, dayIndex, categoryId)}
      className={clsx(classes.day_block, isCurrentDaySelected && classes.day_block_selected)}
    >
      <input
        data-category={categoryId}
        data-task={taskId}
        data-day={dayIndex}
        className={classes.day_block_input}
        value={id}
        readOnly
      />
    </div>
  );
};

export default observer(DayBlock);