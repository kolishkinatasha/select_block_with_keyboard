import React from 'react';

import CategoryBlock from '../CategoryBlock';
import Header from '../Header';
import KeyBoardListener from '../../utils/KeyBoardListener';
import { data } from '../../data/data';

const App = () => {
  return (
    <React.Fragment>
      <KeyBoardListener />
      <Header />
      <div>
        {
          data.map((item, index) => <CategoryBlock key={index} dataItem={item} /> )
        }
      </div>
    </React.Fragment>
  );
}

export default App;