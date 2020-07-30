import React from 'react';
import { Tabs } from 'antd';
import moment from 'moment';

import Box from './components/Box/Box';

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
          const dayName = DAY_NAMES[indexLocalized];
          const style = {
            padding: 20,
          };

          return (
            <TabPane style={style} tab={dayName} key={i}>
              <Box dayTasks={dayTasks} >
                <div>Awesome</div>
                <div>Super</div>
              </Box>
            </TabPane>
          )
        })}
      </Tabs>
    </div>
  );
}

export default App;
