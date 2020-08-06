import React from 'react';
import { Tabs } from 'antd';

import Box from '../Box/Box';
import TaskList from '../TaskList/TaskList';

const { TabPane } = Tabs;

const DayTabs = ({ weekTasks, dayNames, todayDayIndex, handleTaskListFinish, handleTaskListDrop }) => {
  return (
    <Tabs defaultActiveKey={`${todayDayIndex}`} tabPosition="right">
      {dayNames.map((dayName, index) => {
        const dayTasks = weekTasks[index];
        const style = {
          padding: 20,
        };

        return (
          <TabPane style={style} tab={dayName} key={index}>
            <Box>
              <TaskList
                id={index}
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
