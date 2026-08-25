# 🤖 WhatsApp Bot Pro

> Bot WhatsApp profissional com 120+ comandos, menu interativo e estrutura modular completa.

## 🌟 Características

✅ **120+ Comandos Funcionais** - Diversão, Utilitários, Admin, Jogos, IA, Downloads, Grupos e muito mais  
✅ **Menu Interativo** - Menu bonito com navegação por categorias  
✅ **Estrutura Modular** - Código limpo e fácil de manter  
✅ **Sistema de Permissões** - Owner, Admin e Usuários comuns  
✅ **Anti-Spam** - Sistema de cooldown para proteção  
✅ **Banco de Dados** - JSON para salvar dados dos usuários  
✅ **Logs Completos** - Rastreamento de erros e comandos  
✅ **Documentação** - Código comentado e bem organizado  

## 📋 Requisitos

- Node.js 14+
- npm ou yarn
- Número de WhatsApp para testes

## 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/kellscript/whatsapp-bot-pro.git
cd whatsapp-bot-pro

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com seus dados

# Inicie o bot
npm start
```

## 📁 Estrutura de Pastas

```
whatsapp-bot-pro/
├── index.js                    # Arquivo principal
├── package.json               # Dependências
├── .env.example              # Variáveis de ambiente exemplo
├── .gitignore               # Git ignore
├── README.md               # Este arquivo
│
├── config/
│   └── config.js           # Configurações do bot
│
├── src/
│   ├── commands/            # Pasta com todos os comandos
│   │   ├── diversao/        # Comandos de diversão
│   │   ├── utilitarios/     # Comandos utilitários
│   │   ├── admin/           # Comandos admin
│   │   ├── jogos/           # Comandos de jogos
│   │   ├── grupo/           # Comandos de grupo
│   │   ├── download/        # Comandos de download
│   │   ├── ia/              # Comandos de IA
│   │   ├── sticker/         # Comandos de sticker
│   │   ├── owner/           # Comandos do owner
│   │   └── index.js         # Carregador de comandos
│   │
│   ├── lib/                 # Bibliotecas utilitárias
│   │   ├── database.js      # Gerenciador de banco de dados
│   │   ├── logger.js        # Sistema de logs
│   │   ├── permissions.js   # Sistema de permissões
│   │   ├── cooldown.js      # Sistema de anti-spam
│   │   └── utils.js         # Funções auxiliares
│   │
│   ├── handlers/            # Manipuladores de eventos
│   │   ├── messageHandler.js
│   │   └── errorHandler.js
│   │
│   └── constants/           # Constantes da aplicação
│       └── messages.js      # Mensagens padrão
│
└── database/
    ├── users.json          # Base de usuários
    ├── config.json         # Configurações salvas
    └── cooldowns.json      # Controle de cooldown
```

## 🎮 Categorias de Comandos

### 1️⃣ **Diversão** (15+ comandos)
- `.piada` - Piada aleatória
- `.meme` - Meme aleatório
- `.ship` - Faz ship com duas pessoas
- `.frase` - Frase motivacional
- E mais...

### 2️⃣ **Utilitários** (20+ comandos)
- `.clima` - Clima de uma cidade
- `.cotacao` - Cotação de criptomoedas
- `.tradutor` - Traduz texto
- `.calculadora` - Calcula operações
- E mais...

### 3️⃣ **Admin** (15+ comandos)
- `.ban` - Bane um membro
- `.unban` - Desban um membro
- `.kick` - Expulsa um membro
- `.promover` - Promove a admin
- E mais...

### 4️⃣ **Jogos** (20+ comandos)
- `.dado` - Joga um dado
- `.moeda` - Cara ou coroa
- `.pedrapapeltesoura` - Jogo clássico
- `.trivia` - Quiz de conhecimento
- E mais...

### 5️⃣ **Grupo** (12+ comandos)
- `.abrir` - Abre o grupo
- `.fechar` - Fecha o grupo
- `.marcar` - Marca todos
- `.welcome` - Ativa welcome
- E mais...

### 6️⃣ **Download** (10+ comandos)
- `.ytmp3` - Baixa música do YouTube
- `.ytmp4` - Baixa vídeo do YouTube
- `.ig` - Baixa do Instagram
- `.tiktok` - Baixa do TikTok
- E mais...

### 7️⃣ **IA** (8+ comandos)
- `.ia` - Chat com IA
- `.imagine` - Gera imagem (mock)
- `.resumir` - Resume um texto
- E mais...

### 8️⃣ **Sticker** (8+ comandos)
- `.sticker` - Cria sticker
- `.figtext` - Cria texto em imagem
- `.qrcode` - Gera QR Code
- E mais...

### 9️⃣ **Owner** (10+ comandos)
- `.ban` - Ban global
- `.broadcast` - Envia mensagem a todos
- `.restart` - Reinicia o bot
- `.console` - Executa comando
- E mais...

## 🔧 Como Usar

### Menu Interativo
```
.menu          - Mostra o menu principal
.menu 1        - Menu de Diversão
.menu 2        - Menu de Utilitários
.menu 3        - Menu de Admin
```

### Exemplo de Comando
```
.piada
```

## 📝 Configuração

Edite o arquivo `.env` com suas configurações:

```env
BOT_NAME=Seu Bot
BOT_PREFIX=.
OWNER_NUMBER=558599999999
```

## 🔑 Permissões

- **Owner** - Acesso total
- **Admin** - Comandos de admin do grupo
- **Usuário** - Comandos públicos

## 🛡️ Segurança

- Anti-spam com cooldown configurável
- Sistema de permissões granulares
- Logs de todas as ações
- Tratamento de erros completo

## 📜 Licença

MIT

## 👨‍💻 Autor

**kellscript**

## ⚠️ Aviso Legal

Este bot é apenas para fins educacionais. Respeite sempre os termos de serviço do WhatsApp e as leis aplicáveis.

---

⭐ Se gostou, dê uma estrela no repositório!
