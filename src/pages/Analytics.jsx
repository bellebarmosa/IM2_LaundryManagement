// import React, { useState } from 'react';
// import { Typography, Select, MenuItem, Grid, Paper } from '@mui/material';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
// import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const months = [
//   'January', 'February', 'March', 'April', 'May', 'June',
//   'July', 'August', 'September', 'October', 'November', 'December'
// ];

// // dummy data
// const dummyData = [
//   { date: '2023-01-01', totalOrders: 50, cancelled: 10, refunded: 5, pending: 15, processing: 8, forPickup: 7, completed: 5 },
//   { date: '2023-01-08', totalOrders: 45, cancelled: 8, refunded: 3, pending: 12, processing: 7, forPickup: 6, completed: 4 },
//   { date: '2023-01-15', totalOrders: 40, cancelled: 5, refunded: 2, pending: 10, processing: 5, forPickup: 8, completed: 10 },
//   { date: '2023-02-01', totalOrders: 55, cancelled: 12, refunded: 3, pending: 18, processing: 7, forPickup: 5, completed: 10 },
//   { date: '2023-02-08', totalOrders: 60, cancelled: 15, refunded: 4, pending: 20, processing: 10, forPickup: 8, completed: 3 },
//   { date: '2023-12-04', totalOrders: 30, cancelled: 1, refunded: 3, pending: 5, processing: 8, forPickup: 8, completed: 10 },
//   { date: '2023-12-08', totalOrders: 48, cancelled: 6, refunded: 0, pending: 15, processing: 13, forPickup: 13, completed: 5 },
// ];


// const Analytics = () => {
//   const [viewOption, setViewOption] = useState('weekly');
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedMonth, setSelectedMonth] = useState(months[0]);

