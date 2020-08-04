import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Tabs } from 'antd';

import Box from './components/Box/Box';
import TaskList from './components/TaskList/TaskList';

import './App.css';

const { TabPane } = Tabs;

const DAY_NAMES = [
  'Пн',
  'Вт',
  'Ср',
  'Чт',
  'Пт',
  'Сб',
  'Вс',
];
const todayDayIndex = moment().isoWeekday() - 1;

function App({ initialWeekTasks = [] }) {
  const [weekTasks, setWeekTasks] = useState(initialWeekTasks);

  useEffect(() => {
    localStorage.setItem('weekTasks', JSON.stringify(weekTasks));
  });

  const handleFinish = (newDayTasks, newDayTasksIndex) => {
    setWeekTasks(
      (weekTasks) => weekTasks.map((dayTasks, dayTasksIndex) => dayTasksIndex === newDayTasksIndex ? newDayTasks : dayTasks)
    );
  };

  return (
    <div className="App">
      <Tabs defaultActiveKey={`${todayDayIndex}`} tabPosition="right">
        {DAY_NAMES.map((dayName, i) => {
          const dayTasks = weekTasks[i];
          const style = {
            padding: 20,
          };

          return (
            <TabPane style={style} tab={dayName} key={i}>
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
