import React, { useState } from 'react';
import moment from 'moment';

import { Container } from '@material-ui/core';
import { useFlip } from 'react-easy-flip';
import { Space, Tabs } from 'antd';

import { useInterval } from '../utils/helpers';
import { FLIP_ROOT_ID } from '../utils/constants';
import Box from './Box';
import DayTab from './DayTab';
import CopyButton from './CopyButton';
import TaskList from './TaskList';
import TaskPanel from './TaskPanel';

const { TabPane } = Tabs;

function DayTabs({ weekTasks, dayNames, todayDayIndex }) {
  useFlip(FLIP_ROOT_ID);

  const [now, setNow] = useState(moment());

  useInterval(() => {
    setNow(moment());
  }, 1000);

  return (
    <Tabs defaultActiveKey={String(todayDayIndex)} tabPosition="right" centered>
      {dayNames.map((dayName, dayIndex) => {
        const dayTasks = weekTasks[dayIndex];
        const dayTab = <DayTab dayIndex={dayIndex} text={dayName} />;

        return (
          <TabPane style={{ padding: 0, }} tab={dayTab} key={dayIndex}>
            <Container maxWidth="sm">
              <Box>
                <Space data-flip-root-id={FLIP_ROOT_ID} direction="vertical" size="large">
                  <div style={{ textAlign: 'right' }}>
                    <CopyButton
                      dayIndex={dayIndex}
                    />
                  </div>
                  <TaskList
                    dayIndex={dayIndex}
                    initialTasks={dayTasks}
                    now={now}
                  />
                  <TaskPanel
                    dayIndex={dayIndex}
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
