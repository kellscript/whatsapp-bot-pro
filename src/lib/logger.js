/**
 * 📝 SISTEMA DE LOGS
 * Registra todas as ações e erros do bot
 */

const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');

class Logger {
  constructor(logPath = './logs') {
    this.logPath = logPath;
    fs.ensureDirSync(logPath);
    this.logFile = path.join(logPath, 'bot.log');
  }

  // Formata a mensagem com timestamp
  formatMessage(level, message) {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    return `[${timestamp}] [${level}] ${message}`;
  }

  // Escreve no arquivo de log
  writeToFile(message) {
    try {
      fs.appendFileSync(this.logFile, message + '\n');
    } catch (error) {
      console.error('Erro ao escrever log:', error);
    }
  }

  // Log de Info
  info(message) {
    const formatted = this.formatMessage('INFO', message);
    console.log(chalk.blue(formatted));
    this.writeToFile(formatted);
  }

  // Log de Sucesso
  success(message) {
    const formatted = this.formatMessage('SUCCESS', message);
    console.log(chalk.green(formatted));
    this.writeToFile(formatted);
  }

  // Log de Aviso
  warn(message) {
    const formatted = this.formatMessage('WARN', message);
    console.log(chalk.yellow(formatted));
    this.writeToFile(formatted);
  }

  // Log de Erro
  error(message, error = null) {
    const errorMessage = error ? `${message} - ${error.message}` : message;
    const formatted = this.formatMessage('ERROR', errorMessage);
    console.log(chalk.red(formatted));
    this.writeToFile(formatted);
    if (error && error.stack) {
      this.writeToFile(error.stack);
    }
  }

  // Log de Comando
  command(sender, command, status = 'executed') {
    const formatted = this.formatMessage('COMMAND', `${sender} -> ${command} [${status}]`);
    console.log(chalk.magenta(formatted));
    this.writeToFile(formatted);
  }

  // Log de Conexão
  connection(message) {
    const formatted = this.formatMessage('CONNECTION', message);
    console.log(chalk.cyan(formatted));
    this.writeToFile(formatted);
  }
}

module.exports = Logger;
