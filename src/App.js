import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
    console.log(`Success, dragSourceId: ${dragSourceId} dropTargetId: ${dropTargetId}`);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <DayTabs
          weekTasks={weekTasks}
          dayNames={dayNames}
          todayDayIndex={todayDayIndex}
          handleTaskListFinish={handleTaskListFinish}
          handleTaskListDrop={handleTaskListDrop}
        />
      </div>
    </DndProvider>
  );
}

export default App;
