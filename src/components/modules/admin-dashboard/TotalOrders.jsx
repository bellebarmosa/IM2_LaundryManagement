import React, { useState, useEffect } from 'react';

const TotalOrdersComponent = () => {
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    // Fetch total orders from the backend
    fetch('http://localhost:3001/totalorders')
      .then((response) => response.json())
      .then((data) => setTotalOrders(data.totalOrders))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Total Orders</h1>
      <p>{totalOrders}</p>
    </div>
  );
};

export default TotalOrdersComponent;
