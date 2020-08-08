import React from 'react';
import { v4 as uuid } from 'uuid';

import { Form, TimePicker, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const TIME_FORMAT = "HH:mm";

const TaskPanel = () => {
  const generateID = (index) => uuid();

  const onFinish = ({ tasks }) => {};

  return (
    <div className="TaskPanel">
      <Form
        name="task-panel-form"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.List name="tasks">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
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
                      initialValue={generateID(index)}
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

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    block
                  >
                    <PlusOutlined /> Add task
                  </Button>
                </Form.Item>
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

export default TaskPanel;
