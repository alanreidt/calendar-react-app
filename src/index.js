import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import moment from 'moment';

const TIME_FORMAT = "HH:mm";

const WEEK_TASKS = [
  [],
  [
    { name: "Пробежка", time: moment("08:00", TIME_FORMAT) },
    { name: "Завтрак", time: moment("09:00", TIME_FORMAT) },
    { name: "Совещание", time: moment("12:00", TIME_FORMAT) },
  ],
  [],
  [
    { name: "Завтрак", time: moment("09:00", TIME_FORMAT) },
    { name: "Спортзал", time: moment("19:00", TIME_FORMAT) },
  ],
  [],
  [
    { name: "Обед", time: moment("13:30", TIME_FORMAT) },
    { name: "Скайпкол", time: moment("17:40", TIME_FORMAT) },
  ],
  [],
];

ReactDOM.render(
  <React.StrictMode>
    <App weekTasks={WEEK_TASKS} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
