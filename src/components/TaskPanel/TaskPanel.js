import React from 'react';
import { v4 as uuid } from 'uuid';

import { Form, TimePicker, Input, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const TIME_FORMAT = "HH:mm";

const TaskPanel = () => {
  const generateID = (index) => uuid();

  const onFinish = () => {};

  return (
    <div className="TaskPanel">
      <Form
        name="task-panel-form"
        onFinish={onFinish}
        initialValues={{
          date: '',
          name: '',
          id: generateID(),
        }}
        autoComplete="off"
      >
        <Space>
          <Space>
            <Form.Item
              name="date"
              rules={[{ required: true, message: 'Missing a task date' }]}
            >
              <TimePicker placeholder={TIME_FORMAT} format={TIME_FORMAT} />
            </Form.Item>
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Missing a task name' }]}
            >
              <Input placeholder="Введите задачу" allowClear />
            </Form.Item>
            <Form.Item
              name="id"
              hidden
            >
              <Input />
            </Form.Item>
          </Space>

          <Form.Item>
            <Button
              type="dashed"
            >
              <PlusOutlined /> Add task
            </Button>
          </Form.Item>

          <Form.Item hidden>
            <Button
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </div>
  );
};

export default TaskPanel;
