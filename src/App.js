import React from 'react';
import { Tabs, List, Input, TimePicker } from 'antd';
import moment from 'moment';

import Box from './components/Box/Box';

import './App.css';

const { TabPane } = Tabs;

const DAY_NAMES = [
  'Вс',
  'Пн',
  'Вт',
  'Ср',
  'Чт',
  'Пт',
  'Сб',
];
const TIME_FORMAT = "HH:mm";

function App(props) {
  const [sundayTasks, ...restTasks] = props.weekTasks;
  const weekTasksLocalized = [...restTasks, sundayTasks];
  const todayDayIndex = (moment().day() + 6) % DAY_NAMES.length;

  return (
    <div className="App">
      <Tabs defaultActiveKey={`${todayDayIndex}`} tabPosition="right">
        {weekTasksLocalized.map((dayTasks, i) => {
          const indexLocalized = (i + 1) % DAY_NAMES.length;
          const dayName = DAY_NAMES[indexLocalized];
          const style = {
            padding: 20,
          };

          return (
            <TabPane style={style} tab={dayName} key={i}>
              <Box>
                <List
                  header={<div>Header</div>}
                  footer={<div>Footer</div>}
                  bordered
                  dataSource={dayTasks}
                  renderItem={(dayTask) => (
                    <List.Item>
                      <TimePicker
                        defaultValue={moment(dayTask.time, TIME_FORMAT)}
                        format={TIME_FORMAT}
                      />
                      <Input defaultValue={dayTask.name} placeholder="Введите задачу" allowClear />
                    </List.Item>
                  )}
                />
              </Box>
            </TabPane>
          )
        })}
      </Tabs>
    </div>
  );
}

export default App;
