import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Button, Select, Layout, Typography, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const AddFlightContent = () => {
  const [form] = Form.useForm();
  const [routes, setRoutes] = useState([]);
  const [aircraft, setAircraft] = useState([]);

  useEffect(() => {
    fetchRoutes();
    fetchAircraft();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/route/routes');
      setRoutes(response.data);
      console.log(response.data);
    } catch (error) {
      message.error('Failed to fetch routes');
    }
  };

  const fetchAircraft = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admin/aircrafts');
      setAircraft(response.data);
      console.log(response.data);
    } catch (error) {
      message.error('Failed to fetch aircraft');
    }
  };

  const onFinish = async (values) => {
    try {
      const flightData = {
        ...values,
        departure: dayjs(values.departure).format('YYYY-MM-DD HH:mm:ss'),
        arrival: dayjs(values.arrival).format('YYYY-MM-DD HH:mm:ss'),
        delay: false, // Default value
      };
      console.log(flightData);
      await axios.post('http://localhost:3001/api/flight/create-flight', flightData);
      message.success('Flight added successfully');
      form.resetFields();
    } catch (error) {
      message.error('Failed to add flight');
    }
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf('day');
  };

  return (
    <Layout className="min-h-screen bg-white">
      <Header className="bg-black p-4">
        <Title level={2} className="text-white m-0">Airline Admin Dashboard</Title>
      </Header>
      <Content className="p-6">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
          <Title level={3} className="mb-6">Add New Flight</Title>
          <Form
            form={form}
            name="add_flight"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item name="route_id" label="Route" rules={[{ required: true }]}>
              <Select placeholder="Select a route">
                {routes.map(route => (
                  <Option key={route.route_id} value={route.route_id}>
                    {route.origin_code} to {route.destination_code}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="aircraft_id" label="Aircraft" rules={[{ required: true }]}>
              <Select placeholder="Select an aircraft">
                {aircraft.map(a => (
                  <Option key={a.aircraft_id} value={a.aircraft_id}>
                    {a.aircraft_id} - {a.model}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="departure" label="Departure" rules={[{ required: true }]}>
              <DatePicker showTime className="w-full" disabledDate={disabledDate} />
            </Form.Item>
            <Form.Item name="arrival" label="Arrival" rules={[{ required: true }]}>
              <DatePicker showTime className="w-full" disabledDate={disabledDate} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />} className="bg-black text-white hover:bg-gray-800">
                Add Flight
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default AddFlightContent;