import React from 'react';
import { v4 as uuid } from 'uuid';

import { Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Task from '../Task/Task';

const generateID = (index) => uuid();

const TaskPanel = ({ id, onTaskPanelFinish }) => {
  const [form] = Form.useForm();
  const handleFinish = ({ tasks }) => {
    const newTask = tasks[0];
    console.log(newTask);

    onTaskPanelFinish(newTask, id);

    form.resetFields();
  };

  return (
    <div className="TaskPanel">
      <Form
        form={form}
        name="task-panel-form"
        onFinish={handleFinish}
        autoComplete="off"
      >
        <Form.List name="tasks">
          {(fields, { add }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Task
                    key={generateID(index)}
                    id={generateID(index)}
                    index={index}
                    button={
                      <Form.Item>
                        <Button htmlType="submit">
                          <PlusOutlined />
                        </Button>
                      </Form.Item>
                    }
                  />
                ))}

                {fields.length <= 0 &&
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      block
                    >
                      <PlusOutlined /> Add field
                    </Button>
                  </Form.Item>
                }
              </div>
            );
          }}
        </Form.List>
      </Form>
    </div>
  );
};

export default TaskPanel;
