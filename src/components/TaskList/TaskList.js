import React from 'react';

import { Form, TimePicker, Input, Button, Space, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const TIME_FORMAT = "HH:mm";

const TaskList = ({ initialTasks = [], handleFinish, id }) => {
  const [form] = Form.useForm();

  const hasOwnID = (index) => initialTasks[index] && initialTasks[index].id !== undefined;
  const getOwnID = (index) => initialTasks[index].id;
  const generateID = (index) => index + 1;
  const getID = (index) => hasOwnID(index) ? getOwnID(index) : generateID(index);

  const onFinish = ({ tasks }) => {
    const sortedTasks = tasks.sort((a, b) => a.time - b.time);

    form.setFieldsValue({ tasks: sortedTasks });
    handleFinish(sortedTasks, id);
  };

  return (
    <Form
      form={form}
      name="tasks-form"
      initialValues={{ tasks: initialTasks }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.List name="tasks">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Space key={getID(index)} style={{ display: 'flex', marginBottom: 8 }} align="start">
                  <Form.Item
                    {...field}
                    name={[field.name, 'time']}
                    fieldKey={[field.fieldKey, 'time']}
                    rules={[{ required: true, message: 'Missing a task time' }]}
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
                    initialValue={hasOwnID(index) ? undefined : generateID(index)}
                    hidden
                  >
                    <InputNumber />
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

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskList;
