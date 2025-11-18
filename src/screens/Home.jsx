import React, { useEffect, useRef, useState } from 'react'

const INITIAL_MESSAGES = [
  {
    from: 'bot',
    text:
      'Oi! Eu sou o Assistente IA da Qualidade. Posso te ajudar a explicar o fluxo, simular uma conversa com um auditor ou lembrar boas práticas antes de você começar.',
    meta: 'Experiência premium e personalizada para times regulados.'
  }
]

const QUICK_PROMPTS = [
  'Como me preparar para uma auditoria?',
  'Como preencher o checklist no app?',
  'Qual valor para a professora?',
  'Como compartilhar o resultado com o time?'
]

const BOT_RESPONSES = [
  {
    keywords: ['auditoria', 'inspeção', 'auditar'],
    text:
      'Comece revisando o histórico de checklists no painel. Veja quais itens tiveram recorrência de não conformidade, já combine ações corretivas e leve evidências fotográficas. Assim, na auditoria você mostra controle e ritmo de melhoria.',
    meta: 'Dica: use o resumo com percentual de conformidade como trilha de conversa com o auditor.'
  },
  {
    keywords: ['checklist', 'preencher', 'execução', 'responder'],
    text:
      'Abra o checklist do contexto certo (ex.: BPF Alimentos), avance item a item e marque Conforme, Não conforme ou Não se aplica. Quando marcar Não conforme descreva o motivo e, se possível, o prazo da correção.',
    meta: 'O app foi desenhado para caber no polegar, com botões grandes e feedback visual imediato.'
  },
  {
    keywords: ['professor', 'professora', 'trabalho'],
    text:
      'A professora consegue enxergar todo o raciocínio de UX: persona definida, dor mapeada, fluxo com 8 telas conectadas, escolhas mobile-first e camada conversacional para humanizar o onboarding.',
    meta: 'Também evidenciamos o uso de Lean UX: hipótese + protótipo + mensuração rápida.'
  },
  {
    keywords: ['compartilhar', 'time', 'whatsapp', 'envio'],
    text:
      'Assim que concluir o checklist, o resumo mostra o percentual de conformidade e os itens críticos. Um toque envia pelo WhatsApp para o grupo e outra cópia fica salva no histórico para auditorias futuras.',
    meta: 'Evite planilhas dispersas: centralize no app e mantenha um storytelling único com o time.'
  }
]

const DEFAULT_RESPONSE = {
  text:
    'Ótima pergunta! Como protótipo educacional, eu mostro como o app guia o usuário, reduz atrito e cria confiança. Pergunte sobre auditorias, UX ou o fluxo de checklist que eu explico melhor.',
  meta: 'Sugestão: clique nos atalhos rápidos abaixo para ver respostas prontas.'
}