//   const handleChangeViewOption = (event) => {
//     setViewOption(event.target.value);
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const handleChangeMonth = (event) => {
//     setSelectedMonth(event.target.value);
//   };

//   const renderLine = (dataKey, name, stroke) => {
//     if (
//       (viewOption === 'monthly' && (dataKey === 'pending' || dataKey === 'processing' || dataKey === 'forPickup')) ||
//       (viewOption !== 'weekly' && (dataKey === 'pending' || dataKey === 'processing' || dataKey === 'forPickup'))
//     ) {
//       return null;
//     }

//     return <Line type="monotone" dataKey={dataKey} name={name} stroke={stroke} />;
//   };

//   const filteredData = () => {
//     const today = new Date();

//     if (viewOption === 'weekly') {
//       const lastWeek = new Date(today);
//       lastWeek.setDate(today.getDate() - 7);

//       return dummyData.filter((entry) => new Date(entry.date) >= lastWeek && new Date(entry.date) <= today);
//     } else if (viewOption === 'monthly') {
//       const lastMonth = new Date(today);
//       lastMonth.setMonth(months.indexOf(selectedMonth));

//       return dummyData.filter((entry) => {
//         const entryDate = new Date(entry.date);
//         return (
//           entryDate >= lastMonth &&
//           entryDate <= today &&
//           entry.completed > 0 &&
//           entry.refunded > 0 &&
//           entry.cancelled > 0
//         );
//       });
//     } else if (viewOption === 'yearly') {
//       const lastYear = new Date(today);
//       lastYear.setFullYear(today.getFullYear() - 1);

//       return dummyData.filter((entry) => {
//         const entryDate = new Date(entry.date);
//         return (
//           entryDate >= lastYear &&
//           entry.completed > 0 &&
//           entry.refunded > 0 &&
//           entry.cancelled > 0
//         );
//       });
//     }

//     return dummyData;
//   };

//   const getTotalOrders = () => {
//     const data = filteredData();
//     return data.reduce((sum, entry) => sum + entry.totalOrders, 0);
//   };

//   return (
//     <>
//       <div className="w-full h-full flex flex-col px-8 p-3 bg-brightYellow rounded-b-3xl gap-3">
//         <Grid container spacing={3}>
//           <Grid item xs={3} sm={3}>
//             <Paper elevation={3} style={{ padding: '20px' }}>
//               <Typography variant="subtitle1">View Option:</Typography>
//               <Select value={viewOption} onChange={handleChangeViewOption}>
//                 <MenuItem value="weekly">Weekly</MenuItem>
//                 <MenuItem value="monthly">Monthly</MenuItem>
//                 <MenuItem value="yearly">Yearly</MenuItem>
//               </Select>
//               {viewOption === 'monthly' && (
//                 <>
//                   <Typography variant="subtitle1">Select Month:</Typography>
//                   <Select value={selectedMonth} onChange={handleChangeMonth}>
//                     {months.map((month) => (
//                       <MenuItem key={month} value={month}>
//                         {month}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </>
//               )}

//               <div>
//                 <p>Total Orders: {getTotalOrders()}</p>
//               </div>
//             </Paper>
//           </Grid>
//           <Grid item xs={9} sm={9}>
//             <Paper elevation={3} style={{ padding: '20px' }}>
//               <Typography variant="h6">Order Metrics</Typography>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={filteredData()}>
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   {renderLine('cancelled', 'Cancelled', '#264b96')}
//                   {renderLine('refunded', 'Refunded', '#27b376')}
//                   {renderLine('pending', 'Pending', '#006f3c')}
//                   {renderLine('processing', 'Processing', '#f9a73e')}
//                   {renderLine('forPickup', 'For Pickup', '#bf21f')}
//                   {renderLine('completed', 'Completed', '#ae0000')}
//                 </LineChart>
//               </ResponsiveContainer>
//             </Paper>
//           </Grid>
//         </Grid>
//       </div>
//     </>
//   );
// };

// export default Analytics;

import React, { useState } from 'react';
import { Typography, Select, MenuItem, Grid, Paper } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from 'recharts';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const customerPieData = [
  { date: '2023-01-01', name: 'Active Customers', value: 80 },
  { date: '2023-01-01', name: 'Inactive Customers', value: 20 },
];

const servicesPieData = [
  { date: '2023-01-01', name: 'machineWash', value: 30 },
  { date: '2023-01-01', name: 'withIroning', value: 25 },
  { date: '2023-01-01', name: 'withSoftenerandIroning', value: 20 },
  { date: '2023-01-01', name: 'dryClean', value: 15 },
];

const clothingPieData = [
  { date: '2023-01-01', name: 'Whites', value: 35 },
  { date: '2023-01-01', name: 'Colored', value: 30 },
  { date: '2023-01-01', name: 'Outwear', value: 20 },
  { date: '2023-01-01', name: 'Linens', value: 15 },
];

const dummyData = [
  { date: '2023-01-01', totalOrders: 50, cancelled: 10, refunded: 5, pending: 15, processing: 8, forPickup: 7, completed: 5 },
  { date: '2023-01-08', totalOrders: 45, cancelled: 8, refunded: 3, pending: 12, processing: 7, forPickup: 6, completed: 4 },
  { date: '2023-01-15', totalOrders: 40, cancelled: 5, refunded: 2, pending: 10, processing: 5, forPickup: 8, completed: 10 },
  { date: '2023-02-01', totalOrders: 55, cancelled: 12, refunded: 3, pending: 18, processing: 7, forPickup: 5, completed: 10 },
  { date: '2023-02-08', totalOrders: 60, cancelled: 15, refunded: 4, pending: 20, processing: 10, forPickup: 8, completed: 3 },
  { date: '2023-12-04', totalOrders: 30, cancelled: 1, refunded: 3, pending: 5, processing: 8, forPickup: 8, completed: 10 },
  { date: '2023-12-08', totalOrders: 48, cancelled: 6, refunded: 0, pending: 15, processing: 13, forPickup: 13, completed: 5 },
];

const Analytics = () => {
  const [viewOption, setViewOption] = useState('weekly');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(months[0]);

  const handleChangeViewOption = (event) => {
    setViewOption(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChangeMonth = (event) => {
    setSelectedMonth(event.target.value);
  };

  const renderLine = (dataKey, name, stroke) => {
    if (
      (viewOption === 'monthly' && (dataKey === 'pending' || dataKey === 'processing' || dataKey === 'forPickup')) ||
      (viewOption !== 'weekly' && (dataKey === 'pending' || dataKey === 'processing' || dataKey === 'forPickup'))
    ) {
      return null;
    }

    return <Line type="monotone" dataKey={dataKey} name={name} stroke={stroke} />;
  };

  const filteredData = () => {
    const today = new Date();

    if (viewOption === 'weekly') {
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);

      return dummyData.filter((entry) => new Date(entry.date) >= lastWeek && new Date(entry.date) <= today);
    } else if (viewOption === 'monthly') {
      const lastMonth = new Date(today);
      lastMonth.setMonth(months.indexOf(selectedMonth));

      return dummyData.filter((entry) => {
        const entryDate = new Date(entry.date);
        return (
          entryDate >= lastMonth &&
          entryDate <= today &&
          entry.completed > 0 &&
          entry.refunded > 0 &&
          entry.cancelled > 0
        );
      });
    } else if (viewOption === 'yearly') {
      const lastYear = new Date(today);
      lastYear.setFullYear(today.getFullYear() - 1);

      return dummyData.filter((entry) => {
        const entryDate = new Date(entry.date);
        return (
          entryDate >= lastYear &&
          entry.completed > 0 &&
          entry.refunded > 0 &&
          entry.cancelled > 0
        );
      });
    }

    return dummyData;
  };

  const getTotalOrders = () => {
    const data = filteredData();
    return data.reduce((sum, entry) => sum + entry.totalOrders, 0);
  };

  return (
    <>
    <div style={{ minHeight: '100vh' }}>
      <div className="min-h-screen bg-brightYellow flex flex-col px-8 p-3 rounded-b-3xl gap-3">
        <Grid container spacing={3}>
          <Grid item xs={3} sm={3}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="subtitle1">View Option:</Typography>
              <Select value={viewOption} onChange={handleChangeViewOption}>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </Select>
              {viewOption === 'monthly' && (
                <>
                  <Typography variant="subtitle1">Select Month:</Typography>
                  <Select value={selectedMonth} onChange={handleChangeMonth}>
                    {months.map((month) => (
                      <MenuItem key={month} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}

              <div>
                <p>Total Orders: {getTotalOrders()}</p>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={9} sm={9}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h6">Order Metrics</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData()}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {renderLine('cancelled', 'Cancelled', '#264b96')}
                  {renderLine('refunded', 'Refunded', '#27b376')}
                  {renderLine('pending', 'Pending', '#006f3c')}
                  {renderLine('processing', 'Processing', '#f9a73e')}
                  {renderLine('forPickup', 'For Pickup', '#bf21f')}
                  {renderLine('completed', 'Completed', '#ae0000')}
                </LineChart>
              </ResponsiveContainer>
            </Paper>

          
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6}>
                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                  <Typography variant="h6">Customer Status</Typography>
                  <Typography variant="subtitle1">View Option:</Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie dataKey="value" nameKey="name" data={customerPieData} label fill="#006f3c" />
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              <Grid item xs={6} sm={6}>
                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                  <Typography variant="h6">Clothing Types in Orders</Typography>
                  <Typography variant="subtitle1">View Option:</Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie dataKey="value" nameKey="name" data={clothingPieData} label fill="#ae0000" />
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                  <Typography variant="h6">Service Usage</Typography>
                  <Typography variant="subtitle1">View Option:</Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie dataKey="value" nameKey="name" data={servicesPieData} label fill="#264b96"/>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </div>
      </div>
    </>
  );
};

export default Analytics;