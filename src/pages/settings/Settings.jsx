import React from 'react';
import AdminSettingsData from './AdminSettingsData';
import CustomerSettingsData from './CustomerSettingsData';
import StoreEmpSettingsData from './StoreEmpSettingsData';
import StoreOwnerSettingsData from './StoreOwnerSettingsData';

const Settings = ({ userType }) => {
  var SettingsData;
  if (userType === 'admin') {
    SettingsData = <AdminSettingsData/>;
  } else if (userType === 'storeOwner') {
    SettingsData = <StoreOwnerSettingsData/>;
  } else if (userType === 'storeEmployee') {
    SettingsData = <StoreEmpSettingsData/>;
  } else if (userType === 'customer') {
    SettingsData = <CustomerSettingsData/>;
  }

  return (
    <>
    <div>
        {SettingsData}
    </div>
  </>
)};

export default Settings;