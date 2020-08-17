import { useState, useEffect } from 'react';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

import { TIME_FORMAT } from './constants';

const useTick = (initialDate) => {
  const [date, setDate] = useState(initialDate);

  useEffect(() => {
    const timerID = setInterval(() => {
      setDate(moment());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return date;
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
  getTime,
  generateID,
  getID,
  checkIsDateExpired,
};
