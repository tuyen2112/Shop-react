import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-black text-white py-10 px-10">
      <div className="grid grid-cols-3 gap-10 text-sm">
        <div>
          <h2 className="font-semibold">CUSTOMER SERVICES</h2>
          <ul className="text-gray-400 italic">
            <li>Help & Contact Us</li>
            <li>Returns & Refunds</li>
            <li>Online Stores</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold">COMPANY</h2>
          <ul className="text-gray-400 italic">
            <li>What We Do</li>
            <li>Available Services</li>
            <li>Latest Posts</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold">SOCIAL MEDIA</h2>
          <ul className="text-gray-400 italic">
            <li>Twitter</li>
            <li>Instagram</li>
            <li>Facebook</li>
            <li>Pinterest</li>
          </ul>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer
