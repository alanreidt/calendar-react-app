import React from 'react';
import { Tabs } from 'antd';

import DayTabPane from '../DayTabPane/DayTabPane';

const DayTabs = ({ weekTasks, dayNames, todayDayIndex, handleTaskListFinish, handleTaskListDrop }) => {
  return (
    <Tabs defaultActiveKey={String(todayDayIndex)} tabPosition="right">
      {dayNames.map((dayName, index) => {
        const dayTasks = weekTasks[index];

        return (
          <DayTabPane
            key={index}
            id={index}
            tab={dayName}
            dayTasks={dayTasks}
            handleTaskListFinish={handleTaskListFinish}
            handleTaskListDrop={handleTaskListDrop}
          />
        );
      })}
    </Tabs>
  );
}

export default DayTabs;
