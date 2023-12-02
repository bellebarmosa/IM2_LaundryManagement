import React from 'react';
import TotalServicesComponent from '../modules/admin-dashboard/TotalServicesComponent';
import TotalSalesComponent from '../modules/admin-dashboard/TotalSalesComponent';
import TotalOrdersComponent from '../modules/admin-dashboard/TotalOrdersComponent';
import TotalCustomersComponent from '../modules/admin-dashboard/TotalCustomersComponent';
import RecentOrdersTable from '../modules/admin-dashboard/RecentOrdersTable';
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
        <TotalServicesComponent />
      </div>

      <div className="dashboard-section">
        <TotalSalesComponent />
      </div>

      <div className="dashboard-section">
        <TotalOrdersComponent />
      </div>

      <div className="dashboard-section">
        <TotalCustomersComponent />
      </div>

      <div className="dashboard-section">
        <RecentOrdersTable onViewMore={handleViewMore} />
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
