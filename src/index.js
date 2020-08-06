import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';

const WEEK_TASKS = localStorage.getItem('weekTasks') || JSON.stringify(Array(7).fill([]));
const weekTasks = JSON.parse(WEEK_TASKS, (key, value) => key === 'time' ? moment(value) : value);
const DAY_NAMES = [
  'Пн',
  'Вт',
  'Ср',
  'Чт',
  'Пт',
  'Сб',
  'Вс',
];
const todayDayIndex = moment().isoWeekday() - 1;

ReactDOM.render(
  <React.StrictMode>
    <App
      initialWeekTasks={weekTasks}
      dayNames={DAY_NAMES}
      todayDayIndex={todayDayIndex}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
