import React from 'react';
import { Container } from '@material-ui/core';
import { useFlip } from 'react-easy-flip';
import { Tabs } from 'antd';

import Box from '../Box/Box';
import DayTab from '../DayTab/DayTab';
import TaskList from '../TaskList/TaskList';
import TaskPanel from '../TaskPanel/TaskPanel';

const { TabPane } = Tabs;
const flipRootID = "flip-root";

const DayTabs = ({ weekTasks, dayNames, todayDayIndex, onTaskListFinish, onTaskListDrop, onTaskPanelFinish }) => {
  useFlip(flipRootID);

  return (
    <Tabs defaultActiveKey={String(todayDayIndex)} tabPosition="right" centered>
      {dayNames.map((dayName, index) => {
        const dayTasks = weekTasks[index];

        return (
          <TabPane style={{ padding: 0, }} tab={<DayTab id={index} text={dayName} />} key={index}>
            <Container maxWidth="sm">
              <Box>
                <div data-flip-root-id={flipRootID}>
                  <TaskList
                    id={index}
                    initialTasks={dayTasks}
                    onTaskListFinish={onTaskListFinish}
                    onTaskListDrop={onTaskListDrop}
                  />
                  <TaskPanel
                    id={index}
                    onTaskPanelFinish={onTaskPanelFinish}
                  />
                </div>
              </Box>
            </Container>
          </TabPane>
        );
      })}
    </Tabs>
  );
}

export default DayTabs;
