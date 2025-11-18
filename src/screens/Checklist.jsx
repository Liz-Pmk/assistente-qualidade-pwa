import React from 'react'

const CHECKLISTS = [
  { id: 1, nome: 'BPF – Alimentos (ANVISA/MAPA)' },
  { id: 2, nome: 'BPF – Fármacos (ANVISA)' },
  { id: 3, nome: 'Limpeza e Sanitização' }
]

export default function Checklist({ onBack, onSelectChecklist }) {
  return (
    <main>
      <h2>Escolher checklist</h2>
      <p style={{ fontSize: '0.9rem' }}>
        Selecione o checklist mais adequado para a inspeção que você vai fazer.
      </p>
      <section className="card">
        <ul style={{ paddingLeft: '0', listStyle: 'none', margin: 0 }}>
          {CHECKLISTS.map((c) => (
            <li key={c.id} style={{ marginBottom: '8px' }}>
              <button
                style={{ width: '100%', textAlign: 'left' }}
                onClick={() => onSelectChecklist(c)}
              >
                {c.nome}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <button className="secondary" onClick={onBack}>
        Voltar
      </button>
    </main>
  )
}
