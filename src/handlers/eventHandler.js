/**
 * 🎯 HANDLER DE EVENTOS
 * Gerencia eventos do bot (conexão, desconexão, etc)
 */

const MESSAGES = require('../constants/messages');

class EventHandler {
  constructor(client, logger, database, messageHandler) {
    this.client = client;
    this.logger = logger;
    this.database = database;
    this.messageHandler = messageHandler;
  }

  // Registra todos os eventos
  registerEvents() {
    this.onReady();
    this.onMessage();
    this.onGroupParticipantsUpdate();
    this.onDisconnect();
    this.onAuthFailure();
  }

  // Evento: Bot pronto
  onReady() {
    this.client.on('ready', () => {
      this.logger.connection('🟢 Bot conectado com sucesso!');
      this.logger.success(`✅ ${MESSAGES.BOT_ONLINE}`);
    });
  }

  // Evento: Mensagem recebida
  onMessage() {
    this.client.on('message', async (message) => {
      try {
        await this.messageHandler.handleMessage(message);
      } catch (error) {
        this.logger.error('Erro ao processar mensagem', error);
      }
    });
  }

  // Evento: Atualização de participantes do grupo
  onGroupParticipantsUpdate() {
    this.client.on('group_join', async (notification) => {
      try {
        const { messages } = notification;
        for (const msg of messages) {
          const chat = await msg.getChat();
          const contact = await msg.getContact();
          const groupName = chat.name;
          const memberCount = chat.participants.length;
          
          this.logger.info(`👤 ${contact.name} entrou em ${groupName}`);
          
          // Mensagem de boas-vindas (opcional)
          if (chat.isGroup) {
            await msg.reply(MESSAGES.WELCOME(contact.name, memberCount));
          }
        }
      } catch (error) {
        this.logger.error('Erro em group_join', error);
      }
    });

    this.client.on('group_leave', async (notification) => {
      try {
        const { messages } = notification;
        for (const msg of messages) {
          const chat = await msg.getChat();
          const contact = await msg.getContact();
          this.logger.info(`👋 ${contact.name} saiu de ${chat.name}`);
        }
      } catch (error) {
        this.logger.error('Erro em group_leave', error);
      }
    });
  }

  // Evento: Desconexão
  onDisconnect() {
    this.client.on('disconnected', (reason) => {
      this.logger.warn(`🔴 Bot desconectado. Motivo: ${reason}`);
      this.logger.warn(MESSAGES.BOT_OFFLINE);
    });
  }

  // Evento: Falha de autenticação
  onAuthFailure() {
    this.client.on('auth_failure', (msg) => {
      this.logger.error(`🔐 Falha de autenticação: ${msg}`);
    });
  }

  // Evento customizado: Erro geral
  onError() {
    this.client.on('error', (error) => {
      this.logger.error('Erro no WhatsApp Web', error);
    });
  }
}

module.exports = EventHandler;
