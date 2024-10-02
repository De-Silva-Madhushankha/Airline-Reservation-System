import React from 'react';
import { Typography, Collapse, List } from 'antd';
import { PhoneOutlined, MailOutlined, RightOutlined } from '@ant-design/icons';
import './HelpPage.css';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const HelpPage = () => {
    const faqData = [
        {
            question: "How do I book a flight?",
            answer: "To book a flight, use our search tool to find available flights, select your preferred option, fill in passenger details, and complete the payment process."
        },
        {
            question: "Can I change or cancel my reservation?",
            answer: "Yes, you can change or cancel your reservation through your account page. Please note that fees may apply depending on your ticket type and how close to the departure date you make changes."
        },
        {
            question: "What's your baggage policy?",
            answer: "Our baggage policy varies depending on your ticket type and destination. Generally, you're allowed one carry-on bag and one personal item. Check your specific flight details for more information."
        },
        {
            question: "How do I check in for my flight?",
            answer: "You can check in online through our website or mobile app starting 24 hours before your flight departure. You can also check in at the airport using our self-service kiosks or at the check-in counter."
        },
    ];

    return (
        <>
            <Navbar />

            <div className="help-container">
                <Title level={2} className="help-title">Help Center</Title>
                <Paragraph className="help-description" >
                    Find answers to common questions or contact our support team.
                </Paragraph>

                <div className="faq-section">
                    <Collapse
                        bordered={false}
                        expandIcon={({ isActive }) => <RightOutlined rotate={isActive ? 90 : 0} />}
                        expandIconPosition="end"
                    >
                        {faqData.map((faq, index) => (
                            <Panel header={faq.question} key={index}>
                                <Paragraph>{faq.answer}</Paragraph>
                            </Panel>
                        ))}
                    </Collapse>
                </div>

                <div className="contact-section">
                    <Title level={3} className="contact-title">Contact Us</Title>
                    <List
                        className="contact-list"
                        itemLayout="horizontal"
                        dataSource={[
                            {
                                title: 'Customer Service',
                                description: 'Available 24/7',
                                icon: <PhoneOutlined />,
                                content: '+94 704424913'
                            },
                            {
                                title: 'Email Support',
                                description: 'Response within 24 hours',
                                icon: <MailOutlined />,
                                content: 'support@bairways.com'
                            }
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<div className="contact-icon">{item.icon}</div>}
                                    title={item.title}
                                    description={item.description}
                                />
                                <div className="contact-info">{item.content}</div>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
            <Footer />
        </>

    );

};

export default HelpPage;