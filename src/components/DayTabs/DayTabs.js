import React, { useState } from 'react';
import moment from 'moment';

import { Container } from '@material-ui/core';
import { useFlip } from 'react-easy-flip';
import { Space, Tabs } from 'antd';

import { useInterval } from '../../utils/helpers';
import { FLIP_ROOT_ID } from '../../utils/constants';
import Box from '../Box/Box';
import DayTab from '../DayTab/DayTab';
import CopyButton from '../CopyButton/CopyButton';
import TaskList from '../TaskList/TaskList';
import TaskPanel from '../TaskPanel/TaskPanel';

const { TabPane } = Tabs;

const DayTabs = ({ weekTasks, dayNames, todayDayIndex, onTaskListFinish, onCopyButtonDrop, onTaskPanelFinish }) => {
  useFlip(FLIP_ROOT_ID);

  let [date, setDate] = useState(moment());

  useInterval(() => {
    setDate(moment());
  }, 1000);

  return (
    <Tabs defaultActiveKey={String(todayDayIndex)} tabPosition="right" centered>
      {dayNames.map((dayName, index) => {
        const dayTasks = weekTasks[index];

        return (
          <TabPane style={{ padding: 0, }} tab={<DayTab id={index} text={dayName} />} key={index}>
            <Container maxWidth="sm">
              <Box>
                <Space data-flip-root-id={FLIP_ROOT_ID} direction="vertical" size="large">
                  <div style={{ textAlign: 'right' }}>
                    <CopyButton
                      id={index}
                      onCopyButtonDrop={onCopyButtonDrop}
                    />
                  </div>
                  <TaskList
                    id={index}
                    initialTasks={dayTasks}
                    onTaskListFinish={onTaskListFinish}
                    date={date}
                  />
                  <TaskPanel
                    id={index}
                    onTaskPanelFinish={onTaskPanelFinish}
                  />
                </Space>
              </Box>
            </Container>
          </TabPane>
        );
      })}
    </Tabs>
  );
}

export default DayTabs;
