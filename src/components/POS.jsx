import React from 'react';
import { Menu, Button, Space, Divider, Table, Tag, Row, Col } from 'antd';
import { PoweroffOutlined, DownOutlined } from '@ant-design/icons';

const data = [
 {
    key: '1',
    name: 'K Jeans',
    rate: '10.26',
    quantity: '1',
    service: 'Wash',
 },
 // Add more items here...
];

const columns = [
 {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
 },
 {
    title: 'Rate',
    dataIndex: 'rate',
    key: 'rate',
 },
 {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
 },
 {
    title: 'Service',
    dataIndex: 'service',
    key: 'service',
 },
];

const POS = () => {
    return ( 
        <div className="pos">
        <Row>
          <Col span={24}>
            <Space>
              <Menu mode="horizontal">
                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2">Service</Menu.Item>
                <Menu.Item key="3">Orders</Menu.Item>
              </Menu>
              <Button type="primary" shape="round">
                New Order
              </Button>
              <Button type="primary" shape="round">
                New Service
              </Button>
              <Button type="primary" shape="round">
                New Addon
              </Button>
              <Button type="primary" shape="round">
                New Coupon
              </Button>
              <Button type="primary" shape="round">
                Logout <PoweroffOutlined />
              </Button>
            </Space>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table dataSource={data} columns={columns} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Divider />
            <Space>
              <Button type="primary" shape="round">
                Update Order
              </Button>
              <Button type="primary" shape="round">
                Update Service
              </Button>
              <Button type="primary" shape="round">
                Update Addon
              </Button>
              <Button type="primary" shape="round">
                Update Coupon
              </Button>
              <Button type="primary" shape="round">
                Payment →
              </Button>
              <Button type="primary" shape="round">
                Clear All
              </Button>
            </Space>
          </Col>
        </Row>
      </div>
     );
}
 
export default POS;