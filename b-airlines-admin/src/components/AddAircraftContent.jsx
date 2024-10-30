import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Layout, Typography, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from '../axiosConfig.js';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const AddAircraftContent = () => {
  const [form] = Form.useForm();
  const [modelForm] = Form.useForm();
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await axios.get('/admin/models');
      setModels(response.data);
      console.log(response.data);
    } catch (error) {
      message.error('Failed to fetch models');
    }
  };

  const onFinish = async (values) => {
    try {
      console.log(values);
      await axios.post('/aircraft/create-aircraft', values);
      message.success('Aircraft added successfully');
      form.resetFields();
    } catch (error) {
      message.error('Failed to add aircraft');
    }
  };

  const onModelFinish = async (values) => {
    try {
      console.log(values);
      await axios.post('/admin/create-model', values);
      message.success('Model added successfully');
      modelForm.resetFields();
      fetchModels(); 
    } catch (error) {
      message.error('Failed to add model');
    }
  };

  return (
    <Layout className="min-h-screen bg-white">
      <Header className="bg-black p-4">
        <Title level={2} className="text-white m-0">Airline Admin Dashboard</Title>
      </Header>
      <Content className="p-6">
        <div className="form-container max-w-3xl mx-auto bg-white p-6 rounded shadow-md mb-6">
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
        <div className="form-container max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
          <Title level={3} className="mb-6">Add New Model</Title>
          <Form
            form={modelForm}
            name="add_model"
            onFinish={onModelFinish}
            layout="vertical"
          >
            <Form.Item name="model" label="Model" rules={[{ required: true }]}>
              <Input placeholder="Enter model name (e.g., Boeing 737, Airbus A380)"/>
            </Form.Item>
            <Form.Item name="price_multiplier" label="Price Multiplier" rules={[{ required: true }]}>
              <Input type="number" step="0.01" placeholder="Enter price multiplier"/>
            </Form.Item>
            <Form.Item name="num_columns" label="Number of Columns" rules={[{ required: true }]}>
              <Input type="number" placeholder="Enter number of columns"/>
            </Form.Item>
            <Form.Item name="num_economy_rows" label="Number of Economy Rows" rules={[{ required: true }]}>
              <Input type="number" placeholder="Enter number of economy rows"/>
            </Form.Item>
            <Form.Item name="num_business_rows" label="Number of Business Rows" rules={[{ required: true }]}>
              <Input type="number" placeholder="Enter number of business rows"/>
            </Form.Item>
            <Form.Item name="num_platinum_rows" label="Number of Platinum Rows" rules={[{ required: true }]}>
              <Input type="number" placeholder="Enter number of platinum rows"/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />} className="bg-black text-white hover:bg-gray-800">
                Add Model
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default AddAircraftContent;