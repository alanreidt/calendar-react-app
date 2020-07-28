import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const DAY_ENTRIES = [
  {
    date: "2020-06-10",
    tasks: [
      { name: "Пробежка", time: "08:00" },
      { name: "Завтрак", time: "09:00" },
      { name: "Совещание", time: "12:00" },
    ],
  },
  {
    date: "2020-06-29",
    tasks: [
      { name: "Завтрак", time: "09:00" },
      { name: "Спортзал", time: "19:00" },
    ],
  },
  {
    date: "2020-06-31",
    tasks: [
      { name: "Обед", time: "13:30" },
      { name: "Скайпкол", time: "17:40" },
    ],
  },
];

ReactDOM.render(
  <React.StrictMode>
    <App dayEntries={DAY_ENTRIES} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
