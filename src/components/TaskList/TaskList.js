import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';

import { Form, TimePicker, Input, Button, Space } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

const TIME_FORMAT = "HH:mm";
const Types = {
  LIST: 'list',
};

const TaskList = ({ initialTasks = [], handleTaskListFinish, handleTaskListDrop, id }) => {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: Types.LIST, id },
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        return
      }

      // When dropped on a compatible target, do something
      const dropResult = monitor.getDropResult()

      handleTaskListDrop(item.id, dropResult.id);
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ tasks: initialTasks });
  });

  const getID = (index) => initialTasks[index] && initialTasks[index].id;

  const onFinish = ({ tasks }) => {
    const sortedTasks = tasks.sort((a, b) => a.date - b.date);

    handleTaskListFinish(sortedTasks, id);
  };

  return (
    <div className="TaskList" ref={dragRef} style={{ opacity }}>
      <Form
        form={form}
        name="task-list-form"
        initialValues={{ tasks: initialTasks }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.List name="tasks">
          {(fields, { remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Space key={getID(index)} style={{ display: 'flex', marginBottom: 8 }} align="start">
                    <Form.Item
                      {...field}
                      name={[field.name, 'date']}
                      fieldKey={[field.fieldKey, 'date']}
                      rules={[{ required: true, message: 'Missing a task date' }]}
                    >
                      <TimePicker placeholder={TIME_FORMAT} format={TIME_FORMAT} />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'name']}
                      fieldKey={[field.fieldKey, 'name']}
                      rules={[{ required: true, message: 'Missing a task name' }]}
                    >
                      <Input placeholder="Введите задачу" allowClear />
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
                        remove(field.name);
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
