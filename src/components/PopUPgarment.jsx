import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './popUP.css';
import { Button, Table, Input, Row, Col } from 'antd';
//import 'antd/dist/antd.css';

const PopUPgarment = (props) => {
  const [garments, setGarments] = useState([]);

  useEffect(() => {
    // Retrieve data garments
    Axios.get('http://localhost:3001/order/garments')
      .then((response) => {
        if (response.err) {
          console.log(response.err);
        } else {
          setGarments(response.data);
        }
      });
  }, []);

  function garmentClick(garmentsItem) {
    props.addGarment(garmentsItem);
  }

  function handleQuantityChange(index, event) {
    const newQuantity = event.target.value;
    const updatedorderCart = [...props.orderCart];
    updatedorderCart[index].quantity = newQuantity;
    props.setorderCart(updatedorderCart);
  }

  function handleDeleteGarment(index){
    const neworderCart = [...props.orderCart];
    neworderCart.splice(index,1);
    props.setorderCart(neworderCart);
  }
  const columns = [
    { title: 'Garment', dataIndex: 'garment_name', key: 'garment_name' },
    { title: 'Count', dataIndex: 'quantity', key: 'quantity' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record, index) => (
        <Button onClick={() => handleDeleteGarment(index)}>Delete</Button>
      ),
    },
  ];

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <Row gutter={16} className="clothes-container">
          {garments && garments.map((garmentsItem) => (
            <Col span={6} key={garmentsItem.garment_ID} onClick={() => garmentClick(garmentsItem)}>
              <h2>{garmentsItem.garment_name}</h2>
            </Col>
          ))}
        </Row>
        <Button className="btn" onClick={props.addService}>
          Confirm
        </Button>
      </div>

      <div className="cart-container">
        <h3>Garment Cart Contents:</h3>
        <Table dataSource={props.orderCart} columns={columns} />
      </div>
    </div>
  ) : '';
};
export default PopUPgarment;
