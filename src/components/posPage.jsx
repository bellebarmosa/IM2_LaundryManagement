import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Table, DatePicker, Row, Col } from 'antd';
import Axios from 'axios'
import PopUPgarment from './PopUPgarment';
import PopUPservice from './PopUPservice';
import { useNavigate } from "react-router-dom";


//TO DO
//ADD MIDDLEWARE TO PROTECT ROUTES
//REDO USER AUTH DO JWT
// I didnt do the ADD ORDER in AdminOrders kay it should just be in the pos page
//




const PosPage = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [services,setwServices] = useState ([]);
    const [open,setOpen] = useState (false);
    const [openServices,setOpenServices]  = useState (false);
    const [orderCart,setorderCart] = useState([]);
    const [serviceCart,setServiceCart] = useState([]);
    const [savedService,setsavedService] = useState();
    const [savedGarment,setsavedGarment] = useState();
    const [garments, setGarments] = useState([]);
    const [customers,setCustomers] = useState([]);
    const [selectedCus,setSelectedCus] = useState(null);
    const [total, setTotal] = useState(0);
    const [pickUpDate,setPickUpDate] = useState('');
    const [paidAmount,setPaidAmount] = useState(0);
    const [change,setChange]= useState(0);
    const [toEdit,setToEdit] = useState(null);
    const [charge,setCharge] = useState();

    const [isToggleOn, setToggleOn] = useState(false);

    const { Option } = Select;

    //CHANGE THE VIEW IN LINK TO WHERE IT TAKE YOU TO ORDERDETAILS

    Axios.defaults.withCredentials = true;

///////////////////////////////////////////////////
useEffect(() => {
  const checkToken = async () => {
    try {
      // 
      const response = await Axios.get('http://localhost:3001/user/profile', { withCredentials: true });
      if (response.data.user) {
        // Token exists, set user type and navbar data
        setUser(response.data.user);
      }
      console.log(response.data.user)
    } catch (error) {
      console.error('Token check error:', error);
    }
  };
  checkToken();
 }, []);

    useEffect(()=>{ //retrieve services
      Axios.get("http://localhost:3001/order/services")
      .then((response)=>{
        if(response.err){
          console.log(response.err)
        }else{
          
          setwServices(response.data);
        }
      })
    },[])

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
  

    useEffect(()=>{
      Axios.get('http://localhost:3001/order/customers')
      .then((response)=>{
        if(response.err){
          console.log(response.err)
        }else{
          setCustomers(response.data);
        }
      })
    },[])

    useEffect(() => {
      // Calculate the total when serviceCart changes
      const newTotal = serviceCart.reduce((acc, ordered) => acc + ordered.amount, 0);
      setTotal(newTotal);

      console.log("Service cart:",serviceCart)
      console.log("customer:",selectedCus)
    }, [serviceCart,selectedCus]);

    useEffect(()=>{
      const newChange = (paidAmount-total);
      setChange(newChange);

      setCharge(isToggleOn ? 'Piece' : 'Weight');

    },[paidAmount,total,isToggleOn])

    useEffect(() => {
      // Calculate the total when serviceCart changes
      const newTotal = serviceCart.reduce((acc, ordered) => acc + ordered.amount, 0);
      setTotal(newTotal);
    }, [serviceCart]);
  
