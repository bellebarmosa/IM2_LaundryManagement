import React, { useState, useEffect } from 'react';
import Axios from 'axios'

const TotalServicesComponent = () => {
  const [totalServices, setTotalServices] = useState([]);
  const [counter,setCounter] = useState(0);

  useEffect(()=>{ //retrieve services
    Axios.get("http://localhost:3001/order/services")
    .then((response)=>{
      if(response.err){
      }else{
        setTotalServices(response.data);
      }
    })
  },[])

  console.log(totalServices);
  return (
    <div>
      <h1>Total Services</h1>
      <p>{totalServices.length}</p> 
      {/* {totalServices && totalServices.map(service=>(
        <h2>{counter}</h2>
      ))} */}
    </div>
  );
};

export default TotalServicesComponent;
