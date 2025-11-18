import React from 'react'

export default function Summary({ result, onBackToDashboard }) {
  if (!result) {
    return (
      <main>
        <h2>Resumo</h2>
        <p>Nenhum checklist foi encontrado.</p>
        <button onClick={onBackToDashboard}>Voltar ao painel</button>
      </main>
    )
  }

  const { checklistNome, total, conformes, percentualConformidade } = result

  const whatsappLink =
    'https://wa.me/?text=' +
    encodeURIComponent(
      `Resumo do checklist: ${checklistNome}\nItens avaliados: ${total}\nConformes: ${conformes}\nConformidade: ${percentualConformidade}%`
    )

  return (
    <main>
      <h2>Resumo do checklist</h2>

      <section className="card">
        <ul style={{ paddingLeft: '18px', fontSize: '0.9rem' }}>
          <li>Checklist: {checklistNome}</li>
          <li>Itens avaliados: {total}</li>
          <li>Itens conformes: {conformes}</li>
          <li>Conformidade: {percentualConformidade}%</li>
        </ul>
      </section>

      <section className="card">
        <div className="card-header">Ações</div>
        <p style={{ fontSize: '0.9rem' }}>
          Você pode enviar esse resumo para o responsável pelo WhatsApp, por
          exemplo, ou usar em uma reunião de auditoria interna.
        </p>
        <a href={whatsappLink} target="_blank" rel="noreferrer">
          <button>Enviar resumo via WhatsApp</button>
        </a>
      </section>

      <button className="secondary" onClick={onBackToDashboard}>
        Voltar ao painel
      </button>
    </main>
  )
}
