import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import moment from 'moment';

import { Form, Button } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

import { getID, checkIsDateExpired } from '../../utils/helpers.js';
import Task from '../Task/Task';

const Types = {
  LIST: 'list',
};

const TaskList = ({ initialTasks = [], onTaskListFinish, onTaskListDrop, id }) => {
  const [date, setDate] = useState(moment());

  const tick = () => {
    setDate(moment());
  };

  useEffect(() => {
    const timerID = setInterval(
      () => tick(),
      1000
    );

    return () => {
      clearInterval(timerID);
    };
  });

  const [{ opacity }, dragRef] = useDrag({
    item: { type: Types.LIST, id },
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        return
      }

      // When dropped on a compatible target, do something
      const dropResult = monitor.getDropResult()

      onTaskListDrop(item.id, dropResult.id);
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [form] = Form.useForm();

  useEffect(() => {
    // Synchronize initialTasks update manually, 'cause form ignores it by default
    form.setFieldsValue({ tasks: initialTasks });
  });

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

  return (
    <div className="TaskList" ref={dragRef} style={{ opacity }}>
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
                      expired={checkIsDateExpired(date, initialTasks, index)}
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
