import React, { useState } from 'react';
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

function App({ initialWeekTasks = [] }) {
  const [sundayTasks, ...restTasks] = initialWeekTasks;
  const initialWeekTasksLocalized = [...restTasks, sundayTasks];
  const [weekTasks, setWeekTasks] = useState(initialWeekTasksLocalized);

  const todayDayIndex = (moment().day() + 6) % DAY_NAMES.length;

  const handleFinish = (newDayTasks, newDayTasksIndex) => {
    setWeekTasks(
      (weekTasks) => weekTasks.map((dayTasks, dayTasksIndex) => dayTasksIndex === newDayTasksIndex ? newDayTasks : dayTasks)
    );
  };

  return (
    <div className="App">
      <Tabs defaultActiveKey={`${todayDayIndex}`} tabPosition="right">
        {weekTasks.map((dayTasks, i) => {
          const indexLocalized = (i + 1) % DAY_NAMES.length;
          const dayName = DAY_NAMES[indexLocalized];
          const style = {
            padding: 20,
          };

          return (
            <TabPane style={style} tab={dayName} key={dayName}>
              <Box>
                <TaskList index={i} initialTasks={dayTasks} handleFinish={handleFinish} />
              </Box>
            </TabPane>
          )
        })}
      </Tabs>
    </div>
  );
}

export default App;
