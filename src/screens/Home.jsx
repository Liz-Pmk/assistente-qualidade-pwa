import React, { useState } from 'react'

export default function Home({ onStartChecklist, onViewHistory }) {
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([
    {
      from: 'bot',
      text:
        'Oi! Eu sou o Assistente de Qualidade. Posso te explicar o trabalho acadêmico, as 8 telas do protótipo e como tudo se conecta à matriz da disciplina.'
    }
  ])

  const handleSend = (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userText = chatInput.trim()
    const lower = userText.toLowerCase()
    const userMessage = { from: 'user', text: userText }

    let botText =
      'Posso comentar sobre: situação-problema, persona, concorrência, cada uma das 8 telas, matriz FGV, matriz UX ou como tudo isso ajuda na prática da qualidade.'

    // Situação-problema / dor
    if (lower.includes('situação') || lower.includes('problema') || lower.includes('dor')) {
      botText =
        'A situação-problema é a rotina de qualidade em indústrias de alimentos e fármacos com registros dispersos (papel, planilhas, mensagens), risco regulatório alto e dificuldade de se preparar para auditorias. O app organiza checklists, resumo e histórico em um fluxo único no celular.'
    }

    // Persona
    else if (lower.includes('persona')) {
      botText =
        'A persona principal é a coordenadora de qualidade de uma indústria regulada, responsável por garantir conformidade com ANVISA/MAPA, organizar auditorias e treinar o time. Ela precisa de agilidade, centralização de dados e segurança na tomada de decisão antes de auditorias.'
    }

    // Concorrência
    else if (lower.includes('concorrência') || lower.includes('concorrente')) {
      botText =
        'A concorrência inclui sistemas de gestão da qualidade mais complexos e planilhas personalizadas. O protótipo se posiciona como solução mobile-first, mais simples e focada em checklists de rotina, resumo rápido e compartilhamento via WhatsApp.'
    }

    // Matrizes
    else if (lower.includes('matriz fgv') || lower.includes('rubrica') || lower.includes('avaliação')) {
      botText =
        'A matriz FGV avalia: organização formal, atendimento ao comando da questão, desenvolvimento do raciocínio, associação com a disciplina e articulação com a prática. A versão refinada do trabalho explicita a situação-problema, descreve solução, persona, concorrência e protótipo, conectando tudo à experiência real de qualidade.'
    } else if (lower.includes('matriz ux') || lower.includes('matriz do projeto') || lower.includes('matriz de ux')) {
      botText =
        'Na matriz UX do projeto, o protótipo é mapeado para: contextualização da dor, definição da solução, análise de concorrência, persona, protótipo navegável (8 telas) e uso de PWA/IA para apoiar a experiência do usuário e o aprendizado na disciplina.'
    }

    // Telas específicas
    else if (lower.includes('tela inicial') || lower.includes('home') || lower.includes('primeira tela')) {
      botText =
        'A tela inicial apresenta o nome do app, a dor do público-alvo, um resumo da solução, os links para começar o checklist ou ver histórico e, nesta versão, um resumo do trabalho e das matrizes, além do chatbot para tirar dúvidas da professora e da persona.'
    } else if (lower.includes('login')) {
      botText =
        'A tela de login garante acesso individualizado. Na prática, para o trabalho, ela mostra que o protótipo respeita o requisito mínimo de cadastro (usuario/senha) mencionado pela professora e reflete um cenário básico de segurança e rastreabilidade.'
    } else if (lower.includes('dashboard') || lower.includes('painel')) {
      botText =
        'O dashboard sintetiza as ações principais: iniciar novo checklist, ver histórico e visualizar indicadores simples (checklists concluídos, não conformidades e tempo médio). Ele conecta a teoria de UX (foco em tarefas principais) com a prática da coordenadora de qualidade.'
    } else if (lower.includes('contexto') || lower.includes('selecionar contexto')) {
      botText =
        'A tela de seleção de contexto pede planta e linha/setor. Ela operacionaliza a necessidade de contextualizar os dados de inspeção, permitindo que, na prática, os registros sejam filtrados por área da fábrica e usados em auditorias e relatórios.'
    } else if (lower.includes('lista de checklist') || lower.includes('lista de checklists') || lower.includes('checklist') && lower.includes('lista')) {
      botText =
        'A lista de checklists apresenta opções como BPF Alimentos (ANVISA/MAPA), BPF Fármacos (ANVISA) e Limpeza. Ela traduz a teoria em listas concretas, ligadas à regulação vigente, e permite testar a usabilidade de seleção pelo usuário.'
    } else if (lower.includes('execução') || lower.includes('rodar checklist') || lower.includes('preencher checklist')) {
      botText =
        'A tela de execução do checklist exibe itens como área limpa, temperatura, EPIs e identificação de matérias-primas. A prática é marcar conforme/não conforme e usar observações. Essa tela é o “coração” da solução, pois responde diretamente à dor de registrar inspeções de forma rápida.'
    } else if (lower.includes('resumo') || lower.includes('summary')) {
      botText =
        'A tela de resumo calcula itens avaliados, conformes e percentual de conformidade. Ela permite compartilhar o resultado via WhatsApp, unindo o requisito omnichannel com a necessidade prática de comunicar rapidamente achados ao time ou à gestão.'
    } else if (lower.includes('histórico') || lower.includes('historico')) {
      botText =
        'A tela de histórico mostra checklists anteriores com data e percentual de conformidade. Ela materializa a articulação entre teoria e prática: serve tanto para aprendizado (ver exemplos) quanto para preparar auditorias futuras.'
    }

    // Perguntas sobre "como usar as 8 telas na prática"
    else if (lower.includes('como usar') || lower.includes('aplicação prática') || lower.includes('como funciona tudo') || lower.includes('8 telas')) {
      botText =
        'Na prática: 1) você acessa a HOME e entende o contexto; 2) faz LOGIN; 3) no DASHBOARD, escolhe “Novo checklist”; 4) define o CONTEXTO (planta/linha); 5) escolhe o CHECKLIST; 6) EXECUTA item a item; 7) vê o RESUMO, compartilha se quiser pelo WhatsApp; 8) depois consulta o HISTÓRICO. Esse fluxo completo demonstra a aplicação dos conceitos de UX e responde ponto a ponto à matriz da atividade.'
    }

    // Dúvidas da professora especificamente
    else if (lower.includes('professora') || lower.includes('professor') || lower.includes('neila')) {
      botText =
        'Para a professora, esta versão evidencia: a situação-problema (dor da persona), a solução proposta (fluxo mobile-first com 8 telas), a concorrência, a persona, a justificativa teórica e a articulação com a prática da qualidade. A HOME inclui duas matrizes: a matrizada avaliação FGV e uma matriz do projeto, mapeando cada tela e decisão de UX aos critérios da disciplina.'
    }

    const botMessage = { from: 'bot', text: botText }

    setChatMessages((prev) => [...prev, userMessage, botMessage])
    setChatInput('')
  }

  return (
    <main>
      {/* HERO DO APP */}
      <section>
        <h1>Assistente de Qualidade Omnichannel</h1>
        <p>
          Protótipo mobile-first em formato PWA para apoiar equipes de qualidade
          em indústrias reguladas (Alimentos – ANVISA/MAPA e Fármacos – ANVISA),
          centralizando checklists, resumos e histórico.
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={onStartChecklist}>Começar checklist</button>
          <button className="secondary" onClick={onViewHistory}>
            Ver histórico
          </button>
        </div>
      </section>

      {/* RESUMO DO TRABALHO ACADÊMICO */}
      <section className="card">
        <div className="card-header">Resumo do trabalho (FGV – UX e Plataformas Digitais)</div>
        <p style={{ fontSize: '0.9rem' }}>
          Este protótipo foi desenvolvido como atividade individual da disciplina
          UX: User Experience e Plataformas Digitais. O objetivo é demonstrar, na
          prática, o ciclo completo de UX: contextualização da situação-problema,
          definição da solução, análise de concorrência, persona, protótipo
          navegável (8 telas) e justificativa teórica aplicada à rotina de
          qualidade em indústrias reguladas.
        </p>
      </section>

      {/* SITUAÇÃO-PROBLEMA / DOR */}
      <section className="card">
        <div className="card-header">Situação-problema: dor do público-alvo</div>
        <p style={{ fontSize: '0.9rem' }}>
          A coordenadora de qualidade convive com checklists em papel, planilhas
          fragmentadas e registros dispersos em e-mails e mensagens. Na véspera
          de auditorias (internas ou externas), há risco de não encontrar
          evidências, de repetir erros já identificados e de não conseguir
          mostrar uma visão consolidada de conformidade.
        </p>
        <p style={{ fontSize: '0.9rem' }}>
          O app proposto centraliza checklists padronizados, resumo de
          conformidade e histórico em um fluxo único, acessível pelo celular, com
          possibilidade de compartilhar resultados via WhatsApp.
        </p>
      </section>

      {/* RESUMO DAS 8 TELAS */}
      <section className="card">
        <div className="card-header">Fluxo das 8 telas do protótipo</div>
        <ol style={{ paddingLeft: '18px', fontSize: '0.9rem' }}>
          <li><strong>Home:</strong> apresenta a dor, a solução, o resumo do trabalho, matrizes e chatbot.</li>
          <li><strong>Login:</strong> acesso com e-mail e senha (demonstração para a professora).</li>
          <li><strong>Dashboard:</strong> ações principais (novo checklist, histórico, visão do dia).</li>
          <li><strong>Selecionar contexto:</strong> escolha de planta e linha/setor da inspeção.</li>
          <li><strong>Lista de checklists:</strong> BPF Alimentos (ANVISA/MAPA), BPF Fármacos (ANVISA), Limpeza.</li>
          <li><strong>Execução do checklist:</strong> marcação conforme/não conforme e observações.</li>
          <li><strong>Resumo:</strong> cálculo de conformidade e compartilhamento via WhatsApp.</li>
          <li><strong>Histórico:</strong> visão de checklists realizados, datas e percentuais de conformidade.</li>
        </ol>
      </section>

      {/* MATRIZ 1 – RUBRICA FGV */}
      <section className="card">
        <div className="card-header">Matriz 1 – Rubrica da atividade (FGV)</div>
        <p style={{ fontSize: '0.9rem' }}>
          A rubrica utilizada na correção do trabalho considera quatro eixos
          principais:
        </p>
        <ul style={{ paddingLeft: '18px', fontSize: '0.9rem' }}>
          <li>
            <strong>Aspectos formais (organização):</strong> estrutura do trabalho,
            organização e aderência ao modelo proposto.
          </li>
          <li>
            <strong>Atendimento ao comando da questão:</strong> resposta clara aos
            itens solicitados na matriz da disciplina (contextualização, solução,
            concorrência, persona, protótipo).
          </li>
          <li>
            <strong>Desenvolvimento do raciocínio:</strong> profundidade da
            explicação, qualidade da análise e conexão entre as partes.
          </li>
          <li>
            <strong>Associação às temáticas da disciplina:</strong> uso de
            conceitos de UX e material complementar, além da articulação com a
            prática profissional.
          </li>
        </ul>
        <p style={{ fontSize: '0.9rem' }}>
          Esta versão do protótipo busca evidenciar explicitamente cada um desses
          critérios na própria interface, facilitando a avaliação pela docente.
        </p>
      </section>

      {/* MATRIZ 2 – MATRIZ DO PROJETO UX */}
      <section className="card">
        <div className="card-header">Matriz 2 – Projeto UX & Plataformas Digitais</div>
        <p style={{ fontSize: '0.9rem' }}>
          A matriz do projeto UX relaciona elementos do trabalho com o protótipo:
        </p>
        <ul style={{ paddingLeft: '18px', fontSize: '0.9rem' }}>
          <li>
            <strong>Contextualização da dor:</strong> apresentada na HOME e detalhada
            no texto de situação-problema.
          </li>
          <li>
            <strong>Descrição da solução:</strong> fluxo das 8 telas e resumo na HOME,
            mostrando como o app atende a necessidade da persona.
          </li>
          <li>
            <strong>Análise de concorrência:</strong> comparações com sistemas de
            gestão da qualidade e planilhas, reforçando o diferencial mobile-first.
          </li>
          <li>
            <strong>Persona:</strong> coordenadora de qualidade, articulada às rotinas
            regulatórias e à preparação para auditorias.
          </li>
          <li>
            <strong>Protótipo navegável:</strong> 8 telas implementadas, com PWA,
            facilitando uso em smartphone.
          </li>
          <li>
            <strong>Aplicação de IA:</strong> chatbot educacional na HOME para apoiar
            uso do app e explicitar a ponte entre teoria e prática.
          </li>
        </ul>
      </section>

      {/* CHATBOT REFINADO */}
      <section className="card">
        <div className="card-header">Chatbot – aplicação prática das 8 telas</div>
        <p style={{ fontSize: '0.9rem' }}>
          Faça perguntas em linguagem simples, como: “qual a situação-problema?”,
          “o que a tela de resumo mostra?”, “como o fluxo das 8 telas responde à
          matriz FGV?” ou “como isso ajuda na auditoria?”.
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
            placeholder="Digite sua pergunta sobre o app ou a matriz..."
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
    </main>
  )
}
