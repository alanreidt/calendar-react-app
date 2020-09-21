import { useEffect, useRef } from 'react';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

import { TIME_FORMAT } from './constants';

// source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const createNewDayTasks = (dayTasks, newDayTasks) => (
  [...dayTasks, ...newDayTasks].sort((a, b) => a.date - b.date)
);

function weekTasksReducer(state, action) {
  switch (action.type) {
    case 'update':
      return state.map(
        (dayTasks, dayIndex) => dayIndex === action.payload.dayIndex
          ? action.payload.dayTasks
          : dayTasks
      );
    case 'copy':
      return state.map(
        (dayTasks, dayIndex, self) => dayIndex === action.payload.targetIndex
          ? self[action.payload.sourceIndex]
          : dayTasks
      );
    case 'add':
      return state.map(
        (dayTasks, dayIndex) => dayIndex === action.payload.dayIndex
          ? createNewDayTasks(dayTasks, action.payload.dayTasks)
          : dayTasks
      );
    default:
  }
}

const generateID = (index) => uuid();
const generateNameByIndex = (index) => (name) => index !== undefined ? [index, name] : name;
const getTodayDayIndex = () => moment().isoWeekday() - 1;
const normalizeDate = (date, dayIndex) => moment(date).add(dayIndex - getTodayDayIndex(), 'd');
const checkIsDateExpired = (now) => (date) => date < now;
const getTime = (date) => (
  moment(date).isValid()
    ? moment(date).format(TIME_FORMAT)
    : date
);

export {
  useInterval,
  createNewDayTasks,
  weekTasksReducer,
  getTime,
  generateID,
  generateNameByIndex,
  getTodayDayIndex,
  normalizeDate,
  checkIsDateExpired,
};
