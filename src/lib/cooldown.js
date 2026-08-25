/**
 * ⏱️ SISTEMA DE COOLDOWN / ANTI-SPAM
 * Previne spam limitando uso de comandos por usuário
 */

class Cooldown {
  constructor(defaultCooldown = 3000) {
    this.cooldowns = new Map(); // { 'user-command': timestamp }
    this.defaultCooldown = defaultCooldown;
  }

  // Gera chave única para cooldown
  getKey(userId, commandName) {
    return `${userId}-${commandName}`;
  }

  // Verifica se usuário está em cooldown
  isOnCooldown(userId, commandName) {
    const key = this.getKey(userId, commandName);
    return this.cooldowns.has(key) && Date.now() < this.cooldowns.get(key);
  }

  // Obtém tempo restante de cooldown em segundos
  getRemainingTime(userId, commandName) {
    const key = this.getKey(userId, commandName);
    if (!this.cooldowns.has(key)) return 0;
    const remaining = this.cooldowns.get(key) - Date.now();
    return Math.ceil(remaining / 1000);
  }

  // Aplica cooldown ao usuário
  setCooldown(userId, commandName, duration = null) {
    const key = this.getKey(userId, commandName);
    const cooldownDuration = duration || this.defaultCooldown;
    this.cooldowns.set(key, Date.now() + cooldownDuration);
  }

  // Remove cooldown do usuário
  removeCooldown(userId, commandName) {
    const key = this.getKey(userId, commandName);
    this.cooldowns.delete(key);
  }

  // Limpa cooldowns expirados (limpeza automática)
  cleanup() {
    const now = Date.now();
    for (const [key, expireTime] of this.cooldowns.entries()) {
      if (now > expireTime) {
        this.cooldowns.delete(key);
      }
    }
  }
}

module.exports = Cooldown;
