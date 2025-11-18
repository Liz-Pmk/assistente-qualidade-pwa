import React, { useMemo, useState } from 'react'

const KNOWLEDGE_BASE = [
  {
    keywords: ['situação', 'problema', 'dor'],
    answer:
      'Centralizamos checklists e histórico porque Marina reclamou de registros dispersos e risco em auditorias ANVISA/MAPA.'
  },
  {
    keywords: ['pdf', 'documento', 'ficha'],
    answer:
      'Os PDFs ficam em Documentos disponíveis: BPF Alimentos, BPF Fármacos, Limpeza, além das fichas técnicas XY-100 e Z-20.'
  },
  {
    keywords: ['whatsapp', 'contato'],
    answer:
      'Use o botão verde para compartilhar um resumo ou pedir ajuda via WhatsApp. Um texto padrão já está preparado.'
  },
  {
    keywords: ['tela', 'fluxo', 'navegação'],
    answer:
      'O fluxo completo tem 8 telas: Home, Login, Dashboard, Selecionar Contexto, Lista, Execução, Resumo e Histórico.'
  },
  {
    keywords: ['professora', 'matriz'],
    answer:
      'O chatbot reforça a matriz FGV: contexto, solução, persona, protótipo navegável e articulação com a prática.'
  }
]

const SUGGESTIONS = [
  'Onde encontro o checklist BPF?',
  'Como falar com o suporte pelo WhatsApp?',
  'Qual é a situação-problema?',
  'Quais telas compõem o fluxo?',
  'O app já tem PDFs?'
]

const whatsappMessage = encodeURIComponent(
  'Olá! Preciso de apoio do Assistente de Qualidade Omnichannel. Você pode revisar o checklist e o resumo comigo?'
)

export default function SupportWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: 'Oi! Sou o chatbot de atendimento da Marina. Posso tirar dúvidas sobre PDFs, WhatsApp, telas e situação-problema.'
    }
  ])

  const quickTags = useMemo(() => SUGGESTIONS.slice(0, 3), [])

  const resolveAnswer = (question) => {
    const lower = question.toLowerCase()
    const match = KNOWLEDGE_BASE.find((entry) =>
      entry.keywords.some((keyword) => lower.includes(keyword))
    )
    if (match) return match.answer
    return 'Busquei nas referências e sugiro verificar o card da Home com matrizes e PDFs. Posso explicar as telas ou direcionar para o WhatsApp.'
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!input.trim()) return

    const text = input.trim()
    setMessages((prev) => [
      ...prev,
      { from: 'user', text },
      { from: 'bot', text: resolveAnswer(text) }
    ])
    setInput('')
  }

  const handleSuggestion = (suggestion) => {
    setInput(suggestion)
  }

  const handleWhatsApp = () => {
    const url = `https://wa.me/?text=${whatsappMessage}`
    if (typeof window !== 'undefined') {
      window.open(url, '_blank')
    }
  }

  return (
    <div className="support-widget" aria-live="polite">
      {open && (
        <div className="support-chat" role="dialog" aria-label="Assistente de Qualidade">
          <header>
            <div>
              <p>Assistente de Qualidade</p>
              <small>Disponível 24h para dúvidas rápidas</small>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Fechar chatbot">
              ×
            </button>
          </header>
          <div className="support-messages">
            {messages.map((message, index) => (
              <div
                key={`${message.from}-${index}`}
                className={`support-bubble ${message.from === 'user' ? 'user' : 'bot'}`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <form className="support-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              placeholder="Digite e eu busco o que precisa"
              onChange={(event) => setInput(event.target.value)}
            />
            <button type="submit">Enviar</button>
          </form>
          <div className="support-suggestions">
            <p>Perguntas rápidas</p>
            <div>
              {quickTags.map((tag) => (
                <button key={tag} type="button" onClick={() => handleSuggestion(tag)}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <button className="fab whatsapp" type="button" onClick={handleWhatsApp} aria-label="Conversar no WhatsApp">
        WhatsApp
      </button>
      <button className="fab assistant" type="button" onClick={() => setOpen((prev) => !prev)} aria-label="Abrir assistente">
        {open ? 'Fechar assistente' : 'Chat de atendimento'}
      </button>
    </div>
  )
}
