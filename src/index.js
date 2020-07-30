import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const WEEK_TASKS = [
  [],
  [
    { name: "Пробежка", time: "08:00" },
    { name: "Завтрак", time: "09:00" },
    { name: "Совещание", time: "12:00" },
  ],
  [],
  [
    { name: "Завтрак", time: "09:00" },
    { name: "Спортзал", time: "19:00" },
  ],
  [],
  [
    { name: "Обед", time: "13:30" },
    { name: "Скайпкол", time: "17:40" },
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
