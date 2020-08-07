import React from 'react';
import { Container } from '@material-ui/core';
import { Tabs } from 'antd';

import Box from '../Box/Box';
import DayTab from '../DayTab/DayTab';
import TaskList from '../TaskList/TaskList';

const { TabPane } = Tabs;

const DayTabs = ({ weekTasks, dayNames, todayDayIndex, handleTaskListFinish, handleTaskListDrop }) => {
  return (
    <Tabs defaultActiveKey={String(todayDayIndex)} tabPosition="right" centered>
      {dayNames.map((dayName, index) => {
        const dayTasks = weekTasks[index];

        return (
          <TabPane style={{ padding: 0, }} tab={<DayTab id={index} text={dayName} />} key={index}>
            <Container maxWidth="sm">
              <Box>
                <TaskList
                  id={index}
                  initialTasks={dayTasks}
                  handleTaskListFinish={handleTaskListFinish}
                  handleTaskListDrop={handleTaskListDrop}
                />
              </Box>
            </Container>
          </TabPane>
        );
      })}
    </Tabs>
  );
}

export default DayTabs;
