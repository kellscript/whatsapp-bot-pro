/**
 * 🛠️ FUNÇÕES AUXILIARES
 * Funções utilitárias para o bot
 */

const config = require('../../config/config');

/**
 * Extrai número do JID
 * @param {string} jid - JID do WhatsApp
 * @returns {string} - Número sem formatação
 */
function extractNumber(jid) {
  return jid.split('@')[0];
}

/**
 * Verifica se é grupo
 * @param {string} jid - JID do WhatsApp
 * @returns {boolean}
 */
function isGroup(jid) {
  return jid.endsWith('@g.us');
}

/**
 * Verifica se é privado (chat pessoal)
 * @param {string} jid - JID do WhatsApp
 * @returns {boolean}
 */
function isPrivate(jid) {
  return jid.endsWith('@s.whatsapp.net');
}

/**
 * Formata mensagem com styling WhatsApp
 * @param {string} text - Texto
 * @param {string} style - Estilo ('bold', 'italic', 'strikethrough', 'monospace')
 * @returns {string}
 */
function formatText(text, style = 'bold') {
  const styles = {
    bold: (t) => `*${t}*`,
    italic: (t) => `_${t}_`,
    strikethrough: (t) => `~${t}~`,
    monospace: (t) => '```' + t + '```',
    code: (t) => '```' + t + '```',
  };
  return (styles[style] || styles.bold)(text);
}

/**
 * Cria menu com opções
 * @param {string} title - Título do menu
 * @param {array} options - Array de opções
 * @param {string} footer - Rodapé
 * @returns {string}
 */
function createMenu(title, options = [], footer = '') {
  let menu = `*${title}*\n\n`;
  options.forEach((opt, index) => {
    menu += `${index + 1}. ${opt}\n`;
  });
  if (footer) menu += `\n${footer}`;
  return menu;
}

/**
 * Delay assíncrono
 * @param {number} ms - Milissegundos
 * @returns {Promise}
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Gera número aleatório
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number}
 */
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Obtém elemento aleatório de array
 * @param {array} arr - Array
 * @returns {any}
 */
function randomArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Conta palavras em texto
 * @param {string} text - Texto
 * @returns {number}
 */
function countWords(text) {
  return text.trim().split(/\s+/).length;
}

/**
 * Trunca texto
 * @param {string} text - Texto
 * @param {number} length - Comprimento máximo
 * @returns {string}
 */
function truncate(text, length = 100) {
  return text.length > length ? text.substring(0, length - 3) + '...' : text;
}

/**
 * Capitaliza primeira letra
 * @param {string} text - Texto
 * @returns {string}
 */
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Cria barra de progresso
 * @param {number} current - Valor atual
 * @param {number} total - Valor total
 * @param {number} length - Comprimento da barra
 * @returns {string}
 */
function progressBar(current, total, length = 20) {
  const percentage = current / total;
  const filled = Math.round(percentage * length);
  const empty = length - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);
  return `${bar} ${Math.round(percentage * 100)}%`;
}

/**
 * Formata número para formato legível
 * @param {number} number - Número
 * @returns {string}
 */
function formatNumber(number) {
  return number.toLocaleString('pt-BR');
}

/**
 * Obtém tempo decorrido
 * @param {number} milliseconds - Milissegundos
 * @returns {string}
 */
function formatTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}

/**
 * Remove caracteres especiais
 * @param {string} text - Texto
 * @returns {string}
 */
function removeSpecialChars(text) {
  return text.replace(/[^a-zA-Z0-9\s]/g, '');
}

module.exports = {
  extractNumber,
  isGroup,
  isPrivate,
  formatText,
  createMenu,
  delay,
  random,
  randomArray,
  countWords,
  truncate,
  capitalize,
  progressBar,
  formatNumber,
  formatTime,
  removeSpecialChars,
};
