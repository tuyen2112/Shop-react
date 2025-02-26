import React from 'react'


const Header = () => {
  return (
    <div>
      <header style={{margin:"0 auto"}} className="flex justify-between items-center py-10 px-10 bg-white w-[900px]  ">
      <nav className="text-sm">
        <a href="#" className="text-[#e8d0a8]">Home</a> <span className="mx-2"></span>
        <a href="#" className="italic text-black">Shop</a>
      </nav>
      <h1 className="text-sm font-black italic text-[#625456]">BOUTIQUE</h1>
      <div className="text-sm text-gray-500">
        <span className="mr-4 cursor-pointer">🛒 Cart</span>
        <span className="cursor-pointer">👤 Login</span>
      </div>
    </header>
    
    </div>
  )
}

export default Header