//////////////////////////////////////////////

    const handleDeleteService = (index) => {
      const newServiceCart = [...serviceCart];
      newServiceCart.splice(index, 1); // Remove the service at the specified index
      setServiceCart(newServiceCart);
    };


    function onServiceCLick(service) {
      setOpen(!open);
      setsavedService(service);  //to "save" what service was selected  
   
    }

    function onClothesClick(garmentItem){
      setsavedGarment(garmentItem)
      
      setOpenServices(!openServices);
    }

    function addService() {
      setOpen(!open);
      let newServiceCart = [...serviceCart];
    
      if (toEdit != null) {
        // Handle the case when editing a service at a specific index
        newServiceCart[toEdit] = {
          ...newServiceCart[toEdit],
          garmentsIn: [...orderCart], // Update garmentsIn with the new orderCart
          qty: 0,
          amount: 0,
        };
        setToEdit(null);
      } else {
        // Handle the case when adding a new service
        if (orderCart.length !== 0) {
          let newService = {
            ...savedService,
            chargePer: charge,
            garmentsIn: [...orderCart],
            qty: 0,
            amount: 0,
          };
          newServiceCart.push(newService);
        }
      }
      setToEdit(null);
      setorderCart([]); // Set it back to empty since it is now assigned to a service
      setServiceCart(newServiceCart);
    }
    
  

  function addGarment(garment) {
    console.log(garment);
    let newCart = [...orderCart]; // Copy the existing cart to avoid mutating state directly
    let found = false;
  
    newCart.forEach((clothing, index) => {
      if (clothing.garment_ID === garment.garment_ID) {
        newCart[index] = {
          ...clothing,
          quantity: clothing.quantity + 1
        };
        found = true;
      }
    });
  
    if (!found) {
      let addingGarment = {
        ...garment,
        quantity: 1
      };
      newCart.push(addingGarment);
    }
  
    setorderCart(newCart);
    console.log(newCart);


  }

  function handleQtyChange(index, event) {
    const newQty = parseFloat(event.target.value);
    const newServiceCart = [...serviceCart];
    const updatedService = {
      ...newServiceCart[index],
      qty: newQty,
      amount: calculateAmount(newServiceCart[index], newQty),
    };
    newServiceCart[index] = updatedService;
    setServiceCart(newServiceCart);
  }

  const calculateAmount = (ordered, newQty) => {
    if (ordered.chargePer === "Weight") {
      return newQty * ordered.service_price;
    } else if (ordered.chargePer === "Piece") {
      // Assuming ordered.garmentsIn has only one garment
      const garmentPrice = ordered.garmentsIn[0].price;
      return  ordered.service_price + Number(garmentPrice *newQty) ;
    }
    return 0;
  };


    function handleConfirmOrder(){ ///confirm order
      Axios.post("http://localhost:3001/order/addOrder", { 
        newOrder:serviceCart,
        customer: selectedCus,
        employee: user,
        total: total,
        order_pickUP: pickUpDate,
        order_paidAmount: paidAmount })
      .then((response)=>{
        console.log(response);
      })

    }

    function changeCustomer(e) {
      const customerId = e.target.value;
      const selectedCustomer = customers.find((cus) => cus.customer_ID === Number(customerId));
      setSelectedCus(selectedCustomer);

      console.log(selectedCus)
    }
    
    function handleEditService (index){

      setorderCart(serviceCart[index].garmentsIn);
      setToEdit(index);      
     
      setOpen(!open)
    
    };
    
    const handleToggle = () => {
      setToggleOn(!isToggleOn);
    };



  const addServiceToCart = (selectedService) => {
    // Add the selected service to the order cart
    let newServiceCart = [...serviceCart];
    let newService = {
      ...selectedService,
      chargePer: charge,
      garmentsIn: [savedGarment],
      qty: 0,
      amount: 0,
      // Add the selected service
    };
    newServiceCart.push(newService);
    setServiceCart(newServiceCart);
  };
  
    return (  
        <div className="pos">
            <h1>POS </h1>
            { user && <h1>{user.employee_name}</h1>}

            <div className={`wide-slider-container ${isToggleOn ? 'on' : 'off'}`} onClick={handleToggle}>
        <div className="toggle-label">Weight</div>
        <div className={`wide-slider-track ${isToggleOn ? 'on' : 'off'}`}>
          <div className="wide-slider-thumb"></div>
        </div>
        <div className="toggle-label">Per Piece</div>
      </div>


      <div className="wrapper">
        {isToggleOn ? (
          <Row gutter={16} className="clothes-container">
            {garments && garments.map((garmentsItem) => (
              <Col span={6} key={garmentsItem.garment_ID} onClick={() => onClothesClick(garmentsItem)}>
                <h2>{garmentsItem.garment_name}</h2>
              </Col>
            ))}
          </Row>
        ) : (
          <Row gutter={16} className="Wservice">
            {services && services.map(weightServices => (
              <Col span={6} key={weightServices.service_ID} onClick={() => onServiceCLick(weightServices)}>
                <h2>{weightServices.service_name}</h2>
              </Col>
            ))}
          </Row>
        )}


          <PopUPgarment
                trigger={open}
                setOpen={setOpen}
                addGarment={addGarment}
                addService={addService}
                orderCart={orderCart}
                setorderCart={setorderCart}/>
          </div>

          <PopUPservice
           trigger={openServices}
           setOpen={setOpenServices}
           orderCart={orderCart}
           setorderCart={setorderCart}
           addService={addServiceToCart}/>



          
          <div className="selectCustomer">
          <select value={selectedCus ? selectedCus.customer_ID : ''} onChange={changeCustomer}>
          <option value="">--Customer--</option>
            {customers &&
           customers.map((cus) => (
        <option value={cus.customer_ID} key={cus.customer_ID}>
           {cus.customer_name}
        </option>
             ))}
        </select>
        <h1>{selectedCus ? selectedCus.customer_name : ''}</h1>
        </div>



        <div className="selectDate">
          <h3>PICKUP DATE:</h3>
          <input type="date" value={pickUpDate} onChange={e=>setPickUpDate(e.target.value)}/>

          <h1>{pickUpDate}</h1>
        </div>



<div id="coursology-root" ></div>
<table className="greyGridTable">
        <thead>
          <tr>
            <th>Service</th>
            <th>ChargeBy</th>
            <th>Rate</th>
            <th>Qty/Weight</th>
            <th>amount</th>
            <th></th>
          </tr>
        </thead>
    
        <tbody>
          {serviceCart &&
            serviceCart.map((ordered, index) => (
              <tr key={index}>
                
                <td>
                  {ordered.chargePer === "Weight" ? 
                  <div className="edit-service" 
                  onClick={() => handleEditService(index)}>
                {ordered.service_name} <br /> 
                <p style={{ color: "blue" , fontSize: "15px" }}>
                [See content]
                </p>
                </div>
                  : 

                  <div className="edit-service">
                     {ordered.service_name}
                     <br />
                     <h3>
                     {ordered.garmentsIn[0].garment_name}
                     </h3>
                  </div>
                    }
               

                  
                </td>
                <td>{ordered.chargePer}</td>
                <td>{ordered.service_price}</td>
                <td>
                  <input
                    type="number"
                    placeholder={ordered.qty}
                    onChange={(event) => handleQtyChange(index, event)}
                    step="0.5"
                  />
                </td>
                <td>{ordered.amount}</td>
                <td>
                <button onClick={() => handleDeleteService(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <h3>Total: {total}</h3>
      <h3>Paid Amount: <input type="number" value={paidAmount} onChange={(e)=>setPaidAmount(e.target.value)}/></h3>
      <h3>{paidAmount}</h3>
      <h3>Change: {change}</h3>
      <button>Cancel</button>
      <button onClick={handleConfirmOrder}>Confirm</button>
      
    </div>
  );
};
 
export default PosPage;