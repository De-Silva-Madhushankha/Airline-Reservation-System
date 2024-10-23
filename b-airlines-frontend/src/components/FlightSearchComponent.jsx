import React, { useState } from "react";
import { Layout, Button, message, DatePicker, Select, Row, Col, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import "./FlightSearchComponent.css";
import dayjs from "dayjs";

const { Content } = Layout;
const { Option } = Select;
const { RangePicker } = DatePicker;

const FlightSearch = ({ onSearch }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const disabledDate = (current) => {
    return current && current < dayjs().startOf('day');
  };

  const handleSearch = async (values) => {
    setLoading(true);

    values.dates = values.dates.map(date => dayjs(date).format("YYYY-MM-DD"));
    console.log("Search values: ", values);

    try {
      const response = await axios.post('http://localhost:3001/api/flight/flight-search', values);
      console.log("Search results: ", response.data);
      message.success("Flights found!");

      onSearch(response.data.flights);

    } catch (error) {
      console.error("Error fetching flights: ", error);
      message.error("Error fetching flights");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="flight-search-layout">
      <Content className="flight-search-content">
        <div className="flight-search-background">
          <h1 className="title">Flight Schedules</h1>
          <p className="subtitle">
            Search our schedules to find a flight time that works for you.
          </p>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSearch}
            className="flight-search-form"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="origin"
                  label="Departure airport"
                  rules={[{ required: true, message: "Please select departure airport" }]}
                >
                  <Select placeholder="Select Departure" size="large">
                    <Option value="BIA">Colombo (BIA)</Option>
                    <Option value="BKK">Bankok (BKK)</Option>
                    <Option value="BOM">Mumbai (BOM)</Option>
                    <Option value="CGK">Jakarta (CGK)</Option>
                    <Option value="DEL">Delhi (DEL)</Option>
                    <Option value="DMK">Don Mueang (DMK)</Option>
                    <Option value="DPS">Kuta (DPS)</Option>
                    <Option value="HRI">Mattala (HRI)</Option>
                    <Option value="MAA">Chennai (MAA)</Option>
                    <Option value="SIN">Singapore (SIN)</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  name="destination"
                  label="Arrival airport"
                  rules={[{ required: true, message: "Please select arrival airport" }]}
                >
                  <Select placeholder="Select Arrival" size="large">
                    <Option value="BIA">Colombo (BIA)</Option>
                    <Option value="BKK">Bankok (BKK)</Option>
                    <Option value="BOM">Mumbai (BOM)</Option>
                    <Option value="CGK">Jakarta (CGK)</Option>
                    <Option value="DEL">Delhi (DEL)</Option>
                    <Option value="DMK">Don Mueang (DMK)</Option>
                    <Option value="DPS">Kuta (DPS)</Option>
                    <Option value="HRI">Mattala (HRI)</Option>
                    <Option value="MAA">Chennai (MAA)</Option>
                    <Option value="SIN">Singapore (SIN)</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <Form.Item
                  name="dates"
                  label="Departing - Returning"
                  rules={[{ required: true, message: "Please select travel dates" }]}
                  

                >
                  <RangePicker size="large" style={{ width: "100%" }} disabledDate={disabledDate}/>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col xs={24}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  size="large"
                  block
                  className="search-btn"
                  loading={loading}
                >
                  Search Flights
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default FlightSearch;


// import React, { useState } from "react";
// import {
//     Layout,
//     Button,
//     message,
//     DatePicker,
//     Select,
//     Row,
//     Col,
//     Form,
// } from "antd";
// import { SearchOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import "./FlightSearchComponent.css";
// import axios from "axios";

// const { Content } = Layout;
// const { Option } = Select;
// const { RangePicker } = DatePicker;

// const FlightSearch = () => {
//     const [form] = Form.useForm();
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleSearch = async (values) => {
//         setLoading(true);
//         console.log("Search values: ", values);
//         try {
//           const response = await axios.post('http://localhost:3001/api/flight/flight-search', values);
//           console.log("Search results: ", response.data);
//         //   console.log("Search results: ", response.data.flights);
//           message.success("Flights found!");
//           navigate("/schedule/flight-schedules", { state: { flights: response.data.flights } });
//         } catch (error) {
//           console.error("Error fetching flights: ", error);
//           message.error("Error fetching flights");
//         } finally {
//           setLoading(false);
//         }
//       };

//     return (
//         <Layout className="flight-search-layout">
//             <Content className="flight-search-content">
//                 <div className="flight-search-background">
//                     <h1 className="title" >Flight Schedules</h1>
//                     <p className="subtitle">
//                         Search our schedules to find a
//                         flight time that works for you.
//                     </p>

//                     <Form
//                         form={form}
//                         layout="vertical"
//                         onFinish={handleSearch}
//                         className="flight-search-form"
//                     >
//                         <Row gutter={[16, 16]}>
//                             <Col xs={24} sm={12}>
//                                 <Form.Item
//                                     name="origin"
//                                     label="Departure airport"
//                                     rules={[{ required: true, message: "Please select departure airport" }]}
//                                 >
//                                     <Select placeholder="Select Departure" size="large">
//                                         <Option value="BIA">Colombo (BIA)</Option>
//                                         <Option value="BKK">Bankok (BKK)</Option>
//                                         <Option value="BOM">Mumbai (BOM)</Option>
//                                         <Option value="CGK">Jakarta (CGK)</Option>
//                                         <Option value="DEL">Delhi (DEL)</Option>
//                                         <Option value="DMK">Don Mueang (DMK)</Option>
//                                         <Option value="DPS">Kuta (DPS)</Option>
//                                         <Option value="HRI">Mattala (HRI)</Option>
//                                         <Option value="MAA">Chennai (MAA)</Option>
//                                         <Option value="SIN">Singapore (SIN)</Option>
//                                     </Select>
//                                 </Form.Item>
//                             </Col>

//                             <Col xs={24} sm={12}>
//                                 <Form.Item
//                                     name="destination"
//                                     label="Arrival airport"
//                                     rules={[{ required: true, message: "Please select arrival airport" }]}
//                                 >
//                                     <Select placeholder="Select Arrival" size="large">
//                                     <Option value="BIA">Colombo (BIA)</Option>
//                                         <Option value="BKK">Bankok (BKK)</Option>
//                                         <Option value="BOM">Mumbai (BOM)</Option>
//                                         <Option value="CGK">Jakarta (CGK)</Option>
//                                         <Option value="DEL">Delhi (DEL)</Option>
//                                         <Option value="DMK">Don Mueang (DMK)</Option>
//                                         <Option value="DPS">Kuta (DPS)</Option>
//                                         <Option value="HRI">Mattala (HRI)</Option>
//                                         <Option value="MAA">Chennai (MAA)</Option>
//                                         <Option value="SIN">Singapore (SIN)</Option>
//                                     </Select>
//                                 </Form.Item>
//                             </Col>
//                         </Row>

//                         <Row gutter={[16, 16]}>
//                             <Col xs={24}>
//                                 <Form.Item
//                                     name="dates"
//                                     label="Departing - Returning"
//                                     rules={[{ required: true, message: "Please select travel dates" }]}
//                                 >
//                                     <cker size="large" style={{ width: "100%" }} />
//                                 </Form.Item>
//                             </Col>
//                         </Row>

//                         <Row>
//                             <Col xs={24}>
//                                 <Button
//                                     type="primary"
//                                     htmlType="submit"
//                                     icon={<SearchOutlined />}
//                                     size="large"
//                                     block
//                                     className="search-btn"
//                                 >
//                                     Search Flights
//                                 </Button>
//                             </Col>
//                         </Row>
//                     </Form>
//                 </div>
//             </Content>
//         </Layout>
//     );
// };

// export default FlightSearch;

