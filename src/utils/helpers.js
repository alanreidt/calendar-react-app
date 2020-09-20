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

const generateID = (index) => uuid();
const getID = (source, index) => source[index] && source[index].id;
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
  getTime,
  generateID,
  getID,
  getTodayDayIndex,
  normalizeDate,
  checkIsDateExpired,
};
