import React from 'react';
import { Form, TimePicker, Input, Space } from 'antd';

const TIME_FORMAT = "HH:mm";

const Task = ({ id, index, expired = false, button = null }) => {
  const generateName = (name) => index !== undefined ? [index, name] : name;
  const formControlClassName = `form-control ${expired ? 'form-control_expired' : ''}`;

  return (
    <Space data-flip-id={`id-${id}`} style={{ display: 'flex', marginBottom: 8 }} align="start">
      <Form.Item
        name={generateName('date')}
        rules={[{ required: true, message: 'Missing a task date' }]}
      >
        <TimePicker className={formControlClassName} placeholder={TIME_FORMAT} format={TIME_FORMAT} />
      </Form.Item>
      <Form.Item
        name={generateName('name')}
        rules={[{ required: true, message: 'Missing a task name' }]}
      >
        <Input className={formControlClassName} placeholder="Введите задачу" allowClear />
      </Form.Item>
      <Form.Item
        name={generateName('id')}
        hidden
      >
        <Input />
      </Form.Item>

      {button}
    </Space>
  );
}

export default Task;
