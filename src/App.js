import React, { useState, useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
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

  const handleTaskListFinish = (newDayTasks, newDayTasksIndex) => {
    setWeekTasks(
      (weekTasks) => weekTasks.map((dayTasks, dayTasksIndex) => dayTasksIndex === newDayTasksIndex ? newDayTasks : dayTasks)
    );
  };

  const handleTaskListDrop = (dragSourceId, dropTargetId) => {
    console.log(`Success, dragSourceId: ${dragSourceId} dropTargetId: ${dropTargetId}`);
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
                  <TaskList id={i} initialTasks={dayTasks} handleTaskListFinish={handleTaskListFinish} handleTaskListDrop={handleTaskListDrop} />
                </Box>
              </TabPane>
            )
          })}
        </Tabs>
      </div>
    </DndProvider>
  );
}

export default App;
