import React, { useState, useEffect } from 'react';
import Axios from 'axios'

const TotalSalesComponent = () => {
  const [totalSales, setTotalSales] = useState(0);

  useEffect(()=>{// it retrieves the total sales
    Axios.get("http://localhost:3001/user/totalsales")
    .then((response)=>{
      if(response.err){
        console.log(response.err)
      }else{
        if(response.data[0].totalsales === null){
          setTotalSales(0)
          return;
        }
         setTotalSales(response.data[0].totalsales);
        console.log(response.data[0].totalsales)
      } })

    },[])

    // useEffect(() => {
    //   // Fetch total sales from the backend
    //   fetch('http://localhost:3001/totalsales')
    //     .then((response) => response.json())
    //     .then((data) => setTotalSales(data.totalSales))
    //     .catch((error) => console.error('Error:', error));
    // }, []);


  return (
    <>{`$${totalSales.toFixed(2)}`}</>
  );
};

export default TotalSalesComponent;
