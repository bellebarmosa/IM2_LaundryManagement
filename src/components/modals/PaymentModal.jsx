import React, { useState } from 'react';

const PaymentModal = ({ show, onClose, orderTotal, paidStatus, remarks, onConfirm }) => {
  const [paid, setPaid] = useState(paidStatus);
  const [remarksInput, setRemarksInput] = useState(remarks);

  const handleConfirm = () => {
    // Handle additional logic if needed
    const details = {
      paidStatus: paid,
      remarks: remarksInput,
    };

    // Call the onConfirm callback with the details
    onConfirm(details);

    // Clear the modal state after confirming
    setPaid(false);
    setRemarksInput('');

    // Close the modal after confirming
    onClose();
  };

  return (
    <div className={`modal ${show ? 'block' : 'hidden'}`}>
      <div className="modal-container flex items-center justify-center h-full">
        <div className="modal-content bg-white w-full max-w-md mx-auto my-10 p-4 rounded shadow-lg">
          <div className="modal-content py-4 text-left px-6">
            <p className="text-xl font-bold mb-2">Payment Confirmation</p>
            <p>Order Total: ₱{orderTotal}</p>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Paid Status:</label>
              <input
                type="checkbox"
                checked={paid}
                onChange={() => setPaid(!paid)}
                className="mr-2"
              />
              <span className="text-sm">Paid</span>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Remarks:</label>
              <textarea
                value={remarksInput}
                onChange={(e) => setRemarksInput(e.target.value)}
                className="w-full h-20 border p-2"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleConfirm}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Confirm
              </button>
              <button
                onClick={onClose}
                className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;