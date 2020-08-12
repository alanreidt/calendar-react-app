import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Task from '../Task/Task';

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

  const getID = (index) => initialValues && initialValues.id;

  return (
    <div className="TaskPanel">
      <Form
        name="task-panel-form"
        form={form}
        onFinish={handleFinish}
        initialValues={initialValues}
        autoComplete="off"
      >
        <Task
          id={getID()}
          button={
            <PlusOutlined
              onClick={handleAddButtonClick}
            />
          }
        />
        <Form.Item hidden>
          <Button
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TaskPanel;
