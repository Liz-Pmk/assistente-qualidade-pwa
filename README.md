# Assistente de Qualidade Omnichannel

Aplicativo PWA criado em React + Vite para apoiar equipes de qualidade na
execução de checklists regulatórios em indústrias de alimentos e fármacos. O
fluxo mobile-first cobre login, seleção de contexto, escolha de checklist,
execução, resumo compartilhável e histórico, além de um chatbot educativo para
perguntas rápidas.

## Tecnologias principais
- React 18 com Vite e suporte a JSX moderno.
- `vite-plugin-pwa` para manifest, cache e instalação.
- Estilos globais mobile-first definidos em `src/styles.css`.
- Componentização por telas em `src/screens/*` controladas por estado em
  `src/App.jsx`.

## Estrutura de telas
1. **Home** – apresenta a proposta e o chatbot de apoio.
2. **Login** – coleta e valida credenciais simuladas.
3. **Painel** – ações rápidas, indicadores e navegação.
4. **Seleção de contexto** – planta e linha/setor.
5. **Lista de checklists** – escolha do formulário adequado.
6. **Execução** – avaliação item a item e cálculo de conformidade.
7. **Resumo** – percentuais, CTA para WhatsApp e retorno ao painel.
8. **Histórico** – registros anteriores para auditorias.

## Como executar
1. Instale as dependências com `npm install`.
2. Suba o modo desenvolvimento com `npm run dev` e acesse o endereço exibido.
3. Para gerar a versão final, use `npm run build` seguido de `npm run preview`.

> **Nota:** Neste ambiente de avaliação, o acesso ao registro npm pode estar
> bloqueado. Caso `npm install` retorne erro 403, utilize uma rede com acesso ao
> `registry.npmjs.org` ou configure um mirror interno antes de rodar os scripts.
