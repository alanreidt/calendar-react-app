import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const SCHEDULE = {
  "2020-06-10": [
    { name: "Пробежка", timeISO: "08:00" },
    { name: "Завтрак", timeISO: "09:00" },
    { name: "Совещание", timeISO: "12:00" },
  ],
  "2020-06-29": [
    { name: "Завтрак", timeISO: "09:00" },
    { name: "Спортзал", timeISO: "19:00" },
  ],
  "2020-06-31": [
    { name: "Обед", timeISO: "13:30" },
    { name: "Скайпкол", timeISO: "17:40" },
  ],
};

ReactDOM.render(
  <React.StrictMode>
    <App schedule={SCHEDULE} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
