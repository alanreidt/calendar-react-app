import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import moment from 'moment';

import { Form, TimePicker, Input, Button, Space } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

const TIME_FORMAT = "HH:mm";
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

  const getID = (index) => initialTasks[index] && initialTasks[index].id;

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

  const checkIsExpired = (index) => initialTasks[index].date < date;
  const composeFormControlClassName = (index) => (
    `form-control ${checkIsExpired(index) ? 'form-control_expired' : ''}`
  );

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
                {fields.map((field, index) => (
                  <Space key={getID(index)} data-flip-id={`id-${getID(index)}`} style={{ display: 'flex', marginBottom: 8 }} align="start">
                    <Form.Item
                      {...field}
                      name={[field.name, 'date']}
                      fieldKey={[field.fieldKey, 'date']}
                      rules={[{ required: true, message: 'Missing a task date' }]}
                    >
                      <TimePicker className={composeFormControlClassName(index)} placeholder={TIME_FORMAT} format={TIME_FORMAT} />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'name']}
                      fieldKey={[field.fieldKey, 'name']}
                      rules={[{ required: true, message: 'Missing a task name' }]}
                    >
                      <Input className={composeFormControlClassName(index)} placeholder="Введите задачу" allowClear />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'id']}
                      fieldKey={[field.fieldKey, 'id']}
                      hidden
                    >
                      <Input />
                    </Form.Item>

                    <MinusCircleOutlined
                      onClick={() => {
                        handleRemove(field.name, remove);
                      }}
                    />
                  </Space>
                ))}
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
