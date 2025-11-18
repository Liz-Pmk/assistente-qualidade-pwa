import React from 'react'

export default function History({ onBack }) {
  const historicoExemplo = [
    {
      id: 1,
      nome: 'BPF – Alimentos',
      data: '2025-11-10',
      conformidade: '92%'
    },
    {
      id: 2,
      nome: 'BPF – Fármacos',
      data: '2025-11-12',
      conformidade: '88%'
    }
  ]

  return (
    <main>
      <h2>Histórico de checklists</h2>
      <section className="card">
        <ul style={{ paddingLeft: '18px', fontSize: '0.9rem' }}>
          {historicoExemplo.map((item) => (
            <li key={item.id}>
              <strong>{item.nome}</strong> – {item.data} –{' '}
              {item.conformidade} de conformidade
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
