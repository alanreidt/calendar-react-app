import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import moment from 'moment';

const WEEK_TASKS = localStorage.getItem('weekTasks') || JSON.stringify(Array(7).fill([]));
const weekTasks = JSON.parse(WEEK_TASKS, (key, value) => key === 'time' ? moment(value) : value);

ReactDOM.render(
  <React.StrictMode>
    <App initialWeekTasks={weekTasks} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
