import { useEffect, useState } from 'react';
import Axios from 'axios';
import './popUP.css';
import { Button, Table, Row, Col } from 'antd';
//import 'antd/dist/antd.css';

const PopUPservice = (props) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Retrieve data services
    Axios.get('http://localhost:3001/order/services')
      .then((response) => {
        if (response.err) {
          console.log(response.err);
        } else {
          setServices(response.data);
        }
      });
  }, []);

  function serviceClick(serviceItem) {
    props.addService(serviceItem);
    props.setOpen(false);
  }
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <Row gutter={16} className="services-container">
          {services && services.map((serviceItem) => (
            <Col span={6} key={serviceItem.service_ID} onClick={() => serviceClick(serviceItem)}>
              <h2>{serviceItem.service_name}</h2>
            </Col>
          ))}
        </Row>
        <Button className="btn" onClick={() => props.setOpen(false)}>
          Confirm
        </Button>
      </div>
    </div>
  ) : '';
};

export default PopUPservice;