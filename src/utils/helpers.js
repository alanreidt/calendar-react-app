import { useState, useEffect } from 'react';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

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

export {
  useTick,
  generateID,
  getID,
  checkIsDateExpired,
};
