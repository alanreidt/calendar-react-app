import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import { WEEK_TASKS, DAY_NAMES, todayDayIndex } from './utils/constants';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';

const weekTasks = JSON.parse(WEEK_TASKS, (key, value) => key === 'date' ? moment(value) : value);

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
