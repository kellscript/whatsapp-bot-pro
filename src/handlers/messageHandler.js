/**
 * 📨 HANDLER DE MENSAGENS
 * Processa e roteia mensagens para os comandos apropriados
 */

const path = require('path');
const fs = require('fs-extra');
const MESSAGES = require('../constants/messages');
const { bot } = require('../../config/config');

class MessageHandler {
  constructor(client, logger, database, permissions, cooldown) {
    this.client = client;
    this.logger = logger;
    this.database = database;
    this.permissions = permissions;
    this.cooldown = cooldown;
    this.commands = new Map();
    this.loadCommands();
  }

  // Carrega todos os comandos
  loadCommands() {
    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(path.join(commandsPath, file));
      if (command.name) {
        this.commands.set(command.name.toLowerCase(), command);
        this.logger.info(`✅ Comando carregado: ${command.name}`);
      }
    }

    this.logger.success(`📦 Total de ${this.commands.size} comandos carregados!`);
  }

  // Processa mensagem recebida
  async handleMessage(message) {
    try {
      // Ignorar mensagens do próprio bot
      if (message.fromMe) return;

      const { body, from, isGroup, isStatus } = message;
      
      // Ignorar stories
      if (isStatus) return;

      // Ignorar mensagens vazias
      if (!body || body.trim().length === 0) return;

      // Registrar mensagem
      this.database.addUser(from);
      this.logger.info(`📨 Mensagem de ${from}: ${body.substring(0, 50)}`);

      // Verificar se é comando
      if (!body.startsWith(bot.prefix)) return;

      // Extrair comando e argumentos
      const args = body.slice(bot.prefix.length).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();

      // Buscar comando
      const command = this.commands.get(commandName);

      if (!command) {
        await message.reply(MESSAGES.ERROR_NOT_FOUND);
        return;
      }

      // Verificar permissões
      const userJid = from;
      const participant = isGroup ? await this.getParticipant(from, message.id.remote) : null;

      if (!this.permissions.hasPermission(userJid, participant, command.permission)) {
        await message.reply(MESSAGES.ERROR_NO_PERMISSION);
        return;
      }

      // Verificar cooldown
      if (this.cooldown.isOnCooldown(userJid, commandName)) {
        const remaining = this.cooldown.getRemainingTime(userJid, commandName);
        await message.reply(MESSAGES.WARNING_COOLDOWN(remaining));
        return;
      }

      // Executar comando
      this.logger.command(from, commandName, 'executing');

      await command.execute({
        message,
        args,
        client: this.client,
        logger: this.logger,
        database: this.database,
        permissions: this.permissions,
      });

      // Aplicar cooldown
      this.cooldown.setCooldown(userJid, commandName, command.cooldown);
      this.database.incrementCommandCount(from);

      this.logger.command(from, commandName, 'success');
    } catch (error) {
      this.logger.error('Erro ao processar mensagem', error);
    }
  }

  // Obtém participante do grupo
  async getParticipant(userJid, groupJid) {
    try {
      const group = await this.client.getChatById(groupJid);
      const number = userJid.split('@')[0];
      return group.participants.find(p => p.id.user === number);
    } catch (error) {
      this.logger.error('Erro ao obter participante', error);
      return null;
    }
  }

  // Obtém comando pelo nome
  getCommand(name) {
    return this.commands.get(name.toLowerCase());
  }

  // Lista todos os comandos
  getAllCommands() {
    return Array.from(this.commands.values());
  }

  // Obtém comandos por categoria
  getCommandsByCategory(category) {
    return Array.from(this.commands.values()).filter(cmd => cmd.category === category);
  }
}

module.exports = MessageHandler;
