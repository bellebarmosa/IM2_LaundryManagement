import React, { useState, useEffect } from 'react';
import Axios from 'axios'

const TotalServicesComponent = () => {
  const [totalServices, setTotalServices] = useState([]);
  const [counter,setCounter] = useState(0);

  useEffect(()=>{ //retrieve services
    Axios.get("http://localhost:3001/order/services")
    .then((response)=>{
      if(response.err){
        console.log(response.err)
      }else{
        setTotalServices(response.data);
      }
    })
  },[])

  console.log(totalServices);
  return (
    <>{totalServices.length}
    </>
  );
};

export default TotalServicesComponent;
