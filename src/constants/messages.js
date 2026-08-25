/**
 * 💬 MENSAGENS PADRÃO DO BOT
 */

const { bot, owner, emojis } = require('../../config/config');

const MESSAGES = {
  // Mensagens de Erro
  ERROR_GENERIC: `${emojis.error} Ocorreu um erro ao processar seu comando. Tente novamente mais tarde.`,
  ERROR_NOT_FOUND: `${emojis.error} Comando não encontrado. Digite ${bot.prefix}menu para ver os comandos disponíveis.`,
  ERROR_NO_PERMISSION: `${emojis.error} Você não tem permissão para usar este comando!`,
  ERROR_OWNER_ONLY: `${emojis.error} Este comando é apenas para o ${owner.name}!`,
  ERROR_GROUP_ONLY: `${emojis.error} Este comando funciona apenas em grupos!`,
  ERROR_PRIVATE_ONLY: `${emojis.error} Este comando funciona apenas no chat privado!`,
  ERROR_ADMIN_ONLY: `${emojis.error} Este comando é apenas para admins!`,
  
  // Mensagens de Sucesso
  SUCCESS_COMMAND: `${emojis.success} Comando executado com sucesso!`,
  SUCCESS_ENABLED: `${emojis.success} Ativado com sucesso!`,
  SUCCESS_DISABLED: `${emojis.success} Desativado com sucesso!`,
  
  // Mensagens de Carregamento
  LOADING: `${emojis.loading} Processando...`,
  LOADING_DOWNLOAD: `${emojis.loading} Baixando arquivo...`,
  LOADING_PROCESSING: `${emojis.loading} Processando dados...`,
  
  // Mensagens de Aviso
  WARNING_COOLDOWN: (time) => `${emojis.warning} Aguarde ${time}s antes de usar este comando novamente!`,
  WARNING_SPAM: `${emojis.warning} Você está enviando muitas mensagens! Aguarde um pouco.`,
  WARNING_BANNED: `${emojis.warning} Você foi banido deste bot!`,
  
  // Mensagens de Info
  INFO_HELP: `${emojis.info} Digite ${bot.prefix}menu para ver os comandos disponíveis.`,
  INFO_PREFIX: (prefix) => `${emojis.info} O prefixo deste bot é: ${prefix}`,
  
  // Boas-vindas
  WELCOME: (name, memberCount) => `
${emojis.heart} Bem-vindo(a) ao grupo, *${name}*!

Agora temos *${memberCount}* membros. Divirta-se!

Digite ${bot.prefix}menu para ver os comandos disponíveis.
  `,
  
  // Bot Offline
  BOT_OFFLINE: `${emojis.fire} Bot desconectado. Reconectando...`,
  BOT_ONLINE: `${emojis.rocket} Bot conectado com sucesso!`,
};

module.exports = MESSAGES;
