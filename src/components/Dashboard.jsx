import React, { useEffect,useState} from 'react'
import Axios from 'axios';
import TotalOrdersComponent from '../components/admin-dashboard/TotalOrders';
import TotalSalesComponent from './admin-dashboard/TotalSales';
import TotalServicesComponent from './admin-dashboard/TotalServices';
import TotalCustomersComponent from './admin-dashboard/TotalCustomers';


import { BadgeDollarSign, ShoppingBag, Wrench, UsersRound, CircleUserRound, LayoutList, ListChecks  } from 'lucide-react';

const CustomerDashboard = () => {

  return (
    <div><p>adasdada</p></div>
  )
}



const DefaultDashboard = () => {

  const [orders, setOrders] = useState([]);
  const [recentOrders, setrecentOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

useEffect(() => {
  // fetch orders from the backend //first 10
  Axios.get('http://localhost:3001/order/pendingorders')
    .then((response) => {
      if (response.err) {
        console.log(response.err);
        setrecentOrders(null)
      } else {
        setOrders(response.data);
      }
      console.log(orders)
    });
}, []);


useEffect(() => {
  // fetch orders from the backend // finished orders
  Axios.get('http://localhost:3001/order/recentorders')
    .then((response) => {
      if (response.err) {
        console.log(response.err);
      } else {
        setrecentOrders(response.data);
      }
      console.log(recentOrders)
    });
}, []);



useEffect(() => {
  Axios.get("http://localhost:3001/order/customers")
    .then((response) => {
      if (response.err) {
        console.log(response.err);
      } else {
        setCustomers(response.data);
        console.log(customers)
      }
    });
}, []);


const customerMap = new Map(customers.map((customer) => [customer.customer_ID, customer]));
// Format the data for  pending
const PendingOrders = orders.map((order) => {
  const customer = customerMap.get(order.customer_ID);
  return {
    profile: <CircleUserRound size={50} color={"#448DB8"} />,
    name: customer ? customer.customer_name : 'Unknown',
    email: customer ? customer.customer_eMail : 'Unknown',
    totalAmount: order.order_total,
  };
});



let RecentOrders =[];
if (recentOrders != null) {
  RecentOrders = recentOrders.map((order) => {
    const customer = customerMap.get(order.customer_ID);
    return {
      profile: <CircleUserRound size={50} color={"#448DB8"} />,
      name: customer ? customer.customer_name : 'Unknown',
      email: customer ? customer.customer_eMail : 'Unknown',
      totalAmount: order.order_total,
    };
  })
}



  const totalSales = <TotalSalesComponent/>;
  const totalOrders = <TotalOrdersComponent/>;
  const totalServices = <TotalServicesComponent/>;
  const totalCustomers = <TotalCustomersComponent/>;


  const pendingOrdersTotal = PendingOrders.length;
  const recentOrdersTotal = RecentOrders.length;


  return (
    <div className='w-full h-full px-8 p-3 bg-brightYellow rounded-b-3xl'>

      <div className="flex flex-row items-center gap-5">
        <div className="flex flex-row w-1/2 bg-screenYellow p-3 rounded-2xl">
          <div className="flex items-center pl-2">
            <BadgeDollarSign size={50} color={"#448DB8"}/>
          </div>
          <div className="flex flex-col pl-5">
            <p className='text-2xl font-semibold text-darkBlue'>Total Sales</p>
            <p className='text-lg font-bold text-darkBlue'>₱ {totalSales}</p>
          </div>
        </div>

        <div className="flex flex-row w-1/2 bg-screenYellow p-3 rounded-2xl">
          <div className="flex items-center pl-2">
            <ShoppingBag size={50} color={"#448DB8"}/>
          </div>
          <div className="flex flex-col pl-5">
            <p className='text-2xl font-semibold text-darkBlue'>Total Orders</p>
            <p className='text-lg font-bold text-darkBlue'>{totalOrders} Orders</p>
          </div>
        </div>

      </div>

      <div className="flex flex-row items-center gap-5 py-5">
        <div className="flex flex-row w-1/2 bg-screenYellow p-3 rounded-2xl">
          <div className="flex items-center pl-2">
            <Wrench size={50} color={"#448DB8"}/>
          </div>
          <div className="flex flex-col pl-5">
            <p className='text-2xl font-semibold text-darkBlue'>Total Services</p>
            <p className='text-lg font-bold text-darkBlue'>{totalServices} Services</p>
          </div>
        </div>

        <div className="flex flex-row w-1/2 bg-screenYellow p-3 rounded-2xl">
          <div className="flex items-center pl-2">
            <UsersRound size={50} color={"#448DB8"}/>
          </div>
          <div className="flex flex-col pl-5">
            <p className='text-2xl font-semibold text-darkBlue'>Total Customers</p>
            <p className='text-lg font-bold text-darkBlue'>{totalCustomers} Customers</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row pt-10 gap-5 h-2/3">
        <div className="flex flex-col w-1/2 bg-screenYellow pl-5 p-5 rounded-2xl ">
          <div className='flex flex-row'>
            <LayoutList size={50} color={"#448DB8"}/>
            <div className="flex flex-col pl-5">
              <p className="text-2xl font-semibold text-darkBlue ">Pending Orders</p>
              <p className="text-lg font-medium text-darkBlue pt-0 pb-2">There are { pendingOrdersTotal } pending orders.</p>
            </div>
          </div>
            <div className="overflow-auto max-h-80 custom-scrollbar">
              {PendingOrders.map(( val, key) => {
                return <div key={ key }  className="flex flex-row items-center pb-3">
                  { val.profile }
                  <div className="flex flex-col w-1/2 pl-5">
                    <p className="text-darkBlue text-xl font-semibold">{val.name}</p>
                    <p className="text-darkBlue text-base  font-medium">{val.email}</p>
                  </div>
                  <p className="text-darkBlue text-xl font-semibold text-right w-1/2 pr-4">+₱{ val.totalAmount }</p>
                </div>
              })}
            </div>
        </div>
        <div className="flex flex-col w-1/2 bg-screenYellow pl-5 p-5 rounded-2xl ">
          <div className='flex flex-row'>
            <ListChecks size={50} color={"#448DB8"}/>
            <div className="flex flex-col pl-5">
              <p className="text-2xl font-semibold text-darkBlue ">Recent Orders</p>
              <p className="text-lg font-medium text-darkBlue pt-0 pb-2">There are { recentOrdersTotal } recent orders.</p>
            </div>
          </div>
            <div className="overflow-auto max-h-80 custom-scrollbar">
             
              { RecentOrders && RecentOrders.map(( val, key) => {
                return <div key={ key }  className="flex flex-row items-center pb-3">
                  { val.profile }
                  <div className="flex flex-col w-1/2 pl-5">
                    <p className="text-darkBlue text-xl font-semibold">{val.name}</p>
                    <p className="text-darkBlue text-base  font-medium">{val.email}</p>
                  </div>
                  <p className="text-darkBlue text-xl font-semibold text-right w-1/2 pr-4">+₱{ val.totalAmount }</p>
                </div>
              })}
            </div>
        </div>
      </div>
    </div>
  )
}

const Dashboard = ({ userType }) => {
  var Dashboard;
  if(userType !== 'customer'){
    Dashboard = DefaultDashboard;
  }else{
    Dashboard = CustomerDashboard;
  }
  return (
    <Dashboard/>
  )
}

export default Dashboard