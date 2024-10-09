import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Layout, Typography, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const AddAircraftContent = () => {
  const [form] = Form.useForm();
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/model/models');
      setModels(response.data);
      console.log(response.data);
    } catch (error) {
      message.error('Failed to fetch models');
    }
  };

  const onFinish = async (values) => {
    try {
      console.log(values);
      await axios.post('http://localhost:3001/api/aircraft/create-aircraft', values);
      message.success('Aircraft added successfully');
      form.resetFields();
    } catch (error) {
      message.error('Failed to add aircraft');
    }
  };

  return (
    <Layout className="min-h-screen bg-white">
      <Header className="bg-black p-4">
        <Title level={2} className="text-white m-0">Airline Admin Dashboard</Title>
      </Header>
      <Content className="p-6">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
          <Title level={3} className="mb-6">Add New Aircraft</Title>
          <Form
            form={form}
            name="add_aircraft"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item name="aircraft_id" label="Aircraft ID" rules={[{ required: true }]}>
              <Input placeholder="Enter an aircraft id (AA380-001, BA737-003, BA757-002)"/>
            </Form.Item>
            <Form.Item name="model" label="Model" rules={[{ required: true }]}>
              <Select placeholder="Select a model">
                {models.map(model => (
                  <Option key={model.model} value={model.model}>
                    {model.model}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />} className="bg-black text-white hover:bg-gray-800">
                Add Aircraft
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default AddAircraftContent;