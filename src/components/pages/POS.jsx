import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import ServiceModal from '../modals/ServiceModal'

import svgWhites from '../../assets/whites.png'
import svgColored from '../../assets/colored.png'
import svgDelicates from '../../assets/delicates.png'
import svgDenim from '../../assets/denim.png'
import svgAthleticWear from '../../assets/athletic.png'
import svgOutwear from '../../assets/outerwear.png'
import svgBedLinens from '../../assets/bedding.png'
import svgTowels from '../../assets/towels.png'
import svgCurtains from '../../assets/curtains.png'
import svgRags from '../../assets/rags.png'
import svgSuits from '../../assets/suits.png'


const Icon = ({svgName}) => {
  return (
    <img src={svgName} alt='Whites' style={{ width: '150px', height: '150px', borderRadius: '1rem'}}/>
  )
}


// const ClothesType = [
//   {
//     clothType: "Whites",
//     icon: <Icon svgName={svgWhites}/>
//   },
//   {
//     clothType: "Colored",
//     icon: <Icon svgName={svgColored}/>
//   },
//   {
//     clothType: "Delicates",
//     icon: <Icon svgName={svgDelicates}/>
//   },
//   {
//     clothType: "Denim",
//     icon: <Icon svgName={svgDenim}/>
//   },
//   {
//     clothType: "Athletic",
//     icon: <Icon svgName={svgAthleticWear}/>
//   },
//   {
//     clothType: "Outwear",
//     icon: <Icon svgName={svgOutwear}/>
//   },
//   {
//     clothType: "Linens",
//     icon: <Icon svgName={svgBedLinens}/>
//   },
//   {
//     clothType: "Towels",
//     icon: <Icon svgName={svgTowels}/>
//   },
//   {
//     clothType: "Curtains",
//     icon: <Icon svgName={svgCurtains}/>
//   },
//   {
//     clothType: "Rags",
//     icon: <Icon svgName={svgRags}/>
//   },
//   {
//     clothType: "Suits",
//     icon: <Icon svgName={svgSuits}/>
//   }
// ]

const PriceList = {
  Whites: {
    machineWash: 50,
    withSoftener: 60,
    withIroning: 70,
    withSoftenerandIroning: 80,
    dryClean: 100
  },
  Colored: {
    machineWash: 60,
    withSoftener: 70,
    withIroning: 80,
    withSoftenerandIroning: 90,
    dryClean: 120
  },
  Delicates: {
    machineWash: 45,
    withSoftener: 55,
    withIroning: 65,
    withSoftenerandIroning: 75,
    dryClean: 80
  },
  Denim: {
    machineWash: 50,
    withSoftener: 60,
    withIroning: 70,
    withSoftenerandIroning: 80,
    dryClean: 150
  },
  Athletic: {
    machineWash: 50,
    withSoftener: 60,
    withIroning: 70,
    withSoftenerandIroning: 80,
    dryClean: 100
  },
  Outwear: {
    machineWash: 50,
    withSoftener: 60,
    withIroning: 70,
    withSoftenerandIroning: 80,
    dryClean: 100
  },
  Linens: {
    machineWash: 50,
    withSoftener: 60,
    withIroning: 70,
    withSoftenerandIroning: 80
  },
  Curtains: {
    machineWash: 60,
    withSoftener: 70,
    withIroning: 80,
    withSoftenerandIroning: 90,
    dryClean: 120
  },
  Towels: {
    machineWash: 30,
    withSoftener: 40,
    withIroning: 40,
    withSoftenerandIroning: 50,
    dryClean: 40
  },
  Rags: {
    machineWash: 45,
    withSoftener: 55,
    withIroning: 65,
    withSoftenerandIroning: 75,
    dryClean: 80
  },
  Suits: {
    machineWash: 100,
    withSoftener: 120,
    withIroning: 130,
    withSoftenerandIroning: 150,
    dryClean: 150
  }
};


const TAX_RATE = 0.12;

