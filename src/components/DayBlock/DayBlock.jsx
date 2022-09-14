import { observer } from 'mobx-react';
import React, { useRef } from 'react';

import selectedDayStore from '../../stores/selectedDayStore';
import classes from './DayBlock.module.scss';

const DayBlock = ({ dayIndex, categoryId, taskId, id}) => {

  const inputRef = useRef(null);

  const { setSelectedDay, selectedDay } = selectedDayStore;

  const isCurrentDaySelected = selectedDay
    && dayIndex === selectedDay.col
    && taskId === selectedDay.row
    && selectedDay.categoryIndex === categoryId;

  return (
    <div
      onClick={() => setSelectedDay(taskId, dayIndex, categoryId)}
      className={
        [
          classes.day_block,
          isCurrentDaySelected ? classes.day_block__selected : '',
        ].join(' ')
      }
    >
      <input
        ref={inputRef}
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