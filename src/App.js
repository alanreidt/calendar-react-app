import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Container } from '@material-ui/core';

import DayTabs from './components/DayTabs/DayTabs';

import './App.css';

function App({ initialWeekTasks = [], dayNames, todayDayIndex }) {
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
    const sourceIndex = dragSourceId;
    const targetIndex = dropTargetId;

    setWeekTasks(
      (weekTasks) => weekTasks.map((dayTasks, dayTasksIndex, self) => dayTasksIndex === targetIndex ? self[sourceIndex] : dayTasks)
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Container maxWidth="lg" style={{ paddingTop: 100, }}>
          <DayTabs
            weekTasks={weekTasks}
            dayNames={dayNames}
            todayDayIndex={todayDayIndex}
            handleTaskListFinish={handleTaskListFinish}
            handleTaskListDrop={handleTaskListDrop}
          />
        </Container>
      </div>
    </DndProvider>
  );
}

export default App;
