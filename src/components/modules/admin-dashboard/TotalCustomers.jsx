import React, { useState, useEffect } from 'react';
import Axios from 'axios'

const TotalCustomersComponent = () => {
  const [totalCustomers, setTotalCustomers] = useState([]);

  useEffect(()=>{ //retrieves total customers 
    Axios.get("http://localhost:3001/order/customers")
    .then((response)=>{
      if(response.err){
        console.log(response.err)
      }else{
        setTotalCustomers(response.data);
        console.log(response.data)
      }
    })
  },[])

  return (
    <div>
      <h1>Total Customers</h1>
      <p>{totalCustomers.length}</p>
    </div>
  );
};

export default TotalCustomersComponent;
