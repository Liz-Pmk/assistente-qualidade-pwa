import React from 'react'

export default function Dashboard({ onNewChecklist, onHistory }) {
  return (
    <main>
      <h2>Painel de Qualidade</h2>
      <section className="card">
        <div className="card-header">Ações rápidas</div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={onNewChecklist}>Novo checklist</button>
          <button className="secondary" onClick={onHistory}>
            Histórico
          </button>
        </div>
      </section>

      <section className="card">
        <div className="card-header">Visão do dia (exemplo)</div>
        <ul style={{ paddingLeft: '18px', fontSize: '0.9rem' }}>
          <li>Checklists concluídos: 5</li>
          <li>Não conformidades abertas: 2</li>
          <li>Tempo médio por checklist: 45 segundos</li>
        </ul>
      </section>
    </main>
  )
}
