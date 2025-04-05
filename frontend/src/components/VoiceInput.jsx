import React, { useState } from 'react'

function VoiceInput() {
  const [text, setText] = useState('')

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition()
    recognition.lang = 'es-ES'
    recognition.start()
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setText(transcript)
    }
  }

  return (
    <div>
      <h3>Entrada de Voz</h3>
      <button onClick={handleVoiceInput}>Hablar</button>
      <p>Texto Detectado: {text}</p>
    </div>
  )
}

export default VoiceInput
