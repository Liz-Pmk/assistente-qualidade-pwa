import React, { useState } from 'react'

export default function Home({ onStartChecklist, onViewHistory }) {
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([
    {
      from: 'bot',
      text:
        'Oi! Eu sou o Assistente de Qualidade. Posso te explicar como usar o app ou tirar dúvidas sobre checklists e auditorias.'
    }
  ])

  const handleSend = (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userText = chatInput.trim()
    const userMessage = { from: 'user', text: userText }

    let botText =
      'Boa pergunta! Como sou um protótipo educacional, aqui eu mostro exemplos simples de como o app pode apoiar a rotina de qualidade.'

    const lower = userText.toLowerCase()

    if (lower.includes('auditoria')) {
      botText =
        'Para se preparar para uma auditoria, você pode revisar o histórico de checklists no app, ver os percentuais de conformidade e já corrigir as não conformidades antes da visita.'
    } else if (lower.includes('checklist') || lower.includes('preencher')) {
      botText =
        'Na hora de preencher o checklist, vá item a item olhando a realidade da linha. Marque “Não conforme” quando algo não estiver ok e use o campo de observações para explicar o motivo.'
    } else if (lower.includes('professor') || lower.includes('professora')) {
      botText =
        'Para a professora, o app mostra claramente o problema, a solução proposta, a persona, o fluxo de 8 telas e a aplicação dos conceitos de UX e Lean UX vistos na disciplina.'
    }

    const botMessage = { from: 'bot', text: botText }

    setChatMessages((prev) => [...prev, userMessage, botMessage])
    setChatInput('')
  }

  return (
    <main>
      {/* HERO PARA USUÁRIO */}
      <section>
        <h1>Assistente de Qualidade Omnichannel</h1>
        <p>
          Um app simples para ajudar equipes de qualidade a fazer checklists,
          registrar inspeções e se preparar melhor para auditorias.
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={onStartChecklist}>Começar checklist</button>
          <button className="secondary" onClick={onViewHistory}>
            Ver histórico
          </button>
        </div>
      </section>

      {/* DOR DO PÚBLICO-ALVO */}
      <section className="card">
        <div className="card-header">A dor do dia a dia</div>
        <p style={{ fontSize: '0.9rem' }}>
          Para quem trabalha com qualidade em indústrias de alimentos e
          fármacos, é comum:
        </p>
        <ul style={{ paddingLeft: '18px', fontSize: '0.9rem' }}>
          <li>ter checklists espalhados em papel e planilhas;</li>
          <li>perder tempo procurando registros antigos;</li>
          <li>ficar inseguro na véspera de uma auditoria;</li>
          <li>ter que explicar tudo por WhatsApp e e-mail.</li>
        </ul>
        <p style={{ fontSize: '0.9rem' }}>
          O objetivo do app é juntar tudo isso em um fluxo simples, direto no
          celular.
        </p>
      </section>

      {/* SOLUÇÃO EM LINGUAGEM FÁCIL */}
      <section className="card">
        <div className="card-header">Como o app ajuda</div>
        <ul style={{ paddingLeft: '18px', fontSize: '0.9rem' }}>
          <li>Acessar checklists padronizados no celular.</li>
          <li>Marcar conforme / não conforme em poucos toques.</li>
          <li>Ver um resumo com o percentual de conformidade.</li>
          <li>Enviar o resultado pelo WhatsApp para o time.</li>
          <li>Guardar o histórico para futuras auditorias.</li>
        </ul>
      </section>

      {/* CARDS PARA A PROFESSORA (JUSTIFICATIVA ACADÊMICA) */}
      <section className="card">
        <div className="card-header">
          Para a professora
          <span className="badge-prof">FGV / UX</span>
        </div>
        <p style={{ fontSize: '0.9rem' }}>
          Esta solução foi pensada com base na disciplina de UX e Plataformas
          Digitais:
        </p>
        <ul style={{ paddingLeft: '18px', fontSize: '0.9rem' }}>
          <li>Começa pela persona (coordenadora de qualidade).</li>
          <li>
            Trabalha a situação-problema: registros dispersos, risco regulatório
            e retrabalho.
          </li>
          <li>
            Aplica Lean UX: protótipo mínimo, foco no fluxo principal e testes
            de uso.
          </li>
          <li>
            Entrega 8 telas em fluxo completo: login, painel, contexto,
            checklists, execução, resumo e histórico.
          </li>
          <li>
            Usa PWA e mobile-first para espelhar a realidade de uso no chão de
            fábrica.
          </li>
        </ul>
      </section>

      {/* CHATBOT EDUCATIVO */}
      <section className="card">
        <div className="card-header">Chat com o Assistente IA</div>
        <p style={{ fontSize: '0.9rem' }}>
          Use mensagens simples. Exemplo: “como me preparar para auditoria?”,
          “como preencher o checklist?”.
        </p>
        <div className="chat-box">
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className="chat-message"
              style={{ textAlign: msg.from === 'user' ? 'right' : 'left' }}
            >
              <span
                className={
                  'chat-bubble ' + (msg.from === 'user' ? 'user' : 'bot')
                }
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSend}
          style={{ display: 'flex', gap: '8px', marginTop: '8px' }}
        >
          <input
            type="text"
            placeholder="Digite sua pergunta..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            style={{
              flex: 1,
              padding: '6px 8px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}
          />
          <button type="submit">Enviar</button>
        </form>
      </section>

      {/* PASSO A PASSO RÁPIDO */}
      <section className="card">
        <div className="card-header">Passo a passo rápido</div>
        <ol style={{ paddingLeft: '18px', fontSize: '0.9rem' }}>
          <li>Você faz login com seu e-mail e senha.</li>
          <li>Escolhe a planta e a linha/setor que será inspecionada.</li>
          <li>Seleciona o checklist adequado (ex.: BPF Alimentos).</li>
          <li>Vai respondendo item a item no celular.</li>
          <li>
            No fim, vê o resumo e pode enviar via WhatsApp e salvar no
            histórico.
          </li>
        </ol>
      </section>

      {/* FONTES DOS DADOS – ANVISA (EXEMPLOS REAIS) */}
      <section className="card">
        <div className="card-header">Fontes dos dados (para estudos)</div>
        <p style={{ fontSize: '0.9rem' }}>
          Os exemplos de indicadores e relatórios usados neste app são
          didáticos, mas foram inspirados em documentos públicos de órgãos
          oficiais, como:
        </p>
        <ul style={{ paddingLeft: '18px', fontSize: '0.9rem' }}>
          <li>
            Relatório de Gestão 2022 da Anvisa, que registra, por exemplo, 576
            registros concedidos de medicamentos e produtos biológicos, 88
            registros de alimentos e 261 alertas sanitários emitidos no ano.
          </li>
          <li>
            Relatórios de gestão e de atividades da área de alimentos e de
            monitoramento pós-mercado da Anvisa, com dados sobre inspeções e
            alertas sanitários.
          </li>
        </ul>
        <p style={{ fontSize: '0.9rem' }}>
          No trabalho acadêmico, esses documentos são citados formalmente nas
          referências. No app, eles servem apenas como base conceitual para
          reforçar a importância de registrar bem as rotinas de qualidade.
        </p>
      </section>
    </main>
  )
}
