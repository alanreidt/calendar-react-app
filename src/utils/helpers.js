import { v4 as uuid } from 'uuid';

const generateID = (index) => uuid();
const getID = (source, index) => source[index] && source[index].id;
const checkIsDateExpired = (date, source, index) => source[index].date < date;

export {
  generateID,
  getID,
  checkIsDateExpired,
};
