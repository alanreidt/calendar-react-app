import React, { useContext } from 'react';
import { Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { generateID } from '../utils/helpers';
import { WeekTasksDispatch } from '../utils/constants';
import Task from './Task';

function TaskPanel({ dayIndex }) {
  const dispatch = useContext(WeekTasksDispatch);
  const [form] = Form.useForm();

  const handleFinish = ({ tasks }) => {
    dispatch({
      type: 'add',
      payload: {
        dayIndex,
        dayTasks: tasks,
      },
    });

    form.resetFields();
  };

  return (
    <div className="TaskPanel">
      <Form
        form={form}
        name="task-panel-form"
        onFinish={handleFinish}
        autoComplete="off"
      >
        <Form.List name="tasks">
          {(fields, { add }) => {
            return (
              <div>
                {fields.map((field, index) => {
                  const { tasks } = form.getFieldsValue();
                  const taskID = tasks[index].id;

                  return (
                    <Task
                      key={taskID}
                      id={taskID}
                      index={index}
                      button={
                        <Form.Item>
                          <Button htmlType="submit">
                            <PlusOutlined />
                          </Button>
                        </Form.Item>
                      }
                    />
                  );
                })}

                {fields.length <= 0 && (
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add({
                          name: '',
                          date: '',
                          id: generateID(),
                        });
                      }}
                      block
                    >
                      <PlusOutlined /> Add field
                    </Button>
                  </Form.Item>
                )}
              </div>
            );
          }}
        </Form.List>
      </Form>
    </div>
  );
};

export default TaskPanel;
