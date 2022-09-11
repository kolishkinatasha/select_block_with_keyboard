import React from 'react';

import classes from './Header.module.scss';

const Header = () => {

  const daysNameOfTheWeek = ['1 ПН', '2 ВТ', '3 СР', '4 ЧТ', '5 ПТ', '6 СБ', '7 ВС'];

  return (
    <div className={classes.header}>
      {
        daysNameOfTheWeek.map(item => (
          <div key={item} className={classes.day}>
            {item}
          </div>
        ))
      }
    </div>
  );
};

export default Header;