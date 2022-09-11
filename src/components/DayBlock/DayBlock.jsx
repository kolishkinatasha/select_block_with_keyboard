import React, { useRef } from 'react';

import classes from './DayBlock.module.scss';

const DayBlock = (props) => {

  const inputRef = useRef(null);

  return (
    <div
      className={classes.day_block}>
      <input
        ref={inputRef}
        data-category={props.categoryId}
        data-task={props.taskId}
        data-day={props.dayIndex}
        className={classes.day_block_input}
        value={props.id}
        readOnly
      />
    </div>
  );
};

export default DayBlock;