import React from 'react';
import { Container } from '@material-ui/core';
import { useFlip } from 'react-easy-flip';
import { Tabs } from 'antd';

import { FLIP_ROOT_ID } from '../../utils/constants';
import Box from '../Box/Box';
import DayTab from '../DayTab/DayTab';
import TaskList from '../TaskList/TaskList';
import TaskPanel from '../TaskPanel/TaskPanel';

const { TabPane } = Tabs;

const DayTabs = ({ weekTasks, dayNames, todayDayIndex, onTaskListFinish, onTaskListDrop, onTaskPanelFinish }) => {
  useFlip(FLIP_ROOT_ID);

  return (
    <Tabs defaultActiveKey={String(todayDayIndex)} tabPosition="right" centered>
      {dayNames.map((dayName, index) => {
        const dayTasks = weekTasks[index];

        return (
          <TabPane style={{ padding: 0, }} tab={<DayTab id={index} text={dayName} />} key={index}>
            <Container maxWidth="sm">
              <Box>
                <div data-flip-root-id={FLIP_ROOT_ID}>
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
