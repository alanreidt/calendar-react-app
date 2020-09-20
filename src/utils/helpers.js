import { useState, useEffect } from 'react';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

import { TIME_FORMAT } from './constants';

const useTick = (initialDate, disabled = false) => {
  const [date, setDate] = useState(initialDate);

  useEffect(() => {
    const timerID = disabled
    ? null
    : setInterval(() => {
      setDate(moment());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, [disabled]);

  return disabled ? null : date;
}

const checkIsCurrentDay = (dayIndex) => {
  return (dayIndex - (moment().isoWeekday - 1)) === 0;
}

const useDate = (initialDate, dayIndex) => {
  const isCurrentDay = checkIsCurrentDay(dayIndex);

  return useTick(initialDate, !isCurrentDay);
}

const generateID = (index) => uuid();
const getID = (source, index) => source[index] && source[index].id;
const checkIsDateExpired = (date) => (source, index) => source[index].date < date;
const getTime = (date) => (
  moment(date).isValid()
    ? moment(date).format(TIME_FORMAT)
    : date
);

export {
  useTick,
  useDate,
  checkIsCurrentDay,
  getTime,
  generateID,
  getID,
  checkIsDateExpired,
};
