# DevCurrency

> Painel de ações e fundos imobiliários da B3, com dados em tempo real.

[![Deploy](https://img.shields.io/badge/deploy-vercel-black?logo=vercel)](https://devcurrencybr.vercel.app/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Made with React](https://img.shields.io/badge/react-18-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/typescript-strict-3178C6?logo=typescript)](https://www.typescriptlang.org/)

**[🔗 Acessar o projeto no ar](https://devcurrencybr.vercel.app/)**

<!--
  TODO: adicionar um screenshot ou GIF aqui, mostrando a tabela,
  a busca com autocomplete, e/ou a troca de tema. Uma imagem vale
  mais que qualquer parágrafo de descrição.

  ![Preview do DevCurrency](./docs/preview.png)
-->

---

## Sobre o projeto

O DevCurrency nasceu durante o curso do **Sujeito Programador**, como exercício prático de React. A versão original era simples: uma tela, uma tabela, alguns dados vindos de uma API.

Depois de concluído, o projeto foi retomado como campo de testes pessoal — não pra terminar um exercício, mas pra ver até onde daria pra levá-lo sozinho, aplicando (e aprendendo) conceitos num projeto que já existia, em vez de começar do zero. Foi aqui que pratiquei, pela primeira vez num contexto real, componentização de verdade, hooks customizados, testes automatizados, e um pipeline de CI.

📖 A história completa está contada na [página Sobre](https://devcurrencybr.vercel.app/about) do próprio site.

## Funcionalidades

**Listagem e navegação**
- Tabela de ações e FIIs com paginação controlada
- Filtro por tipo de ativo (Ação / FII)
- Ordenação por preço, volume, variação, valor de mercado ou nome — com alternância entre crescente/decrescente
- Busca por ticker com autocomplete (debounced), incluindo estado de "nenhum resultado encontrado"

**Página de detalhe do ativo**
- Preço atual, variação do dia, abertura e fechamento anterior
- Faixa de preço do dia e das 52 semanas, com indicador visual de posição
- Indicadores fundamentalistas (P/L, LPA) quando disponíveis
- Tooltips explicando cada métrica, sem depender de JavaScript (CSS puro)

**Personalização**
- Tema claro/escuro, com persistência entre sessões e transição animada
- Sistema de favoritos (salvo localmente, sem precisar de conta/login)
- Layout responsivo, incluindo uma tabela que vira cards empilhados no mobile e um menu hambúrguer

**Qualidade**
- Suíte de testes automatizados (funções puras, hooks customizados e componentes)
- Integração contínua via GitHub Actions, rodando type-check, testes e build a cada Pull Request

## Tecnologias

| Categoria | Tecnologia |
|---|---|
| Base | [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org/) |
| Build | [Vite](https://vitejs.dev) |
| Roteamento | [React Router](https://reactrouter.com) |
| Estilos | CSS Modules (sem framework de UI) |
| Testes | [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) |
| CI/CD | GitHub Actions + [Vercel](https://vercel.com) |
| Dados de mercado | [BRAPI](https://brapi.dev) — API gratuita e open-source para o mercado financeiro brasileiro |

## Arquitetura

Alguns aspectos da organização do código que foram decisões deliberadas, não acidente:

- **Componentização por domínio**, não por tipo de arquivo — componentes agrupados por assunto (`asset-table/`, `search/`, `ui/`) em vez de uma pasta `components/` única com tudo misturado.
- **Hooks customizados** extraídos sempre que uma lógica se repetia em mais de um lugar
- **Camada de API isolada** (`services/`), separando duas fontes de dados diferentes da BRAPI (listagem paginada vs. cotação individual detalhada), cada uma com seus próprios tipos.
- **Testes cobrindo o que realmente importa**: não só funções triviais, mas casos de borda reais (ex: os limites exatos de quando a paginação mostra ou esconde reticências) e um bug real que só foi pego graças a um teste (função atualizadora sendo salva incorretamente no `localStorage`).

## Como rodar localmente

### Pré-requisitos
- Node.js 18+ (recomendado 20+)
- Uma chave de API gratuita da [BRAPI](https://brapi.dev/dashboard)

### Passos

```bash
# Clone o repositório
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
cd SEU-REPOSITORIO

# Instale as dependências
npm install

# Configure sua chave da API
cp .env.example .env
# edite o .env e adicione sua chave:
# VITE_COINCAP_API_KEY=sua_chave_aqui

# Rode o projeto
npm run dev
```

O projeto sobe por padrão em `http://localhost:5173`.

### Testes

```bash
npm run test:watch        # modo watch
npm run test              # roda uma vez só (usado no CI)
```

### Build de produção

```bash
npm run build
```

## Estrutura do projeto

```
src/
├── assets/              # imagens e ícones estáticos
├── components/
│   ├── layout/          # Header, Layout, Logo
│   ├── ticker-table/    # Tabela, filtro, ordenação
│   ├── search/          # Busca com autocomplete
│   └── ui/              # Componentes genéricos (Pagination, Loading, RangeBar)
├── hooks/               # useLocalStorageState, useDebounce, useClickOutside
├── pages/               # Home, Detail, Favorites, About, NotFound
├── services/            # Integração com a API da BRAPI
├── types/               # Tipos TypeScript compartilhados
└── utils/               # Funções de formatação (moeda, percentual, números)
```

## Autor

Feito por **Pedro** — desenvolvedor focado em React e TypeScript.

- GitHub: [@Pedro-Castr](https://github.com/Pedro-Castr)
- LinkedIn: [pedro-castr](https://www.linkedin.com/in/pedro-castr/)

Encontrou um bug ou tem uma ideia de feature? [Abra uma issue](https://github.com/Pedro-Castr/devcurrency/issues/new).

## Licença

Este projeto está sob a licença MIT — veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

<sub>Os dados exibidos são fornecidos pela <a href="https://brapi.dev">brapi.dev</a> e têm fins educacionais. O DevCurrency não é uma fonte oficial de dados e não deve ser usado como base única para decisões de investimento.</sub>