const POS = () => {

  const [showModal, setShowModal] = useState(false);
  const [laundryItems, setLaundryItems] = useState([]);
  const [laundryType, setLaundryType] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  const [ClothesType,setClothesType] = useState([]);

useEffect(()=>{
  Axios.get('http://localhost:3001/order/clothetype')
  .then((response)=>{
    if (response.err) {
      console.log(response.err);
    } else {
      setClothesType(response.data);
      console.log(ClothesType)
    }
    console.log(ClothesType)
  })
},[])

const getIconByName = (clotheType) => {
  switch (clotheType) {
    case 'Whites':
      return svgWhites;
    case 'Colored':
      return svgColored;
    case 'Delicates':
      return svgDelicates;
    case 'Denim':
      return svgDenim;
    case 'Athletic':
      return svgAthleticWear;
    case 'Outwear':
      return svgOutwear;
    case 'Linens':
      return svgBedLinens;
    case 'Towels':
      return svgTowels;
    case 'Curtains':
      return svgCurtains;
    case 'Rags':
      return svgRags;
    case 'Suits':
      return svgSuits;
    default:
      return null; // You can provide a default icon or handle missing icons
  }
};

const clothesWithTypeAndIcon = ClothesType.map((item) => ({
  ...item,
  icon: getIconByName(item.name)
}));



  const addLaundryItems = (items) => {
    setLaundryItems([...laundryItems, items]);
  };

  const handleOptionClick = (type) => {
    setShowModal(true);
    setLaundryType(type);
  };

  const handleDelete = (index) => {
    const updatedLaundryItems = [...laundryItems];
    updatedLaundryItems.splice(index, 1);
    setLaundryItems(updatedLaundryItems);
  };

  const calculateSubtotal = () => {
    const subtotalValue = laundryItems.reduce((subtotal, item) => {
      const { type, service, quantity } = item;
      const price = PriceList[type][service]; // Access the correct price from PriceList
      return subtotal + price * quantity;
    }, 0);
    setSubtotal(subtotalValue);
    return subtotalValue;
  };

  const calculateTax = (subtotalValue) => {
    const taxValue = subtotalValue * TAX_RATE;
    setTax(taxValue);
    return taxValue;
  };

  const calculateFinalTotal = (subtotalValue, taxValue) => {
    const finalTotalValue = subtotalValue + taxValue;
    setFinalTotal(finalTotalValue);
    return finalTotalValue;
  };

  const paymentHandler = () =>{
    console.log("Order Confirmed");
    setLaundryItems([]);
  }

  useEffect(() => {
    const subtotalValue = calculateSubtotal();
    const taxValue = calculateTax(subtotalValue);
    const finalTotalValue = calculateFinalTotal(subtotalValue, taxValue);
    console.log("Laundry Items:", laundryItems); // Add this line
  }, [laundryItems]);
  
  const clearList = () => {
    setLaundryItems([]);
  };

  


  const renderClothesTypeRows = () => {
    return clothesWithTypeAndIcon.map((item) => (
      <div key={item.clotheType} className="rounded-2xl w-1/5 h-full bg-darkBlue hover:bg-lightBlue select-none flex flex-col items-center p-4">
        <div className="pt-1" onClick={() => handleOptionClick(item.clotheType)}>
          <Icon svgName={getIconByName(item.clotheType)} />
          <p className="text-lg font-semibold text-center pt-0 pb-2">{item.clotheType}</p>
        </div>
        {showModal && (
          <ServiceModal laundryType={item.clotheType} closeModal={setShowModal} addLaundryItem={addLaundryItems} priceList={PriceList}></ServiceModal>
        )}
      </div>
    ));
  };

  return (
    <div className="w-full h-full flex flex-row px-8 p-3 bg-brightYellow rounded-b-3xl gap-3">
      <div className="bg-screenYellow rounded-3xl w-3/5 p-4 pl-5">
        {renderClothesTypeRows()}
      </div>
      
      <div className="flex flex-col gap-5 bg-lightBlue rounded-3xl w-2/5 p-4 pl-5">
        <div className="h-3/5 bg-screenYellow rounded-2xl p-4 flex-grow">
        <p className="text-3xl font-bold pb-5">Laundry List</p>
        <table className="text-left w-full text-lg h-max">
          <thead>
            <tr className="flex flex-row">
              <th className="text-xl font-bold w-1/6">Type</th>
              <th className="text-xl font-bold w-2/6 text-right">Service</th>
              <th className="text-xl font-bold w-1/6 text-right">Items</th>
              <th className="text-xl font-bold w-1/6 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
          {laundryItems.map((item) => (
 <tr key={item.id} className="flex flex-row pt-5">
   <td className="text-xl font-semibold w-1/6">{item.type}</td>
   <td className="text-xl font-semibold w-2/6 pr-2 text-right">{item.service}</td>
   <td className="text-xl font-semibold w-1/6 text-center">{item.quantity}</td>
   <td className="text-xl font-semibold w-1/6 text-right">₱{item.total}</td> 
   <td className='pl-4'>
     <button
       className='text-lg bg-red-700 text-brightYellow font-semibold h-fit w-fit rounded-2xl px-2'
       onClick={() => handleDelete(item.id)}
     >
       Delete
     </button>
   </td>
 </tr>
))}
          </tbody>
        </table>
        </div>

        <div className="h-fit p-5 bg-screenYellow rounded-3xl flex-shrink-0">
          <div className="flex flex-col">
            <div className="flex flex-col pb-5">
            <p className='text-2xl font-semibold text-right'>SubTotal: ₱{subtotal.toFixed(2)}</p>
            <p className='text-2xl font-semibold text-right'>Tax(12%): ₱{tax.toFixed(2)}</p>
            <p className='text-2xl font-semibold text-right'>Final Total: ₱{finalTotal.toFixed(2)}</p>
            </div>
            <div className="flex flex-row gap-3">
              <button className='text-xl bg-strongRed font-semibold h-fit w-1/3 rounded-xl p-3 hover:bg-weakRed' onClick={clearList}>Clear List</button>
              <button className='text-xl bg-strongGreen font-semibold h-fit w-2/3 rounded-xl p-3  hover:bg-weakGreen' onClick={paymentHandler}>Proceed to Payment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default POS