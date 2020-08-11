import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { v4 as uuid } from 'uuid';

import { Form, TimePicker, Input, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const TIME_FORMAT = "HH:mm";

const TaskPanel = ({ id, onTaskPanelFinish }) => {
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
    onTaskPanelFinish(newTask, id);

    form.setFieldsValue(initialValues);

    setShown(false);
  };

  const props = useSpring({
    x: 50,
    from: { x: 0 }
  });
  const AnimatedButton = animated(Button);

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
            <AnimatedButton
              style={{
                transform: props.x.interpolate(x => `translate3d(${x}%, 0, 0)`)
              }}
              type="dashed"
              onClick={handleAddButtonClick}
            >
              <PlusOutlined /> Add task
            </AnimatedButton>
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
