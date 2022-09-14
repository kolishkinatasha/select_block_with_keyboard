import { useEffect } from 'react';

import selectedDayStore from '../stores/selectedDayStore';
import useKeyPress from './useKeyPress';

const KeyBoardListener = () => {

  // вводим переменную задающую количество отображаемых дней
  const daysNumber = 7;

  // получаем из стора текущее значение выбранного дня и функцию сеттер
  const { selectedDay, setSelectedDay } = selectedDayStore;

  // переменные для событий нажатий на клавиши
  const downPress = useKeyPress('ArrowDown');
  const leftPress = useKeyPress('ArrowLeft');
  const rightPress = useKeyPress('ArrowRight');
  const upPress = useKeyPress('ArrowUp');

  // функция получения индекса строки (индекса задачи)
  const getRowAndCategoryIndex = (dayIndex, currentTaskId, currentCategoryId, step) => {
    // получаем список инпутов которые имеют дата атрибут равный текущему выбранному dayIndex
    const inputList = document.querySelectorAll('[data-day="' + dayIndex + '"]');
    let rowIndex = currentTaskId;
    let categoryIndex = currentCategoryId;
    // пробегаемся в цикле по массиву инпутов 
    inputList.forEach((input, index) => {
      // получаем значения data-task и data-category атрибута
      const taskId = input.getAttribute('data-task');
      const categoryId = input.getAttribute('data-category');
      // если индекс задачи и категории элемента совпадает с текущим выборанным элементом 
      // то изменить значение на заданный шаг (+-1), то есть перейти к следующему или предыдущему индексу
      if (taskId && currentTaskId === +taskId && categoryId && currentCategoryId === +categoryId) {
        const newIndex = index + step;
        const newInput = inputList[newIndex];
        // задаём новые значения для строки и категории
        if (newInput) {
          rowIndex = +(newInput.getAttribute('data-task') || currentTaskId);
          categoryIndex = +(newInput.getAttribute('data-category') || -1);
        }
      }
    });

    // возвращаем вычесленные данные
    return { rowIndex, categoryIndex };
  };

  useEffect(() => {
    // получаем текущий выбранный элемент (input)
    const isInputFocused = document.activeElement && document.activeElement.tagName === 'INPUT';
    // выполняем действия, если существует выбранный день и активный инпут
    if (selectedDay && !isInputFocused) {
      let rowIndex = selectedDay.row;
      let colIndex = selectedDay.col;
      let categoryIndex = selectedDay.categoryIndex;

      // при нажатии на клавиши стрелок вызываем функцию определения rowIndex и categoryIndex
      if (downPress) {
        // если нажата клавиша вниз шаг + 1
        const data = getRowAndCategoryIndex(selectedDay.col, selectedDay.row, selectedDay.categoryIndex, + 1);
        categoryIndex = data.categoryIndex;
        rowIndex = data.rowIndex;
      } else if (upPress) {
        // если нажата клавиша вверх шаг - 1
        const data = getRowAndCategoryIndex(selectedDay.col, selectedDay.row, selectedDay.categoryIndex, -1);
        rowIndex = data.rowIndex;
        categoryIndex = data.categoryIndex;
      } else if (leftPress) {
        // если нажата клавиша влево и выбранный день находится в крайней слева колонке (шаг - 1)
        // необходимо перенести на выбранный день на 1 скроку вверх в крайнюю справа колонку
        if (selectedDay.col === 0) {
          // -----
          const prevData = getRowAndCategoryIndex(selectedDay.col, selectedDay.row, selectedDay.categoryIndex, -1);
          categoryIndex = prevData.categoryIndex;
          if (prevData.rowIndex !== rowIndex) {
            colIndex = daysNumber - 1;
            rowIndex = prevData.rowIndex;
          }
        } else {
          // иначе сдвигаем выбранный день на одну колонку влево
          colIndex = selectedDay.col - 1;
        }
      } else if (rightPress) {
        // если нажата клавиша вправо и выбранный день находится в крайней справа колонке (шаг + 1)
        // необходимо перенести на выбранный день на 1 скроку вниз в крайнюю слева колонку
        if (selectedDay.col === daysNumber - 1) {
          // -----
          const nextRow = getRowAndCategoryIndex(selectedDay.col, selectedDay.row, selectedDay.categoryIndex, +1);
          categoryIndex = nextRow.categoryIndex;
          if (nextRow.rowIndex !== rowIndex) {
            colIndex = 0;
            rowIndex = nextRow.rowIndex;
          }
        } else {
          // иначе сдвигаем выбранный день на одну колонку вправо
          colIndex = selectedDay.col + 1;
        }
      }

      // задаём новый выбранный элемент через сеттер
      setSelectedDay(rowIndex, colIndex, categoryIndex);
    }
  }, [leftPress, rightPress, upPress, downPress, selectedDay, setSelectedDay]);

  return null;
};

export default KeyBoardListener;