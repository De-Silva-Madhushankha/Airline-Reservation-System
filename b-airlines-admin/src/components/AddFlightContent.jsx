import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Button, Select, Layout, Typography, message, Table, Modal, Switch, Space, Tag } from 'antd';
import { PlusOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import axios from '../axiosConfig.js';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const { Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const AddFlightContent = () => {
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [routes, setRoutes] = useState([]);
  const [aircraft, setAircraft] = useState([]);
  const [flights, setFlights] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);

  useEffect(() => {
    fetchRoutes();
    fetchAircraft();
    fetchFlights();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await axios.get('/route/routes');
      setRoutes(response.data);
      console.log(response.data);
    } catch (error) {
      message.error('Failed to fetch routes');
    }
  };

  const fetchAircraft = async () => {
    try {
      const response = await axios.get('/admin/aircrafts');
      setAircraft(response.data);
      console.log(response.data);
    } catch (error) {
      message.error('Failed to fetch aircraft');
    }
  };

  const fetchFlights = async () => {
    try {
      const response = await axios.get('/flight/flights');
      setFlights(response.data);
      console.log(response.data);
    } catch (error) {
      message.error('Failed to fetch flights');
    }
  };

  const checkForConflicts = (flightData) => {
    const { aircraft_id, departure, arrival } = flightData;
    const departureTime = dayjs(departure);
    const arrivalTime = dayjs(arrival);

    for (const flight of flights) {
      if (flight.aircraft_id === aircraft_id) {
        const existingDeparture = dayjs(flight.departure);
        const existingArrival = dayjs(flight.arrival);

        if (
          (departureTime.isBetween(existingDeparture, existingArrival, null, '[)') ||
          arrivalTime.isBetween(existingDeparture, existingArrival, null, '(]')) ||
          (existingDeparture.isBetween(departureTime, arrivalTime, null, '[)') ||
          existingArrival.isBetween(departureTime, arrivalTime, null, '(]'))
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const onFinish = async (values) => {
    const flightData = {
      ...values,
      departure: dayjs(values.departure).format('YYYY-MM-DD HH:mm:ss'),
      arrival: dayjs(values.arrival).format('YYYY-MM-DD HH:mm:ss'),
      delay: false, 
    };

    console.log(dayjs(values.departure).format('YYYY-MM-DD HH:mm:ss'))

    if (checkForConflicts(flightData)) {
      message.error('Conflict detected: The aircraft is already scheduled for another flight during this time.');
      return;
    }

    try {
      console.log(flightData);
      await axios.post('/flight/create-flight', flightData);
      message.success('Flight added successfully');
      form.resetFields();
      fetchFlights(); 
    } catch (error) {
      message.error('Failed to add flight');
    }
  };

  const onEditFinish = async (values) => {
    const flightData = {
      ...values,
      departure: dayjs(values.departure).format('YYYY-MM-DD HH:mm:ss'),
      arrival: dayjs(values.arrival).format('YYYY-MM-DD HH:mm:ss'),
      delay: values.delay || false, 
    };

    if (!flightData.delay && checkForConflicts(flightData)) {
      message.error('Conflict detected: The aircraft is already scheduled for another flight during this time.');
      return;
    }

    try {
      console.log(flightData);
      await axios.put(`/flight/update-flight/${selectedFlight.flight_id}`, flightData);
      message.success('Flight updated successfully');
      setIsModalVisible(false);
      fetchFlights(); 
    } catch (error) {
      message.error('Failed to update flight');
    }
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf('day');
  };

  const handleEditClick = (record) => {
    if (dayjs(record.departure).isBefore(dayjs())) {
      message.error('Cannot edit past flights');
      return;
    }
    setSelectedFlight(record);
    editForm.setFieldsValue({
      ...record,
      departure: dayjs(record.departure),
      arrival: dayjs(record.arrival),
      delay: record.delay,
    });
    setIsModalVisible(true);
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const columns = [
    {
      title: 'Flight Number',
      dataIndex: 'flight_id',
      key: 'flight_id',
    },
    {
      title: 'Route',
      dataIndex: 'route_id',
      key: 'route_id',
    },
    {
      title: 'Aircraft',
      dataIndex: 'aircraft_id',
      key: 'aircraft_id',
    },
    {
      title: 'Departure',
      dataIndex: 'departure',
      key: 'departure',
      render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Arrival',
      dataIndex: 'arrival',
      key: 'arrival',
      render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Delay',
      dataIndex: 'delay',
      key: 'delay',
      render: (text) => (
        <Tag color={text ? 'red' : 'green'}>
          {text ? 'Delayed' : 'On Time'}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button icon={<EditOutlined />} onClick={() => handleEditClick(record)} disabled={dayjs(record.departure).isBefore(dayjs())}>
          Edit
        </Button>
      ),
    },
  ];

  const filteredFlights = flights.filter(flight => {
    if (!dateRange[0] || !dateRange[1]) return true;
    const departureDate = dayjs(flight.departure);
    return departureDate.isSame(dateRange[0], 'day') || departureDate.isSame(dateRange[1], 'day') || (departureDate.isAfter(dateRange[0]) && departureDate.isBefore(dateRange[1]));
  });

  const upcomingFlights = filteredFlights.filter(flight => dayjs(flight.departure).isAfter(dayjs()));
  const pastFlights = filteredFlights.filter(flight => dayjs(flight.departure).isBefore(dayjs()));

  return (
    <Layout className="min-h-screen bg-white">
      <Header className="bg-black p-4">
        <Title level={2} className="text-white m-0">Airline Admin Dashboard</Title>
      </Header>
      <Content className="p-6">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md mb-6">
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
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md mb-6">
          <Title level={3} className="mb-6">Search Flights</Title>
          <Space direction="vertical" size="large" className="w-full">
            <RangePicker onChange={handleDateRangeChange} className="w-full" />
            <Button type="primary" icon={<SearchOutlined />} onClick={fetchFlights} className="bg-black text-white hover:bg-gray-800">
              Search
            </Button>
          </Space>
        </div>
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md mb-6">
          <Title level={3} className="mb-6">Upcoming Flights</Title>
          <Table columns={columns} dataSource={upcomingFlights} rowKey="flight_id" />
        </div>
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
          <Title level={3} className="mb-6">Past Flights</Title>
          <Table columns={columns} dataSource={pastFlights} rowKey="flight_id" pagination={{ pageSize: 10 }} />
        </div>
        <Modal
          title="Edit Flight"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={800}
        >
          <Form
            form={editForm}
            name="edit_flight"
            onFinish={onEditFinish}
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
            <Form.Item name="delay" label="Delay" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="bg-black text-white hover:bg-gray-800">
                Update Flight
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default AddFlightContent;