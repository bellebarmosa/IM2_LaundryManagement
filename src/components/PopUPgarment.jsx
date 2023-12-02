import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './popUP.css';

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

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        {/* <button className="close-btn" onClick={() => props.setOpen(false)}>
          CLOSE
        </button> */}
        <div className="clothes-container">
          {garments && garments.map((garmentsItem) => (
            <div className="clothes" key={garmentsItem.garment_ID} onClick={() => garmentClick(garmentsItem)}>
              <h2>{garmentsItem.garment_name}</h2>
            </div>
          ))}
        </div>
        <button className="btn" onClick={props.addService}>
          Confirm
        </button>
      </div>

      <div className="cart-container">
        <h3>Garment Cart Contents:</h3>
        <table className="greyGridTable">
          <thead>
            <tr>
              <th>Garment</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {props.orderCart.map((garmentSelected, index) => (
              <tr key={index}>
                <td>{garmentSelected.garment_name}</td>
                <td>
                  <input
                    type="number"
                    value={garmentSelected.quantity}
                    onChange={(e) => handleQuantityChange(index, e)}
                  />
                </td>
                <td>
                <button onClick={() => handleDeleteGarment(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : '';
};

export default PopUPgarment;
