# Validação visual — Observatório de Campo

## Verificações concluídas

| Cenário | Resultado |
|---|---|
| Tela ampla, 1440 × 1000 | A hero, a régua de progresso, as estações de investigação, as imagens documentais e o painel de envio foram renderizados sem sobreposição visual. |
| Tela móvel, 390 × 844 | O cabeçalho, a identificação, as opções, os campos dissertativos e o envio se reorganizam em coluna única com leitura preservada. |
| Compilação | `pnpm check` e `pnpm build` concluídos sem erros. |
| Integração configurada | O formulário usa a URL ativa do Apps Script e a aba `8ºAno (Aulas 1–7 e 9–11) — 10 Questões`. |

## Decisões aplicadas após a revisão visual

- A marca de órbita e estrela reaparece no cabeçalho, na hero, nas transições de parte e nas estações de investigação.
- A régua vertical de progresso é apresentada como uma caderneta de campo contínua.
- Cada questão mantém imagem documental, tabela ou situação de análise antes da escolha ou da argumentação.

## Restauração do fluxo original

| Elemento restaurado | Verificação |
|---|---|
| Cabeçalho escolar | A identificação `E.E. PROFª WANDA MASCAGNI DE SÁ` e o título original da atividade estão presentes antes das questões. |
| Lista suspensa | As turmas 8.º Ano A e 8.º Ano B foram carregadas da lista original, com 31 alunos em cada grupo. |
| Preenchimento automático | A seleção de ALICE CARDOSO DE ALCANTARA preencheu corretamente Nº `1`, Série `8º Ano A` e a data atual. |
| Fluxo de respostas | As 8 questões objetivas, 2 dissertativas, botão Limpar respostas e envio ao Apps Script foram preservados. |
| Tela móvel | O cabeçalho e os campos passam para uma única coluna, mantendo leitura e toque confortáveis. |

## Ajuste de abertura e imagens

| Ajuste | Verificação |
|---|---|
| Início da atividade | A primeira seção visível é o cabeçalho `E.E. PROFª WANDA MASCAGNI DE SÁ`, sem a capa, navegação ou apresentação anteriores. |
| Imagens das questões | As figuras agora usam proporção original e `object-fit: contain`; o conteúdo visual é exibido integralmente, sem recorte. |
| Responsividade | O cabeçalho foi conferido em desktop e celular; no celular, NOME, Nº, SÉRIE e DATA seguem organizados em uma coluna. |

## Alternativas em alto-relevo

| Estado | Verificação |
|---|---|
| Sem seleção | Cada alternativa tem sombra inferior e elevação visual, reforçando que é clicável. |
| Selecionada | A alternativa desce `5 px`, assume azul-escuro `#0A4566`, texto branco em negrito e marcação da letra em branco. |
| Contraste e interação | A seleção da alternativa A da questão 1 foi validada no navegador: fundo azul-escuro, texto branco, peso `800` e sombra curta de item pressionado. |
