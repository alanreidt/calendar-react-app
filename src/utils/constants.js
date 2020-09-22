import { createContext } from 'react';
import { getTodayDayIndex } from './helpers';

const LOCAL_STORAGE_ITEM_NAME = 'alanreidt-calendar-app';
const DAY_NAMES = [
  'Пн',
  'Вт',
  'Ср',
  'Чт',
  'Пт',
  'Сб',
  'Вс',
];
const TIME_FORMAT = "HH:mm";
const todayDayIndex = getTodayDayIndex();

const FLIP_ROOT_ID = "flip-root";

const WeekTasksDispatch = createContext(null);

const Types = {
  LIST: 'list',
};

export {
  LOCAL_STORAGE_ITEM_NAME,
  DAY_NAMES,
  TIME_FORMAT,
  FLIP_ROOT_ID,
  todayDayIndex,
  WeekTasksDispatch,
  Types,
};
