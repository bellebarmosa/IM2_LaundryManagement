import React from 'react';
import TotalServices from '../modules/admin-dashboard/TotalServices';
import TotalSales from '../modules/admin-dashboard/TotalSales';
import TotalOrders from '../modules/admin-dashboard/TotalOrders';
import TotalCustomers from '../modules/admin-dashboard/TotalCustomers';
import RecentOrdersAdmin from '../modules/admin-dashboard/RecentOrdersAdmin';
import OrderPopup from '../modules/admin-dashboard/OrderPopup';

const AdminDashboard = () => {
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  const handleViewMore = (order) => {
    setSelectedOrder(order);
  };

  const handleEditOrder = (orderId, updatedData) => {
    // edit the order on the backend
    console.log(`Edit order with ID ${orderId}`, updatedData);
  };

  const handleClosePopup = () => {
    setSelectedOrder(null);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div className="dashboard-section">
        <TotalServices />
      </div>

      <div className="dashboard-section">
        <TotalSales />
      </div>

      <div className="dashboard-section">
        <TotalOrders />
      </div>

      <div className="dashboard-section">
        <TotalCustomers />
      </div>

      <div className="dashboard-section">
        <RecentOrdersAdmin onViewMore={handleViewMore} />
      </div>

      {selectedOrder && (
        <OrderPopup
          order={selectedOrder}
          onEdit={(updatedData) =>
            handleEditOrder(selectedOrder.id, updatedData)
          }
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
