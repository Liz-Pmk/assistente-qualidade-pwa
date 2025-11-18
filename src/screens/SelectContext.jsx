import React, { useState } from 'react'

export default function SelectContext({ onBack, onConfirm }) {
  const [planta, setPlanta] = useState('Planta 1')
  const [linha, setLinha] = useState('Linha A')

  const handleSubmit = (e) => {
    e.preventDefault()
    onConfirm({ planta, linha })
  }

  return (
    <main>
      <h2>Selecionar contexto</h2>
      <p style={{ fontSize: '0.9rem' }}>
        Primeiro, diga em qual planta e linha/setor você está. Isso ajuda a
        organizar os registros.
      </p>
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          Planta
          <select
            value={planta}
            onChange={(e) => setPlanta(e.target.value)}
            style={{
              display: 'block',
              width: '100%',
              padding: '6px 8px',
              marginTop: '4px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}
          >
            <option>Planta 1</option>
            <option>Planta 2</option>
          </select>
        </label>

        <label style={{ display: 'block', marginBottom: '8px' }}>
          Linha / Setor
          <select
            value={linha}
            onChange={(e) => setLinha(e.target.value)}
            style={{
              display: 'block',
              width: '100%',
              padding: '6px 8px',
              marginTop: '4px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}
          >
            <option>Linha A</option>
            <option>Linha B</option>
          </select>
        </label>

        <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
          <button className="secondary" type="button" onClick={onBack}>
            Voltar
          </button>
          <button type="submit">Continuar</button>
        </div>
      </form>
    </main>
  )
}
