import React, { useEffect, useContext } from 'react';

import { Form, Button } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

import { checkIsDateExpiredBy, normalizeDate } from '../utils/helpers';
import { WeekTasksDispatch } from '../utils/constants';
import Task from './Task';

function TaskList({ initialTasks = [], dayIndex, taskDueDate }) {
  const dispatch = useContext(WeekTasksDispatch);
  const [form] = Form.useForm();

  useEffect(() => {
    // Synchronize initialTasks update manually, 'cause form ignores it by default
    form.setFieldsValue({ tasks: initialTasks });
  }, [form, initialTasks]);

  const handleFinish = ({ tasks }) => {
    const sortedTasks = tasks.sort((a, b) => a.date - b.date);

    dispatch({
      type: 'update',
      payload: {
        dayIndex,
        dayTasks: sortedTasks,
      },
    });
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

  const checkIsDateExpired = checkIsDateExpiredBy(taskDueDate);

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
                  const taskID = initialTasks[index].id;
                  const removeButton = (
                    <Button title="remove">
                      <MinusCircleOutlined
                        onClick={() => {
                          handleRemove(index, remove);
                        }}
                      />
                    </Button>
                  );

                  return (
                    <Task
                      key={taskID}
                      id={taskID}
                      index={index}
                      expired={checkIsDateExpired(
                        normalizeDate(initialTasks[index].date, dayIndex)
                      )}
                      button={removeButton}
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
