import React, { useEffect, useState } from 'react'
import axios from '../api/axiosConfig'

function ProductSuggestions() {
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    axios.get('/recommendations/')
      .then(res => setSuggestions(res.data))
      .catch(() => setSuggestions(['Coca-Cola', 'Pan', 'Leche'])) // Fallback
  }, [])

  return (
    <div>
      <h3>Recomendaciones</h3>
      <ul>
        {suggestions.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default ProductSuggestions
