import React from 'react';
import { Tabs } from 'antd';
import moment from 'moment';

import './App.css';

const { TabPane } = Tabs;

const DAY_NAMES = [
  'Вс',
  'Пн',
  'Вт',
  'Ср',
  'Чт',
  'Пт',
  'Сб',
];

function App(props) {
  const now = moment();
  const todayDayIndex = now.getDay();
  // const todayDateISO = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;

  const getCurrentWeekDates = () => {
    const now = moment();
    const todayDayIndex = now.getDay();

    const date = new Date(now.getFullYear, now.getMonth, now.getDate);
    const firstWeekDay = date.setDate(date.getDate - todayDayIndex);

    const WEEK_DAYS_NUMBER = 7;
    const currentWeekDates = [];

    for (let i = 0; i < 7; i++) {
      // const dateISO =

      // currentWeekDates.push
    }
  };

  // const currentWeekDatesISO = getCurrentWeekDates();

  return (
    <div className="App">
      <Tabs defaultActiveKey={`${todayDayIndex}`} tabPosition="right">
        {DAY_NAMES.map((dayName, i) => {
          // const dayEntry = props.schedule[i];
          // const {dateISO, tasks} = dayEntry;
          // const date = new Date(Date.parse(dateISO));
          // const dayNameIndex = date.getDay();
          // const dayName = DAY_NAMES[dayNameIndex];

          return (
            <TabPane tab={dayName} key={i}>
              Content of tab {i}
              {/* {if ()} */}
            </TabPane>
          )
        })}
      </Tabs>
    </div>
  );
}

export default App;
