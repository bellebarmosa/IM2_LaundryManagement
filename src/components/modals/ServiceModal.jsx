import React, { useState } from 'react';

export default function ServiceModal({ laundryType, closeModal, addLaundryItem, priceList   }) {

  const [serviceType, setServiceType] = useState('');
  const [washingOption, setWashingOption] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleServiceChange = (event) => {
    setServiceType(event.target.value);
    setWashingOption(''); // Reset washing option when service type changes
  };

  const handleWashingOptionChange = (event) => {
    setWashingOption(event.target.value);
  };

  const handleCancel = () => {
    console.log('Cancel button clicked');
    closeModal(false); // Use the closeModal prop to close the modal
  };

  const handleConfirm = () => {
    if (!serviceType || !laundryType) {
      alert("Please select a service type before confirming.");
      return;
    }
  
    const selectedService = washingOption || serviceType;
    const price = priceList[laundryType][selectedService];
  
    if (isNaN(price)) {
      // Handle the case where the selected service is not available for the given cloth type
      alert(`Invalid service: ${selectedService} for ${laundryType}`);
      return;
    }
  
    const total = price * quantity;
  
    const laundryItem = {
      type: laundryType,
      service: selectedService,
      quantity: quantity,
      total: total,
    };
  
    addLaundryItem(laundryItem);
    closeModal(false);
  };
  

  const handleQuantityChange = (event) => {
    let value = event.target.value;

    value = Math.max(1, parseInt(value, 10));

    value = Math.min(value, 100);

    setQuantity(value);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-10 z-1000" onClick={handleCancel}></div>
      <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] h-1/3 w-1/3 z-1000 bg-screenYellow p-4 rounded-xl">
        <div className="flex flex-col p-5">
          <div className="flex flex-row items-center gap-5 pb-4">
            <p className='font-bold text-2xl gap-4'>Select Service for {laundryType}:</p>
            <select className='font-semibold text-xl' value={serviceType} onChange={handleServiceChange}>
              <option className='font-semibold text-xl' value="">Select</option>
              <option className='font-semibold text-xl' value="machineWash">Machine Wash</option>
              <option className='font-semibold text-xl' value="dryClean">Dry Clean</option>
            </select>
          </div>

          {serviceType === 'machineWash' && (
            <div className='flex flex-col h-fit pt-2 pb-4'>  
              <p className='font-bold text-2xl pb-2'>Select Washing Option:</p>
              <select className='font-semibold text-xl h-fit' value={washingOption} onChange={handleWashingOptionChange}>
                <option className='font-semibold text-xl' value="">Select</option>
                <option className='font-semibold text-xl' value="machineWash">Machine Wash Only</option>
                <option className='font-semibold text-xl' value="withSoftener">with Softener</option>
                <option className='font-semibold text-xl' value="withIroning">with Ironing</option>
                <option className='font-semibold text-xl' value="withSoftenerandIroning">with Softener and Ironing</option>
              </select>
            </div>
          )}

          <div className="flex flex-row items-center gap-5 pt-4 pb-4">
            <p className='font-bold text-2xl'>Clothes Quantity:</p>
            <input className='font-semibold text-xl h-fit w-20 p-3'  type="number" value={quantity} onChange={handleQuantityChange} />
          </div>
          
          <div className="flex flex-row gap-4">
            <button className='text-xl bg-darkBlue font-semibold h-fit w-fit rounded-xl p-4' onClick={handleConfirm}>Confirm</button>
            <button className='text-xl bg-red-700 font-semibold h-fit w-fit rounded-xl p-4' onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