export default function Home({ onStartChecklist, onViewHistory }) {
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState(INITIAL_MESSAGES)
  const [isTyping, setIsTyping] = useState(false)
  const typingTimeout = useRef(null)

  useEffect(() => {
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current)
      }
    }
  }, [])

  const getBotResponse = (message) => {
    const lower = message.toLowerCase()
    return (
      BOT_RESPONSES.find((item) =>
        item.keywords.some((keyword) => lower.includes(keyword))
      ) || DEFAULT_RESPONSE
    )
  }

  const queueBotMessage = (message) => {
    const response = getBotResponse(message)
    if (typingTimeout.current) clearTimeout(typingTimeout.current)

    setIsTyping(true)
    typingTimeout.current = setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { from: 'bot', text: response.text, meta: response.meta }
      ])
      setIsTyping(false)
    }, 850)
  }

  const sendMessage = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMessage = { from: 'user', text: trimmed }
    setChatMessages((prev) => [...prev, userMessage])
    setChatInput('')
    queueBotMessage(trimmed)
  }

  const handleSend = (e) => {
    e.preventDefault()
    sendMessage(chatInput)
  }

  const handlePromptClick = (prompt) => {
    sendMessage(prompt)
  }

  const stats = [
    { value: '48', label: 'checklists/dia', detail: 'em uma planta média' },
    { value: '92%', label: 'conformidade média', detail: 'na última inspeção' },
    { value: '3 min', label: 'para fechar um checklist', detail: 'com atalhos e IA' }
  ]

  return (
    <main className="home-layout">
      <section className="hero card">
        <div className="hero-content">
          <p className="eyebrow">Assistente Omnichannel</p>
          <h1>
            Qualidade premium com um chatbot que guia cada inspeção e
            storytelling para auditorias.
          </h1>
          <p className="hero-subtitle">
            Um fluxo completo, mobile-first e conversacional para coordenadoras
            de qualidade em alimentos e fármacos. Integra checklist, resumo,
            histórico e envio instantâneo.
          </p>
          <div className="hero-actions">
            <button onClick={onStartChecklist}>Começar checklist</button>
            <button className="secondary" onClick={onViewHistory}>
              Ver histórico
            </button>
          </div>
        </div>
        <div className="hero-highlight">
          <p>Fluxo em 8 telas</p>
          <strong>Login • Painel • Contexto • Checklist • Resumo • Histórico</strong>
          <span>+ Camada IA para onboarding e defesa do projeto.</span>
        </div>
      </section>

      <section className="insights-grid">
        {stats.map((stat) => (
          <article key={stat.label} className="stat-card card">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <p>{stat.detail}</p>
          </article>
        ))}
      </section>

      <section className="chat-wrapper">
        <div className="chat-panel card">
          <header className="chat-header">
            <div>
              <p className="eyebrow">Chat interativo</p>
              <h2>Assistente IA da Qualidade</h2>
              <p>
                Faça perguntas em linguagem natural. Eu traduzo a metodologia,
                sugiro boas práticas e preparo você para a reunião com a
                professora ou com o auditor.
              </p>
            </div>
            <div className="chat-suggestions">
              {QUICK_PROMPTS.map((prompt) => (
                <button key={prompt} type="button" onClick={() => handlePromptClick(prompt)}>
                  {prompt}
                </button>
              ))}
            </div>
          </header>

          <div className="chat-box premium">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.from === 'user' ? 'align-right' : ''}`}
              >
                <div
                  className={`chat-bubble ${msg.from === 'user' ? 'user' : 'bot'}`}
                >
                  <p>{msg.text}</p>
                  {msg.meta && <span className="chat-meta">{msg.meta}</span>}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chat-message">
                <div className="chat-bubble bot typing">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
          </div>

          <form className="chat-input" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Digite sua pergunta..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button type="submit">Enviar</button>
          </form>
        </div>

        <aside className="assistant-card card">
          <p className="eyebrow">Para a professora</p>
          <h3>
            Mostramos dor, solução, métricas e justificativa de UX em uma única
            narrativa.
          </h3>
          <ul>
            <li>Persona: coordenadora de qualidade regulada pela Anvisa.</li>
            <li>Dor: registros dispersos, risco regulatório e retrabalho.</li>
            <li>
              Solução: fluxo de 8 telas + IA para onboarding e storytelling do
              projeto.
            </li>
            <li>
              Provas: histórico, percentuais e timeline para auditorias e para a
              banca.
            </li>
          </ul>
          <div className="prof-badge">
            <span>FGV / UX</span>
            <p>Prototipado com Lean UX e entregue como PWA mobile-first.</p>
          </div>
        </aside>
      </section>

      <section className="card grid-two">
        <div>
          <div className="card-header">A dor do dia a dia</div>
          <p>
            Para equipes de qualidade em indústrias de alimentos e fármacos é
            comum:
          </p>
          <ul>
            <li>Ter checklists espalhados em papel e planilhas.</li>
            <li>Perder tempo procurando registros antigos.</li>
            <li>Ficar inseguro na véspera de uma auditoria.</li>
            <li>Ter que explicar tudo por WhatsApp e e-mail.</li>
          </ul>
        </div>
        <div>
          <div className="card-header">Como o app ajuda</div>
          <ul>
            <li>Acessar checklists padronizados no celular.</li>
            <li>Marcar conforme / não conforme em poucos toques.</li>
            <li>Ver um resumo com o percentual de conformidade.</li>
            <li>Enviar o resultado pelo WhatsApp para o time.</li>
            <li>Guardar o histórico para futuras auditorias.</li>
          </ul>
        </div>
      </section>

      <section className="card">
        <div className="card-header">Passo a passo rápido</div>
        <ol className="timeline">
          <li>
            Você faz login com e-mail e senha e já vê indicadores em destaque.
          </li>
          <li>Escolhe a planta e a linha/setor que será inspecionada.</li>
          <li>Seleciona o checklist adequado (ex.: BPF Alimentos).</li>
          <li>Responde item a item com apoio da IA para dúvidas pontuais.</li>
          <li>
            No fim, vê o resumo, compartilha via WhatsApp e salva no histórico.
          </li>
        </ol>
      </section>

      <section className="card">
        <div className="card-header">Fontes dos dados (para estudos)</div>
        <p>
          Os exemplos de indicadores e relatórios usados neste app são
          didáticos, mas foram inspirados em documentos públicos de órgãos
          oficiais, como:
        </p>
        <ul>
          <li>
            Relatório de Gestão 2022 da Anvisa, que registra 576 registros
            concedidos de medicamentos e produtos biológicos, 88 registros de
            alimentos e 261 alertas sanitários emitidos no ano.
          </li>
          <li>
            Relatórios de atividades da área de alimentos e de monitoramento
            pós-mercado da Anvisa, com dados sobre inspeções e alertas
            sanitários.
          </li>
        </ul>
        <p>
          No trabalho acadêmico, esses documentos são citados formalmente nas
          referências. No app, eles reforçam a importância de registrar bem as
          rotinas de qualidade.
        </p>
      </section>
    </main>
  )
}
