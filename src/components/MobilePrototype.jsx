import React, { useState } from 'react'

const PREVIEW_SCREENS = {
  HOME: 'home',
  MENU_ALIMENTICIO: 'menuAlimenticio',
  MENU_FARMA: 'menuFarma',
  CHECKLISTS: 'checklists',
  FICHAS: 'fichas',
  CONFIRM_WA: 'confirmWa',
  CHAT: 'chatDuvidas',
  WHATSAPP_SIM: 'whatsappSim',
  RESUMO: 'resumo'
}

const SCREEN_TITLES = {
  [PREVIEW_SCREENS.HOME]: { label: 'Home / Contexto', step: 'Tela 1 de 8' },
  [PREVIEW_SCREENS.MENU_ALIMENTICIO]: { label: 'Setor Alimentício', step: 'Tela 2 de 8' },
  [PREVIEW_SCREENS.MENU_FARMA]: { label: 'Setor Farmacêutico', step: 'Tela 2 de 8' },
  [PREVIEW_SCREENS.CHECKLISTS]: { label: 'Checklists Regulatórios', step: 'Tela 3 de 8' },
  [PREVIEW_SCREENS.FICHAS]: { label: 'Fichas Técnicas', step: 'Tela 4 de 8' },
  [PREVIEW_SCREENS.CONFIRM_WA]: { label: 'Solicitar Teste', step: 'Tela 5 de 8' },
  [PREVIEW_SCREENS.CHAT]: { label: 'Tirar Dúvidas', step: 'Tela 6 de 8' },
  [PREVIEW_SCREENS.WHATSAPP_SIM]: { label: 'Simulação WhatsApp', step: 'Tela 7 de 8' },
  [PREVIEW_SCREENS.RESUMO]: { label: 'Encerrar protótipo', step: 'Tela 8 de 8' }
}

const CHECKLIST_OPTIONS = [
  {
    titulo: 'BPF – Boas Práticas de Fabricação',
    descricao: 'Higiene, fluxo de pessoas, documentação.',
    arquivo: '/pdfs/checklist-bpf-alimentos.pdf'
  },
  {
    titulo: 'Rotulagem e Impressão',
    descricao: 'Validade, lote, alergênicos, idioma.',
    arquivo: '/pdfs/checklist-bpf-farmacos.pdf'
  },
  {
    titulo: 'Rastreabilidade e Lote',
    descricao: 'Registros de produção, devoluções, recalls.',
    arquivo: '/pdfs/checklist-limpeza-sanitizacao.pdf'
  }
]

const FICHAS_EXEMPLO = [
  {
    titulo: 'Ficha – Tinta Datadora XY-100',
    descricao: 'Condições de uso, compatibilidade, validade.',
    arquivo: '/pdfs/ficha-tecnica-tinta-xy100.pdf'
  },
  {
    titulo: 'Ficha – Embalagem Primária Z-20',
    descricao: 'Barreiras, temperatura, contato com alimento.',
    arquivo: '/pdfs/ficha-tecnica-embalagem-z20.pdf'
  }
]

