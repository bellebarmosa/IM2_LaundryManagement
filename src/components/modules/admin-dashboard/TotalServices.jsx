import React, { useState, useEffect } from 'react';

const TotalServicesComponent = () => {
  const [totalServices, setTotalServices] = useState(0);

  useEffect(() => {
    // Fetch total services from the backend
    fetch('http://localhost:3001/services')
      .then((response) => response.json())
      .then((data) => setTotalServices(data.totalServices))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Total Services</h1>
      <p>{totalServices}</p>
    </div>
  );
};

export default TotalServicesComponent;
