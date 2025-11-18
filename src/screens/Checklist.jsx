import React from 'react'

const CHECKLISTS = [
  {
    id: 1,
    nome: 'BPF – Alimentos (ANVISA/MAPA)',
    arquivo: '/pdfs/checklist-bpf-alimentos.pdf'
  },
  {
    id: 2,
    nome: 'BPF – Fármacos (ANVISA)',
    arquivo: '/pdfs/checklist-bpf-farmacos.pdf'
  },
  {
    id: 3,
    nome: 'Limpeza e Sanitização',
    arquivo: '/pdfs/checklist-limpeza-sanitizacao.pdf'
  }
]

export default function Checklist({ onBack, onSelectChecklist }) {
  return (
    <main>
      <h2>Escolher checklist</h2>
      <p style={{ fontSize: '0.9rem' }}>
        Selecione o checklist mais adequado para a inspeção que você vai fazer.
      </p>
      <section className="card">
        <ul className="checklist-downloads">
          {CHECKLISTS.map((c) => (
            <li key={c.id}>
              <div>
                <p>{c.nome}</p>
                <a href={c.arquivo} target="_blank" rel="noreferrer">
                  Baixar PDF
                </a>
              </div>
              <button onClick={() => onSelectChecklist(c)}>Usar este checklist</button>
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
