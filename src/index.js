import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// the date is stored in ISO format (Monday is at 0th index) and in UTC time zone
const WEEK_TASKS = [
  [
    { name: "Пробежка", time: "05:00" },
    { name: "Завтрак", time: "06:00" },
    { name: "Совещание", time: "09:00" },
  ],
  [],
  [
    { name: "Завтрак", time: "06:00" },
    { name: "Спортзал", time: "16:00" },
  ],
  [],
  [
    { name: "Обед", time: "10:30" },
    { name: "Скайпкол", time: "14:40" },
  ],
  [],
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
