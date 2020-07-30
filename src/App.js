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
  const [sundayTasks, ...restTasks] = props.weekTasks;
  const weekTasksLocalized = [...restTasks, sundayTasks];
  const todayDayIndex = moment().day();

  return (
    <div className="App">
      <Tabs defaultActiveKey={`${todayDayIndex}`} tabPosition="right">
        {weekTasksLocalized.map((dayTasks, i) => {
          const indexLocalized = (i + 1) % DAY_NAMES.length;

          return (
            <TabPane tab={DAY_NAMES[indexLocalized]} key={i}>
              Content of tab {i}
              {dayTasks[0] && dayTasks[0].name}
            </TabPane>
          )
        })}
      </Tabs>
    </div>
  );
}

export default App;
