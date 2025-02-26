import React from "react";

const Subcrible = () => {
  return (
    <div className="bg-gray-100 p-10">
      {/* Service Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 text-center py-6 bg-gray-50 rounded-lg shadow-md">
        <div className="p-4">
          <h3 className="font-semibold italic">FREE SHIPPING</h3>
          <p className="text-gray-500 text-sm">Free shipping worldwide</p>
        </div>
        <div className="p-4">
          <h3 className="font-semibold italic">24 X 7 SERVICE</h3>
          <p className="text-gray-500 text-sm">Free shipping worldwide</p>
        </div>
        <div className="p-4">
          <h3 className="font-semibold italic">FESTIVAL OFFER</h3>
          <p className="text-gray-500 text-sm">Free shipping worldwide</p>
        </div>
      </div>
      
     
      <div className="mt-8 flex justify-between">
        <div>
        <h3 className="italic font-semibold"> LETS BE FRIENDS!</h3>
        <p className="text-gray-500 text-sm">Nisi nisi tempor consequat laboris nisi.</p>
        </div>
        
        <div className="mt-4 flex max-w-md">
          <input
            type="email"
            placeholder="Enter your email address"
            className="p-2 flex-grow border border-gray-300 rounded-l-md focus:outline-none w-3xs" 

          />
          <button className="bg-gray-800 text-white px-4 py-2 rounded-r-md ]">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default Subcrible;