import { getTodayDayIndex } from './helpers';

const WEEK_TASKS = localStorage.getItem('weekTasks') || JSON.stringify(Array(7).fill([]));
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

const Types = {
  LIST: 'list',
};

export {
  WEEK_TASKS,
  DAY_NAMES,
  TIME_FORMAT,
  FLIP_ROOT_ID,
  todayDayIndex,
  Types,
};
