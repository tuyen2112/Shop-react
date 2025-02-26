import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Footer from './component/Footer'
import Header from './component/Header'
import Homepage from './component/Homepage'
import MainContent from './component/MainContent'
import Subcrible from './component/Subcrible'
import ShopPage from './component/ShopPage'

function App() {
  
  return (
    <div className="font-sans">
      
        <Routes>
          <Route path='/' element={<Homepage />}  />
           <Route path="/shop" element={<ShopPage />} />
        </Routes>
   
    </div>  
  )
}

export default App
