import React from 'react';
import moment from 'moment';
import { Tabs } from 'antd';

import Box from '../Box/Box';
import TaskList from '../TaskList/TaskList';

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

const DayTabs = ({ weekTasks, handleTaskListFinish, handleTaskListDrop }) => {
  return (
    <Tabs defaultActiveKey={`${todayDayIndex}`} tabPosition="right">
      {DAY_NAMES.map((dayName, i) => {
        const dayTasks = weekTasks[i];
        const style = {
          padding: 20,
        };

        return (
          <TabPane style={style} tab={dayName} key={i}>
            <Box>
              <TaskList
                id={i}
                initialTasks={dayTasks}
                handleTaskListFinish={handleTaskListFinish}
                handleTaskListDrop={handleTaskListDrop}
              />
            </Box>
          </TabPane>
        );
      })}
    </Tabs>
  );
}

export default DayTabs;
