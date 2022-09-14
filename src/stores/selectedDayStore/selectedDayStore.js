import { makeAutoObservable } from 'mobx';

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  selectedDay = null;

  setSelectedDay = (rowIndex, colIndex, categoryIndex) => {
    this.selectedDay = {
      row: rowIndex,
      col: colIndex,
      categoryIndex: categoryIndex,
    };
  };
}

const selectedDayStore = new Store();

export default selectedDayStore;