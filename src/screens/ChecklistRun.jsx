import React, { useState } from 'react'

const ITENS_EXEMPLO = [
  'Área limpa e organizada',
  'Registro de temperatura atualizado',
  'EPIs corretos em uso',
  'Matérias-primas identificadas'
]

export default function ChecklistRun({ checklist, onBack, onComplete }) {
  const [respostas, setRespostas] = useState({})

  const handleChange = (item, valor) => {
    setRespostas((prev) => ({ ...prev, [item]: valor }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const total = ITENS_EXEMPLO.length
    const conformes = Object.values(respostas).filter(
      (v) => v === 'conforme'
    ).length
    const percentual =
      total === 0 ? 0 : Math.round((conformes / total) * 100)

    onComplete({
      checklistNome: checklist?.nome,
      total,
      conformes,
      percentualConformidade: percentual
    })
  }

  return (
    <main>
      <h2>{checklist?.nome || 'Checklist'}</h2>
      <p style={{ fontSize: '0.9rem' }}>
        Avalie cada item com calma. Se algo não estiver ok, marque “Não
        conforme” e registre observações.
      </p>
      <form onSubmit={handleSubmit}>
        {ITENS_EXEMPLO.map((item) => (
          <fieldset key={item} style={{ marginBottom: '8px' }}>
            <legend style={{ fontSize: '0.9rem' }}>{item}</legend>
            <label style={{ fontSize: '0.9rem', marginRight: '8px' }}>
              <input
                type="radio"
                name={item}
                value="conforme"
                onChange={() => handleChange(item, 'conforme')}
              />{' '}
              Conforme
            </label>
            <label style={{ fontSize: '0.9rem' }}>
              <input
                type="radio"
                name={item}
                value="nao-conforme"
                onChange={() => handleChange(item, 'nao-conforme')}
              />{' '}
              Não conforme
            </label>
          </fieldset>
        ))}

        <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
          <button className="secondary" type="button" onClick={onBack}>
            Cancelar
          </button>
          <button type="submit">Finalizar checklist</button>
        </div>
      </form>
    </main>
  )
}
