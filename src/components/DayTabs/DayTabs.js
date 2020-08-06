import React from 'react';
import { Tabs } from 'antd';

import Box from '../Box/Box';
import TaskList from '../TaskList/TaskList';

const { TabPane } = Tabs;

const DayTabs = ({ weekTasks, dayNames, todayDayIndex, handleTaskListFinish, handleTaskListDrop }) => {
  return (
    <Tabs defaultActiveKey={`${todayDayIndex}`} tabPosition="right">
      {dayNames.map((dayName, i) => {
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
