import { makeObservable, action, observable } from 'mobx';

class SelectedDayStore {
  selectedDay = null;

  constructor() {
    makeObservable(this, {
      selectedDay: observable,
      setSelectedDay: action.bound,
    });
  }

  setSelectedDay = (rowIndex, colIndex, categoryIndex) => {
    this.selectedDay = {
      rowIndex: rowIndex,
      colIndex: colIndex,
      categoryIndex: categoryIndex,
    };
  };
}

export default new SelectedDayStore();