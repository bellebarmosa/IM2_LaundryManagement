import React, { useState, useEffect } from 'react';

import ServiceModal from './modals/ServiceModal'

import svgWhites from '../assets/white.svg'
import svgColored from '../assets/colored.svg'
import svgDelicates from '../assets/delicates.svg'
import svgDenim from '../assets/denim.svg'
import svgAthleticWear from '../assets/athletic gear.svg'
import svgOutwear from '../assets/outerwear.svg'
import svgBedLinens from '../assets/bedding.svg'
import svgTowels from '../assets/towel.svg'


const Icon = ({svgName}) => {
  return (
    <img src={svgName} alt='Whites' style={{ width: '150px', height: '150px', borderRadius: '1rem', padding: '.5rem' }}/>
  )
}


const ClothesType = [
  {
    clothType: "Whites",
    icon: <Icon svgName={svgWhites}/>
  },
  {
    clothType: "Colored",
    icon: <Icon svgName={svgColored}/>
  },
  {
    clothType: "Delicates",
    icon: <Icon svgName={svgDelicates}/>
  },
  {
    clothType: "Denim",
    icon: <Icon svgName={svgDenim}/>
  },
  {
    clothType: "Athletic",
    icon: <Icon svgName={svgAthleticWear}/>
  },
  {
    clothType: "Outwear",
    icon: <Icon svgName={svgOutwear}/>
  },
  {
    clothType: "Linens",
    icon: <Icon svgName={svgBedLinens}/>
  },
  {
    clothType: "Towels",
    icon: <Icon svgName={svgTowels}/>
  },
  {
    clothType: "Curtains",
    icon: <Icon svgName={svgBedLinens}/>
  },
  {
    clothType: "Rags",
    icon: <Icon svgName={svgBedLinens}/>
  },
  {
    clothType: "Suits",
    icon: <Icon svgName={svgBedLinens}/>
  }
]

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
    const rows = [];
    for (let i = 0; i < ClothesType.length; i += 4) {
      const rowItems = ClothesType.slice(i, i + 4);
      const row = (
        <div key={i} className="flex flex-row gap-12 p-4">
          {rowItems.map((item) => (
            <div
              key={item.clothType}
              className="rounded-2xl w-1/5 h-full bg-darkBlue hover:bg-lightBlue select-none flex flex-col items-center"
            >
              <div className="pt-1" onClick={() => handleOptionClick(item.clothType)}>
                {item.icon}
                <p className="text-lg font-semibold text-center pt-0 pb-2">{item.clothType}</p>
              </div>
              {showModal && (
                <ServiceModal laundryType={laundryType} closeModal={setShowModal} addLaundryItem={addLaundryItems}></ServiceModal>
              )}
            </div>
          ))}
        </div>
      );
      rows.push(row);
    }
    return rows;
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
                <th className="text-xl font-bold w-1/5">Type</th>
                <th className="text-xl font-bold w-2/5">Service</th>
                <th className="text-xl font-bold w-1/5">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {laundryItems.map((item, index) => (
                <tr key={index} className="flex flex-row pt-5">
                  <td className="text-xl font-semibold w-1/5">{item.type}</td>
                  <td className="text-xl font-semibold w-2/5 pr-2">{item.service}</td>
                  <td className="text-xl font-semibold w-1/5 text-center">{item.quantity}</td>
                  <td><button className='text-lg bg-red-700  text-brightYellow font-semibold h-fit w-fit rounded-2xl px-2' onClick={() => handleDelete(index)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="h-fit p-5 bg-screenYellow rounded-3xl flex-shrink-0">
          <div className="flex flex-col">
            <div className="flex flex-col pb-5">
              <p className='text-2xl font-semibold text-right'>SubTotal: ₱{subtotal}</p>
              <p className='text-2xl font-semibold text-right'>Tax(12%): ₱{tax}</p>
              <p className='text-2xl font-semibold text-right'>Final Total: ₱{finalTotal}</p>
            </div>
            <div className="flex flex-row gap-3">
              <button className='text-xl bg-strongRed font-semibold h-fit w-1/3 rounded-xl p-3 hover:bg-weakRed' onClick={clearList}>Clear List</button>
              <button className='text-xl bg-strongGreen font-semibold h-fit w-2/3 rounded-xl p-3  hover:bg-weakGreen'>Proceed to Payment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default POS