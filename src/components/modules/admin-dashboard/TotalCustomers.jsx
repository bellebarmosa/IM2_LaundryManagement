import React, { useState, useEffect } from 'react';

const TotalCustomersComponent = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    // Fetch total orders from the backend
    fetch('http://localhost:3001/customers')
      .then((response) => response.json())
      .then((data) => setTotalCustomers(data.totalCustomers))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Total Customers</h1>
      <p>{totalCustomers}</p>
    </div>
  );
};

export default TotalCustomersComponent;
