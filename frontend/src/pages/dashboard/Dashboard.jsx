import React from 'react'
import VoiceInput from '../../components/VoiceInput'
import ProductSuggestions from '../../components/ProductSuggestions'
import Navbar from '../../components/Navbar'

function Dashboard() {
  return (
    <div>
      <Navbar />
      <h1>Panel de Venta</h1>
      <VoiceInput />
      <ProductSuggestions />
    </div>
  )
}

export default Dashboard
