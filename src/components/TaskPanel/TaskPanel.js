import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Form, TimePicker, Input, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const TIME_FORMAT = "HH:mm";

const TaskPanel = () => {
  const [shown, setShown] = useState(false);

  const generateID = (index) => uuid();

  const initialValues = {
    date: '',
    name: '',
    id: generateID(),
  };

  const handleAddButtonClick = () => {
    setShown(true);
  };

  const [form] = Form.useForm();
  const handleFinish = (newTask) => {
    form.setFieldsValue(initialValues);

    setShown(false);
  };

  return (
    <div className="TaskPanel">
      <Form
        name="task-panel-form"
        form={form}
        onFinish={handleFinish}
        initialValues={initialValues}
        autoComplete="off"
      >
        <Space>
          <Space style={{ visibility: shown ? 'visible' : 'hidden' }}>
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

          <Form.Item hidden={shown}>
            <Button
              type="dashed"
              onClick={handleAddButtonClick}
            >
              <PlusOutlined /> Add task
            </Button>
          </Form.Item>

          <Form.Item hidden={!shown}>
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
