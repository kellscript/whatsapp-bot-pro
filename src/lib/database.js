/**
 * 💾 GERENCIADOR DE BANCO DE DADOS
 * Sistema simples com JSON para armazenar dados de usuários, configurações e cooldowns
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

class Database {
  constructor(dbPath = './database') {
    this.dbPath = dbPath;
    this.ensureDirectories();
  }

  // Garante que os diretórios existem
  ensureDirectories() {
    fs.ensureDirSync(this.dbPath);
  }

  // Obtém caminho completo do arquivo
  getFilePath(name) {
    return path.join(this.dbPath, `${name}.json`);
  }

  // Carrega dados de um arquivo
  load(name, defaultValue = {}) {
    try {
      const filePath = this.getFilePath(name);
      if (fs.existsSync(filePath)) {
        return fs.readJsonSync(filePath);
      }
      this.save(name, defaultValue);
      return defaultValue;
    } catch (error) {
      console.error(chalk.red(`[Database] Erro ao carregar ${name}:`, error.message));
      return defaultValue;
    }
  }

  // Salva dados em um arquivo
  save(name, data) {
    try {
      const filePath = this.getFilePath(name);
      fs.writeJsonSync(filePath, data, { spaces: 2 });
      return true;
    } catch (error) {
      console.error(chalk.red(`[Database] Erro ao salvar ${name}:`, error.message));
      return false;
    }
  }

  // Adiciona um usuário
  addUser(jid, name = 'Usuário') {
    const users = this.load('users', {});
    if (!users[jid]) {
      users[jid] = {
        jid,
        name,
        joinedAt: new Date().toISOString(),
        warnings: 0,
        banned: false,
        points: 0,
        level: 1,
        commandsUsed: 0,
      };
      this.save('users', users);
    }
    return users[jid];
  }

  // Obtém dados do usuário
  getUser(jid) {
    const users = this.load('users', {});
    if (!users[jid]) {
      return this.addUser(jid);
    }
    return users[jid];
  }

  // Atualiza dados do usuário
  updateUser(jid, updates) {
    const users = this.load('users', {});
    if (users[jid]) {
      users[jid] = { ...users[jid], ...updates };
      this.save('users', users);
    }
    return users[jid] || null;
  }

  // Adiciona aviso ao usuário
  addWarning(jid) {
    const user = this.getUser(jid);
    user.warnings = (user.warnings || 0) + 1;
    this.updateUser(jid, { warnings: user.warnings });
    return user.warnings;
  }

  // Remove aviso do usuário
  removeWarning(jid) {
    const user = this.getUser(jid);
    user.warnings = Math.max(0, (user.warnings || 1) - 1);
    this.updateUser(jid, { warnings: user.warnings });
    return user.warnings;
  }

  // Bane um usuário
  banUser(jid) {
    return this.updateUser(jid, { banned: true });
  }

  // Desban um usuário
  unbanUser(jid) {
    return this.updateUser(jid, { banned: false });
  }

  // Verifica se usuário está banido
  isBanned(jid) {
    const user = this.getUser(jid);
    return user.banned || false;
  }

  // Adiciona pontos ao usuário
  addPoints(jid, points = 1) {
    const user = this.getUser(jid);
    user.points = (user.points || 0) + points;
    this.updateUser(jid, { points: user.points });
    return user.points;
  }

  // Incrementa contador de comandos
  incrementCommandCount(jid) {
    const user = this.getUser(jid);
    user.commandsUsed = (user.commandsUsed || 0) + 1;
    this.updateUser(jid, { commandsUsed: user.commandsUsed });
  }

  // Obtém configurações do grupo
  getGroupConfig(groupJid) {
    const configs = this.load('groupConfigs', {});
    if (!configs[groupJid]) {
      configs[groupJid] = {
        groupJid,
        prefix: '.',
        antiSpam: true,
        welcome: false,
        language: 'pt-br',
      };
      this.save('groupConfigs', configs);
    }
    return configs[groupJid];
  }

  // Atualiza configuração do grupo
  updateGroupConfig(groupJid, updates) {
    const configs = this.load('groupConfigs', {});
    if (configs[groupJid]) {
      configs[groupJid] = { ...configs[groupJid], ...updates };
      this.save('groupConfigs', configs);
    }
    return configs[groupJid] || null;
  }

  // Obtém estatísticas gerais
  getStats() {
    const users = this.load('users', {});
    const totalUsers = Object.keys(users).length;
    const totalCommands = Object.values(users).reduce((acc, u) => acc + (u.commandsUsed || 0), 0);
    const totalWarnings = Object.values(users).reduce((acc, u) => acc + (u.warnings || 0), 0);
    const bannedUsers = Object.values(users).filter(u => u.banned).length;

    return {
      totalUsers,
      totalCommands,
      totalWarnings,
      bannedUsers,
      registeredAt: new Date().toISOString(),
    };
  }
}

module.exports = Database;
