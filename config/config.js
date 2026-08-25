/**
 * ⚙️ CONFIGURAÇÕES CENTRALIZADAS DO BOT
 * Arquivo com todas as configurações do bot
 */

require('dotenv').config();

module.exports = {
  // Informações do Bot
  bot: {
    name: process.env.BOT_NAME || 'Bot WhatsApp Pro',
    prefix: process.env.BOT_PREFIX || '.',
    version: '2.0.0',
  },

  // Informações do Owner
  owner: {
    number: process.env.OWNER_NUMBER || '5585988888888',
    name: 'kellscript',
  },

  // Ambiente
  environment: process.env.NODE_ENV || 'development',
  isDev: process.env.NODE_ENV === 'development',

  // Banco de Dados
  database: {
    type: process.env.DB_TYPE || 'json',
    path: './database/',
  },

  // Limites e Cooldowns
  limits: {
    cooldown: 3000, // 3 segundos entre comandos por usuário
    maxWarnings: 3,
    spamLimit: 5, // Mensagens por 10 segundos
  },

  // APIs (Opcional)
  apis: {
    randomOrg: process.env.RANDOM_ORG_API_KEY || null,
    nineRest: process.env.NINEREST_API_KEY || null,
  },

  // Configurações de Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: './logs/bot.log',
  },

  // Mensagens Padrão
  messages: {
    loading: '⏳ Processando...',
    error: '❌ Erro ao processar comando!',
    noPermission: '🚫 Você não tem permissão para usar este comando!',
    ownerOnly: '👑 Este comando é apenas para o owner!',
    groupOnly: '👥 Este comando funciona apenas em grupos!',
    privateOnly: '💬 Este comando funciona apenas no privado!',
    cooldown: '⏱️ Aguarde {{time}}s antes de usar este comando novamente!',
  },

  // Emojis Padrão
  emojis: {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
    loading: '⏳',
    star: '⭐',
    heart: '❤️',
    fire: '🔥',
    rocket: '🚀',
  },
};
