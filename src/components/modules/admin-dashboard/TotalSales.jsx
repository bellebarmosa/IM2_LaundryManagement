import React, { useState, useEffect } from 'react';

const TotalSalesComponent = () => {
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    // Fetch total sales from the backend
    fetch('http://localhost:3001/totalsales')
      .then((response) => response.json())
      .then((data) => setTotalSales(data.totalSales))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Total Sales</h1>
      <p>{`$${totalSales.toFixed(2)}`}</p>
    </div>
  );
};

export default TotalSalesComponent;
