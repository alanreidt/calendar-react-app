import React from 'react';
import moment from 'moment';
import { Tabs } from 'antd';

import Box from './components/Box/Box';
import TaskList from './components/TaskList/TaskList';

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

function App({ weekTasks }) {
  const [sundayTasks, ...restTasks] = weekTasks;
  const weekTasksLocalized = [...restTasks, sundayTasks];
  const todayDayIndex = (moment().day() + 6) % DAY_NAMES.length;

  return (
    <div className="App">
      <Tabs defaultActiveKey={`${todayDayIndex}`} tabPosition="right">
        {weekTasksLocalized.map((dayTasks, i) => {
          const indexLocalized = (i + 1) % DAY_NAMES.length;
          const dayName = DAY_NAMES[indexLocalized];
          const style = {
            padding: 20,
          };

          return (
            <TabPane style={style} tab={dayName} key={i}>
              <Box>
                <TaskList initialTasks={dayTasks} />
              </Box>
            </TabPane>
          )
        })}
      </Tabs>
    </div>
  );
}

export default App;
