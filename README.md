# 📚 Atividade de Ciências — 8º Ano com 10 Questões

![License](https://img.shields.io/badge/license-CC%20BY--NC--SA%204.0-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![Python](https://img.shields.io/badge/python-3.8%2B-blueviolet)
![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-supported-orange)

**Atividade educacional interativa de Ciências para o 8º ano integrada com Google Sheets, contendo 10 questões (8 objetivas + 2 dissertativas) sobre Astronomia, Movimentos Terrestres, Lua, Eclipses, Clima e Meteorologia.**

---

## 📋 Conteúdo

- [Características](#características)
- [Requisitos](#requisitos)
- [Instalação Rápida](#instalação-rápida)
- [Como Usar](#como-usar)
- [Arquitetura](#arquitetura)
- [Configuração](#configuração)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## ✨ Características

✅ **10 Questões Integradoras**
- 8 questões objetivas (múltipla escolha)
- 2 questões dissertativas (resposta aberta)
- Conteúdos das Aulas 1–7 e 9–11

✅ **Imagens e Suporte Visual**
- Imagens reais de alta qualidade
- Suporte textual para análise
- Tabelas de dados

✅ **Integração com Google Sheets**
- Coleta automática de respostas
- Cálculo automático de notas
- Formatação condicional (acertos/erros)
- Suporte a múltiplas turmas

✅ **Interface Responsiva**
- Design moderno e acessível
- Funciona em desktop e mobile
- Temas claros e bem definidos

✅ **Embaralhamento de Opções**
- Cada aluno vê opções em ordem diferente
- Garante autenticidade das respostas
- Resposta correta muda de posição

✅ **Segurança**
- Validação de dados no servidor
- Proteção contra injeção de fórmulas
- Tratamento de erros robusto

---

## 🎯 Conteúdos Cobertos

| Questão | Tipo | Tema |
|---------|------|------|
| Q1 | Objetiva | Astronomia e classificação de corpos celestes |
| Q2 | Objetiva | Rotação, translação e estações do ano |
| Q3 | Objetiva | Lua e movimentos lunares |
| Q4 | Objetiva | Fases da Lua e calendários lunares |
| Q5 | Objetiva | Eclipses (solar e lunar) |
| Q6 | Objetiva | Diferença entre tempo e clima |
| Q7 | Objetiva | Previsão do tempo e pressão atmosférica |
| Q8 | Objetiva | Instrumentos meteorológicos e precipitação |
| Q9 | Dissertativa | Integração: movimentos, fases e eclipses |
| Q10 | Dissertativa | Boletim meteorológico e instrumentos |

---

## 📋 Requisitos

### Para Usar a Atividade
- ✅ Navegador moderno (Chrome, Firefox, Safari, Edge)
- ✅ Acesso à internet
- ✅ Conta Google (para acesso ao Google Sheets)

### Para Modificar / Desenvolver
- ✅ Python 3.8+
- ✅ Git
- ✅ Conta Google Cloud (para Deploy do Apps Script)
- ✅ Conhecimento básico de Python e Google Apps Script

---

## 🚀 Instalação Rápida

### 1️⃣ Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/atividade-ciencias-8ano.git
cd atividade-ciencias-8ano
```

### 2️⃣ Configurar Variáveis de Ambiente
```bash
cp config/.env.example .env
# Editar .env com seus dados do Google Sheets
```

### 3️⃣ Instalar Dependências Python
```bash
pip install -r config/requirements.txt
```

### 4️⃣ Preparar Google Sheets
- Criar um novo Google Sheets
- Compartilhar com sua conta de serviço
- Copiar o ID da planilha
- Adicionar em `.env` → `SPREADSHEET_ID`

### 5️⃣ Deploy do Google Apps Script
```bash
# Instalar clasp (Google Apps Script CLI)
npm install -g @google/clasp

# Login
clasp login

# Criar novo projeto (ou usar existente)
clasp create --type standalone

# Deploy
clasp deploy
```

### 6️⃣ Construir a Atividade
```bash
python src/scripts/build-activity.py
# Output em: build/atividade_8ano_10questoes.html
```

---

## 📖 Como Usar

### Para Alunos
1. Acesse o link da atividade HTML (compartilhado pelo professor)
2. Selecione seu nome na lista
3. O número da série e data preenchem automaticamente
4. Responda as 8 questões objetivas selecionando uma opção
5. Responda as 2 questões dissertativas escrevendo sua resposta
6. Clique em **"Enviar respostas"** para submeter
7. A nota aparece imediatamente
8. Respostas são salvas automaticamente no Google Sheets

### Para Professores
1. Crie um Google Sheets com as abas necessárias
2. Configure o Apps Script com o código fornecido
3. Customize as imagens em `/assets/questoes/`
4. Rode `build-activity.py` para gerar o HTML
5. Compartilhe o link do HTML com seus alunos
6. Acompanhe as respostas em tempo real no Sheets

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                    ALUNO NO NAVEGADOR                    │
│                   (index.html + JS)                      │
└────────────────────┬────────────────────────────────────┘
                     │ Envia respostas (JSON)
                     ▼
┌─────────────────────────────────────────────────────────┐
│            GOOGLE APPS SCRIPT (Backend)                  │
│  • Valida dados                                          │
│  • Calcula notas                                         │
│  • Aplica formatação condicional                        │
└────────────────────┬────────────────────────────────────┘
                     │ Salva dados
                     ▼
┌─────────────────────────────────────────────────────────┐
│              GOOGLE SHEETS (Banco de Dados)              │
│  • Aba: 8ºAno (Aulas 1–7 e 9–11) — 10 Questões         │
│  • Colunas: Nome, Nº, Série, Q1-Q10, Acertos, Nota      │
│  • Formatação: Acertos em azul, Erros em vermelho       │
└─────────────────────────────────────────────────────────┘
```

### Fluxo de Dados
1. **Build Time** (`build-activity.py`)
   - Lê questões e imagens
   - Embaralha opções
   - Codifica imagens em base64
   - Gera HTML único e autocontido

2. **Runtime** (Navegador do Aluno)
   - Aluno preenche formulário
   - JavaScript coleta respostas
   - Valida preenchimento completo
   - Envia POST para Google Apps Script

3. **Backend** (Apps Script)
   - Recebe JSON com respostas
   - Calcula acertos automático
   - Converte para nota (0-10)
   - Adiciona linha ao Sheets
   - Aplica formatação
   - Retorna resultado ao aluno

4. **Armazenamento** (Google Sheets)
   - Planilha cresce com cada submission
   - Histórico completo mantido
   - Professor visualiza em tempo real

---

## ⚙️ Configuração

### Estrutura de Arquivos Necessários

#### `config/config.json`
```json
{
  "spreadsheet": {
    "id": "1CcoSFYXaP-x7pHe7uyyodSeD5Xa4sSy173egGAAZsno",
    "sheets": {
      "tenQuestions": "8ºAno (Aulas 1–7 e 9–11) — 10 Questões"
    }
  },
  "server": {
    "scriptUrl": "https://script.google.com/macros/s/AKfycbyaaLx.../exec",
    "timeout": 30000
  },
  "scoring": {
    "objectiveTotal": 8,
    "maxGrade": 10,
    "essayQuestions": 2
  }
}
```

#### `.env`
```
GOOGLE_SCRIPT_DEPLOY_ID=seu_id_aqui
SPREADSHEET_ID=seu_spreadsheet_id_aqui
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/seu_id/exec
LOG_LEVEL=info
```

### Customização de Conteúdo

**Mudar as questões:**
1. Editar `src/scripts/build-activity.py`
2. Atualizar array `questions` com novo conteúdo
3. Rodar o build novamente

**Mudar as imagens:**
1. Substituir arquivos em `/assets/questoes/`
2. Respeitar nomenclatura: `q1-tema.jpg`, etc.
3. Rodar o build para codificar em base64

**Mudar a escola/instituição:**
1. Em `src/scripts/build-activity.py`, linha ~53
2. Mudar: `E.E. PROFª WANDA MASCAGNI DE SÁ`
3. Rodar o build

---

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova-feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

Veja [`CONTRIBUTING.md`](CONTRIBUTING.md) para detalhes.

---

## 📜 Licença

Este projeto está licenciado sob a **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International** (CC BY-NC-SA 4.0).

**O que você pode fazer:**
- ✅ Usar em ambiente educacional
- ✅ Modificar e adaptar
- ✅ Compartilhar com crédito

**O que você NÃO pode fazer:**
- ❌ Usar comercialmente
- ❌ Remover atribuição
- ❌ Usar para venda de conteúdo

Veja [`LICENSE`](LICENSE) para o texto completo.

---

## 🐛 Reportar Problemas

Encontrou um bug? Abra uma [Issue](https://github.com/seu-usuario/atividade-ciencias-8ano/issues)!

Inclua:
- Descrição do problema
- Passos para reproduzir
- Resultado esperado
- Resultado obtido
- Screenshots (se aplicável)

---

## 📞 Suporte

- 📧 Email: seu-email@exemplo.com
- 💬 Discussões: [GitHub Discussions](https://github.com/seu-usuario/atividade-ciencias-8ano/discussions)
- 📋 Wiki: [Documentação Completa](https://github.com/seu-usuario/atividade-ciencias-8ano/wiki)

---

## 🙏 Agradecimentos

- Aos alunos do 8º ano que testaram a atividade
- À comunidade de educadores
- Aos contribuidores que melhoraram o projeto

---

**Desenvolvido com ❤️ para educação**

*Última atualização: 21 de agosto de 2026*
*Versão: 1.0.0*
