import React from 'react';
import { Tabs } from 'antd';

import Box from '../Box/Box';
import TaskList from '../TaskList/TaskList';

const { TabPane } = Tabs;

const DayTabPane = ({ id, dayTasks, handleTaskListFinish, handleTaskListDrop }) => {
  const style = {
    padding: 20,
  };

  return (
    <TabPane key={id} style={style}>
      <Box>
        <TaskList
          id={id}
          initialTasks={dayTasks}
          handleTaskListFinish={handleTaskListFinish}
          handleTaskListDrop={handleTaskListDrop}
        />
      </Box>
    </TabPane>
  );
}

export default DayTabPane;
