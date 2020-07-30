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
  const weekTasks = props.weekTasks;
  const todayDayIndex = moment().day();

  return (
    <div className="App">
      <Tabs defaultActiveKey={`${todayDayIndex}`} tabPosition="right">
        {weekTasks.map((dayTasks, i) => (
          <TabPane tab={DAY_NAMES[i]} key={i}>
            Content of tab {i}
            {dayTasks[0] && dayTasks[0].name}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default App;
