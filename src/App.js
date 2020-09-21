import React, { useEffect, useReducer } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FlipProvider } from 'react-easy-flip';
import { Container } from '@material-ui/core';

import { weekTasksReducer, getTime } from './utils/helpers';
import { WeekTasksDispatch } from './utils/constants';
import DayTabs from './components/DayTabs/DayTabs';

import './App.css';

function App({ initialWeekTasks = [], dayNames, todayDayIndex }) {
  const [weekTasks, dispatch] = useReducer(weekTasksReducer, initialWeekTasks);

  useEffect(() => {
    localStorage.setItem('weekTasks', JSON.stringify(
      weekTasks,
      (key, value) => key === 'date' ? getTime(value) : value
    ));
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <FlipProvider>
        <WeekTasksDispatch.Provider value={dispatch}>
          <div className="App">
            <Container maxWidth="lg" style={{ paddingTop: 100, }}>
              <DayTabs
                weekTasks={weekTasks}
                dayNames={dayNames}
                todayDayIndex={todayDayIndex}
              />
            </Container>
          </div>
        </WeekTasksDispatch.Provider>
      </FlipProvider>
    </DndProvider>
  );
}

export default App;
