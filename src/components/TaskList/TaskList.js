import React, {  useEffect } from 'react';

import { Form, Button } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

import { getID, checkIsDateExpired } from '../../utils/helpers';
import Task from '../Task/Task';

const TaskList = ({ initialTasks = [], onTaskListFinish, id, now }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    // Synchronize initialTasks update manually, 'cause form ignores it by default
    form.setFieldsValue({ tasks: initialTasks });
  }, [form, initialTasks]);

  const handleFinish = ({ tasks }) => {
    const sortedTasks = tasks.sort((a, b) => a.date - b.date);

    onTaskListFinish(sortedTasks, id);
  };

  const handleRemove = (index, remove) => {
    remove(index);

    // Give time for the form to remove the item
    // Validation yields error otherwise
    setTimeout(() => {
      // Synchronize the App state through the onFinish callback
      form.submit()
    }, 0);
  }

  const checkIsExpired = checkIsDateExpired(now);

  return (
    <div className="TaskList">
      <Form
        form={form}
        name="task-list-form"
        initialValues={{ tasks: initialTasks }}
        onFinish={handleFinish}
        autoComplete="off"
      >
        <Form.List name="tasks">
          {(fields, { remove }) => {
            return (
              <div>
                {fields.map((field, index) => {
                  const taskID = getID(initialTasks, index);

                  return (
                    <Task
                      key={taskID}
                      id={taskID}
                      index={index}
                      expired={checkIsExpired(initialTasks, index)}
                      button={
                        <MinusCircleOutlined
                          onClick={() => {
                            handleRemove(index, remove);
                          }}
                        />
                      }
                    />
                  )
                })}
              </div>
            );
          }}
        </Form.List>

        <Form.Item hidden>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TaskList;
