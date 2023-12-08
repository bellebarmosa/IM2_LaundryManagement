import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const TotalOrdersComponent = () => {
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(()=>{ //retrieves total orders of the day
    Axios.get("http://localhost:3001/order/totalorders")
    .then((response)=>{
      if(response.err){
        console.log(response.err)
      }else{
        setTotalOrders(response.data[0].TotalOrders);
        console.log(response.data)
      }
    })
  },[])
  
  return (
    <>{totalOrders}</>
     
  );
};

export default TotalOrdersComponent;
