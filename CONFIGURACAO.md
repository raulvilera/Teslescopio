# ⚙️ Guia de Configuração

Instruções passo a passo para configurar e personalizar a atividade.

---

## 📋 Pré-requisitos

- ✅ Python 3.8+
- ✅ Git
- ✅ Conta Google (Gmail ou Google Workspace)
- ✅ Google Sheets (criar novo)
- ✅ Google Apps Script acesso

---

## 🚀 Configuração Inicial

### 1. Clonar e Preparar Ambiente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/atividade-ciencias-8ano.git
cd atividade-ciencias-8ano

# Criar ambiente virtual
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt
```

### 2. Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar com suas credenciais
nano .env  # ou use seu editor favorito
```

**Conteúdo do `.env`:**
```bash
# Google Sheets
SPREADSHEET_ID=sua_planilha_id_aqui
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/seu_id/exec

# Google Apps Script
GOOGLE_SCRIPT_DEPLOY_ID=seu_deployment_id

# Logging
LOG_LEVEL=info

# Paths
OUTPUT_PATH=./build
ASSETS_PATH=./assets/questoes
```

---

## 🔑 Obtendo as Credenciais Necessárias

### Passo A: Criar Google Sheets

1. Acessar [Google Sheets](https://sheets.google.com)
2. Clique em "Novo" → "Planilha em branco"
3. Renomear para "Atividade Ciências 8º Ano"
4. Na URL, copiar o ID:
   ```
   https://docs.google.com/spreadsheets/d/XXXXXXX/edit
                                            ^^^^^^^ Este é o ID
   ```
5. Colar em `SPREADSHEET_ID` no `.env`

### Passo B: Deploy do Google Apps Script

1. Abrir seu Google Sheets
2. Menu → "Extensões" → "Apps Script"
3. Um novo abra vai abrir editor
4. Deletar código padrão
5. Copiar conteúdo de `src/backend/codigo-google-sheets-limpo.gs`
6. Colar no editor Apps Script
7. **Importante:** Na linha 15, atualizar com seu Spreadsheet ID:
   ```javascript
   const CONFIG = {
     spreadsheetId: 'SEU_ID_AQUI',  // Altere aqui!
     // ...
   };
   ```
8. Salvar (Ctrl+S ou Cmd+S)

### Passo C: Publicar Deploy

1. No Apps Script, clique em "Deploy" (canto superior direito)
2. Selecione "New deployment"
3. Tipo: "Web app"
4. Configurar:
   - Execute as: sua conta Google
   - Who has access: "Anyone"
5. Copiar a URL do deploy
6. Colar em `.env` → `GOOGLE_APPS_SCRIPT_URL`

### Passo D: Dar Permissões

1. Google pedirá permissão para acessar Sheets
2. Clique em sua conta
3. Clique em "Advanced" → "Go to... (unsafe)"
4. Autorize o acesso

---

## 🎨 Customizar Conteúdo

### Mudar Questões

**Arquivo:** `src/scripts/build-activity.py`

Localizar a seção `questions = [...]` e editar:

```python
questions = [
    qobj(1, 'Aula 1', 'Tema', 'PERGUNTA AQUI', 
         '<div class="support-box">SUPORTE AQUI</div>',
         ['OPÇÃO A', 'OPÇÃO B', 'OPÇÃO C', 'OPÇÃO D'],
         0,  # índice da resposta correta (0=A, 1=B, etc)
         'caminho/imagem.jpg', 'Alt text', 'Descrição',
         'Fonte'),
    # ... mais questões
]
```

### Mudar Imagens

1. Substituir arquivos em `assets/questoes/`
2. Respeitar nomenclatura: `q1-tema.jpg`, `q2-tema.jpg`, etc.
3. Recomendado: compressão antes
4. Rodar build novamente

**Script para comprimir imagens:**
```bash
python -m PIL.ImageOps
# ou usar: ffmpeg, ImageMagick, etc
```

### Mudar Nome da Instituição

**Arquivo:** `src/scripts/build-activity.py`

Localizar a linha com:
```python
<div class="school-name">E.E. PROFª WANDA MASCAGNI DE SÁ</div>
```

Substituir pelo nome de sua escola.

### Mudar Título da Atividade

**Arquivo:** `config/config.json`

```json
{
  "activity": {
    "title": "ATIVIDADE DE CIÊNCIAS — 8º ANO",
    "subtitle": "Sua descrição aqui"
  }
}
```

---

## 🏗️ Build e Geração

### Construir Atividade

```bash
# Ativar ambiente virtual (se ainda não estiver)
source venv/bin/activate

# Rodar build
python src/scripts/build-activity.py

# Output em: build/atividade_8ano_10questoes.html
```

### Testando Localmente

```bash
# Iniciar servidor local
python -m http.server 8000 -d build/

# Acessar: http://localhost:8000/atividade_8ano_10questoes.html
```

---

## 📊 Preparar a Planilha

### Script de Formatação

Opcionalmente, antes de receber respostas, formate a planilha:

```bash
python src/scripts/prepare-sheet-format.py
```

Isso vai:
- Congelar cabeçalho
- Definir largura das colunas
- Aplicar formatação condicional
- Definir cores e estilos

---

## 👥 Importar Lista de Alunos

### Formato esperado: JSON

**Arquivo:** `data/students-example.json`

```json
{
  "8º Ano A": [
    {"number": "01", "name": "Ana da Silva"},
    {"number": "02", "name": "Bruno Santos"},
    {"number": "03", "name": "Carla Oliveira"}
  ],
  "8º Ano B": [
    {"number": "04", "name": "Diego Costa"},
    {"number": "05", "name": "Elisa Martins"}
  ]
}
```

**Para gerar a partir de CSV:**

```python
import json
import csv

with open('alunos.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    students = {}
    for row in reader:
        turma = row['turma']
        if turma not in students:
            students[turma] = []
        students[turma].append({
            'number': row['numero'],
            'name': row['nome']
        })

with open('data/students.json', 'w', encoding='utf-8') as f:
    json.dump(students, f, ensure_ascii=False, indent=2)
```

---

## 🔗 Compartilhar com Alunos

### Opção 1: Link Direto

1. Após o build, o arquivo HTML está em `build/`
2. Faça upload para seu servidor (site, GitHub Pages, etc)
3. Compartilhe o link com alunos

### Opção 2: GitHub Pages

```bash
# Criar branch gh-pages
git checkout -b gh-pages

# Copiar build para raiz
cp build/atividade_*.html index.html

# Commit e push
git add index.html
git commit -m "Deploy: versão 1.0"
git push origin gh-pages

# Ativar Pages em Settings → Pages → Branch: gh-pages
# Link: https://seu-usuario.github.io/atividade-ciencias-8ano
```

### Opção 3: Google Drive

1. Fazer upload do `.html` no Google Drive
2. Clicar direito → "Abrir com" → "Google Apps Script"
3. Copiar o link compartilhável

---

## 🛡️ Segurança

### Proteger Informações Sensíveis

**Verificar `.gitignore`:**
```bash
# Não deve versionar:
.env
config/config.json
*.secret
credentials.json
```

### Testar Injeção de Fórmulas

O App Script sanitiza automaticamente, mas você pode testar:

```bash
# Tentar respostas com caracteres especiais
Testes: =POWER(1,9), +1+1, @1+1, -1+1
```

### Backup da Planilha

```bash
# Google Sheets → Arquivo → Download → CSV ou Excel
# Ou programaticamente:
python scripts/backup-sheet.py
```

---

## 🔄 Atualizar Atividade

### Workflow para mudanças

1. Editar questões/imagens
2. Rodar build: `python src/scripts/build-activity.py`
3. Testar localmente: `python -m http.server 8000`
4. Fazer commit:
   ```bash
   git add .
   git commit -m "Atualiza questões v1.1"
   git push origin main
   ```
5. Deploy novo link
6. Notificar alunos se necessário

---

## 🐛 Troubleshooting

### Problema: "ModuleNotFoundError: No module named 'PIL'"

**Solução:**
```bash
pip install Pillow
```

### Problema: "Google Script URL inválida"

**Verificar:**
1. Deploy está publicado? (Web app)
2. URL copiad corretamente do Apps Script?
3. Permissões concedidas? (Google pediu autorização?)

### Problema: Respostas não salvam

**Verificar:**
1. Spreadsheet ID correto em `CONFIG` (Apps Script)?
2. Aba (Sheet) existe e tem nome correto?
3. Permissões de escrita no Sheets?

### Problema: Imagens não aparecem

**Verificar:**
1. Arquivos estão em `assets/questoes/`?
2. Nomenclatura correta? (`q1-tema.jpg`)
3. Caminho correto em `build-activity.py`?
4. Build foi rodado? Gera base64 das imagens?

### Problema: Estilo quebrado no mobile

**Verificar:**
1. Viewport meta tag presente?
2. Media queries no CSS?
3. Testar em different tamanhos (DevTools)

---

## 📞 Suporte

- Problemas com Google Sheets? → [Google Support](https://support.google.com/sheets)
- Problemas com Apps Script? → [Apps Script Docs](https://developers.google.com/apps-script)
- Problemas do projeto? → [Issues no GitHub](https://github.com/seu-usuario/atividade-ciencias-8ano/issues)

---

**Última atualização:** 21 de agosto de 2026

**Versão:** 1.0.0