export default function MobilePrototype() {
  const [activeScreen, setActiveScreen] = useState(PREVIEW_SCREENS.HOME)
  const [lastMenu, setLastMenu] = useState(PREVIEW_SCREENS.MENU_ALIMENTICIO)
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([
    {
      from: 'bot',
      text:
        'Olá! Sou o assistente virtual de Qualidade. Posso ajudar com dúvidas sobre regulamentação, BPF e como o fluxo de 8 telas funciona.'
    }
  ])
  const [waInput, setWaInput] = useState('')
  const [waMessages, setWaMessages] = useState([
    { from: 'bot', text: 'Olá, Marina! Vamos alinhar o teste piloto.' },
    { from: 'bot', text: 'Para qual equipamento e linha você deseja realizar o teste?' }
  ])

  const handleChatSend = (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const question = chatInput.trim()
    const lower = question.toLowerCase()
    const respostaBase =
      'Em uma versão oficial, eu buscaria normas atualizadas e históricos. No protótipo, explico rapidamente cada parte do fluxo.'

    let resposta = respostaBase
    if (lower.includes('rdc') || lower.includes('alerg')) {
      resposta =
        'A RDC 26/2015 e materiais do MAPA guiam o tratamento de alergênicos. O app pode linkar diretamente para essas normas.'
    } else if (lower.includes('checklist diário') || lower.includes('auditor')) {
      resposta =
        'Checklists digitais facilitam auditorias porque mantêm evidências organizadas por planta, linha e data.'
    } else if (lower.includes('whatsapp')) {
      resposta =
        'O fluxo inclui um passo focado em WhatsApp para simular como a coordenadora compartilha achados com o time.'
    }

    setChatMessages((prev) => [
      ...prev,
      { from: 'user', text: question },
      { from: 'bot', text: resposta }
    ])
    setChatInput('')
  }

  const handleWaSend = (e) => {
    e.preventDefault()
    if (!waInput.trim()) return

    setWaMessages((prev) => [
      ...prev,
      { from: 'user', text: waInput.trim() },
      {
        from: 'bot',
        text: 'Perfeito! Em um piloto real eu salvaria essa informação e sugeriria o checklist mais aderente.'
      }
    ])
    setWaInput('')
  }

  const headerInfo = SCREEN_TITLES[activeScreen]

  const openMenu = (menuKey) => {
    setLastMenu(menuKey)
    setActiveScreen(menuKey)
  }

  const renderHome = () => (
    <div className="screen-home">
      <header>
        <div className="proto-hero">
          <div>
            <p className="eyebrow">Assistente de Qualidade</p>
            <h3>Protótipo PWA – indústrias reguladas</h3>
            <p>
              Centralize checklists, fichas técnicas e dúvidas em um único fluxo mobile pensado para a coordenadora de qualidade.
            </p>
          </div>
        </div>
        <div className="hero-details">
          <p>
            <strong>Persona:</strong> Marina, coordenadora de qualidade.
          </p>
          <p>
            <strong>Problema:</strong> registros dispersos e risco em auditorias.
          </p>
        </div>
      </header>
      <div className="cta-column">
        <button onClick={() => openMenu(PREVIEW_SCREENS.MENU_ALIMENTICIO)}>
          Setor Alimentício (MAPA)
        </button>
        <button
          className="ghost"
          onClick={() => openMenu(PREVIEW_SCREENS.MENU_FARMA)}
        >
          Setor Farmacêutico (ANVISA)
        </button>
      </div>
      <div className="timeline-card">
        <p className="timeline-title">Fluxo das 8 telas</p>
        <ol>
          <li>Home / Contexto</li>
          <li>Menu do setor</li>
          <li>Lista de checklists</li>
          <li>Lista de fichas técnicas</li>
          <li>Confirmação WhatsApp</li>
          <li>Chatbot regulatório</li>
          <li>Simulação no WhatsApp</li>
          <li>Resumo final</li>
        </ol>
      </div>
      <button className="chatlink" onClick={() => setActiveScreen(PREVIEW_SCREENS.CHAT)}>
        Falar com o chatbot de Qualidade
      </button>
    </div>
  )

  const renderMenu = (tipo) => (
    <div className="screen-menu">
      <p className="muted">Escolha a tarefa que representa sua necessidade:</p>
      <div className="menu-grid">
        <button onClick={() => setActiveScreen(PREVIEW_SCREENS.CHECKLISTS)}>
          Checklists regulatórios
        </button>
        <button onClick={() => setActiveScreen(PREVIEW_SCREENS.FICHAS)}>
          Fichas técnicas
        </button>
        <button onClick={() => setActiveScreen(PREVIEW_SCREENS.CONFIRM_WA)}>
          Solicitar teste via WhatsApp
        </button>
        <button onClick={() => setActiveScreen(PREVIEW_SCREENS.CHAT)}>
          Tirar dúvidas (chatbot)
        </button>
      </div>
      {tipo === 'farma' ? (
        <div className="alert-card">
          Outras seções (CAPA, validação, etc.) podem ser adicionadas em versões futuras.
        </div>
      ) : null}
    </div>
  )

  const renderChecklists = () => (
    <div className="list-card">
      {CHECKLIST_OPTIONS.map((item) => (
        <article key={item.titulo}>
          <div>
            <p className="list-title">{item.titulo}</p>
            <p className="list-desc">{item.descricao}</p>
          </div>
          <a className="badge-link" href={item.arquivo} target="_blank" rel="noreferrer">
            PDF
          </a>
        </article>
      ))}
    </div>
  )

  const renderFichas = () => (
    <div className="list-card">
      {FICHAS_EXEMPLO.map((item) => (
        <article key={item.titulo}>
          <div>
            <p className="list-title">{item.titulo}</p>
            <p className="list-desc">{item.descricao}</p>
          </div>
          <a className="badge-link" href={item.arquivo} target="_blank" rel="noreferrer">
            Ficha
          </a>
        </article>
      ))}
    </div>
  )

  const renderConfirmWa = () => (
    <div className="whatsapp-card">
      <p>
        Você será direcionada para uma conversa simulada no WhatsApp com um especialista-bot para alinhar o teste piloto.
      </p>
      <button onClick={() => setActiveScreen(PREVIEW_SCREENS.WHATSAPP_SIM)}>
        Iniciar simulação
      </button>
    </div>
  )

  const renderChat = () => (
    <div className="chat-preview">
      <div className="chat-window">
        {chatMessages.map((msg, index) => (
          <div
            key={`${msg.from}-${index}`}
            className={`bubble ${msg.from === 'user' ? 'user' : 'bot'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form className="chat-input" onSubmit={handleChatSend}>
        <input
          type="text"
          value={chatInput}
          placeholder="Digite sua dúvida..."
          onChange={(e) => setChatInput(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )

  const renderWaSim = () => (
    <div className="chat-preview whatsapp">
      <div className="chat-window">
        {waMessages.map((msg, index) => (
          <div
            key={`${msg.from}-${index}`}
            className={`bubble ${msg.from === 'user' ? 'user' : 'bot'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form className="chat-input" onSubmit={handleWaSend}>
        <input
          type="text"
          value={waInput}
          placeholder="Digite sua mensagem..."
          onChange={(e) => setWaInput(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )

  const renderResumo = () => (
    <div className="resumo-card">
      <p>Esta tela funciona como o último passo para reforçar que o fluxo está completo.</p>
      <ul>
        <li>Consultar checklists e fichas técnicas.</li>
        <li>Solicitar teste guiado por WhatsApp.</li>
        <li>Tirar dúvidas rápidas com o chatbot.</li>
        <li>Retornar ao menu ou à Home.</li>
      </ul>
      <button onClick={() => setActiveScreen(PREVIEW_SCREENS.HOME)}>Voltar para a Home</button>
    </div>
  )

  const renderCurrentScreen = () => {
    switch (activeScreen) {
      case PREVIEW_SCREENS.HOME:
        return renderHome()
      case PREVIEW_SCREENS.MENU_ALIMENTICIO:
        return renderMenu('alimentos')
      case PREVIEW_SCREENS.MENU_FARMA:
        return renderMenu('farma')
      case PREVIEW_SCREENS.CHECKLISTS:
        return renderChecklists()
      case PREVIEW_SCREENS.FICHAS:
        return renderFichas()
      case PREVIEW_SCREENS.CONFIRM_WA:
        return renderConfirmWa()
      case PREVIEW_SCREENS.CHAT:
        return renderChat()
      case PREVIEW_SCREENS.WHATSAPP_SIM:
        return renderWaSim()
      case PREVIEW_SCREENS.RESUMO:
        return renderResumo()
      default:
        return null
    }
  }

  const canGoBack = activeScreen !== PREVIEW_SCREENS.HOME

  return (
    <div className="phone-shell">
      <div className="phone-header">
        <div>
          <p className="step">{headerInfo?.step}</p>
          <p className="title">{headerInfo?.label}</p>
        </div>
        {canGoBack && (
          <button
            type="button"
            className="ghost"
            onClick={() => {
              if (
                activeScreen === PREVIEW_SCREENS.MENU_ALIMENTICIO ||
                activeScreen === PREVIEW_SCREENS.MENU_FARMA
              ) {
                setActiveScreen(PREVIEW_SCREENS.HOME)
              } else if (
                activeScreen === PREVIEW_SCREENS.CHECKLISTS ||
                activeScreen === PREVIEW_SCREENS.FICHAS ||
                activeScreen === PREVIEW_SCREENS.CONFIRM_WA
              ) {
                setActiveScreen(lastMenu)
              } else if (activeScreen === PREVIEW_SCREENS.CHAT) {
                setActiveScreen(lastMenu)
              } else if (activeScreen === PREVIEW_SCREENS.WHATSAPP_SIM) {
                setActiveScreen(PREVIEW_SCREENS.CONFIRM_WA)
              } else {
                setActiveScreen(PREVIEW_SCREENS.HOME)
              }
            }}
          >
            Voltar
          </button>
        )}
      </div>
      <div className="phone-screen">{renderCurrentScreen()}</div>
      {activeScreen !== PREVIEW_SCREENS.RESUMO && (
        <div className="footer-nav">
          <button
            type="button"
            className="ghost"
            onClick={() => setActiveScreen(PREVIEW_SCREENS.RESUMO)}
          >
            Ir para o resumo
          </button>
        </div>
      )}
    </div>
  )
}
