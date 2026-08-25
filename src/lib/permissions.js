/**
 * 🔐 SISTEMA DE PERMISSÕES
 * Controla quem pode usar cada comando
 */

const config = require('../../config/config');

class Permissions {
  constructor(ownerNumber = config.owner.number) {
    this.ownerNumber = ownerNumber;
  }

  // Verifica se é owner
  isOwner(jid) {
    return jid.includes(this.ownerNumber);
  }

  // Verifica se é admin do grupo
  isAdmin(participant) {
    return participant.admin === 'admin' || participant.admin === 'superadmin';
  }

  // Verifica se é superadmin/criador do grupo
  isSuperAdmin(participant) {
    return participant.admin === 'superadmin';
  }

  // Verifica permissão do comando
  hasPermission(userJid, groupParticipant, requiredPermission) {
    // Owner sempre tem permissão
    if (this.isOwner(userJid)) {
      return true;
    }

    // Verificar tipo de permissão requerida
    switch (requiredPermission) {
      case 'owner':
        return this.isOwner(userJid);

      case 'admin':
        return groupParticipant ? this.isAdmin(groupParticipant) : false;

      case 'superadmin':
        return groupParticipant ? this.isSuperAdmin(groupParticipant) : false;

      case 'user':
      default:
        return true;
    }
  }

  // Obtém nível de permissão do usuário
  getUserLevel(userJid, groupParticipant) {
    if (this.isOwner(userJid)) return 'owner';
    if (groupParticipant) {
      if (this.isSuperAdmin(groupParticipant)) return 'superadmin';
      if (this.isAdmin(groupParticipant)) return 'admin';
    }
    return 'user';
  }

  // Obtém descrição da permissão
  getPermissionDescription(permission) {
    const descriptions = {
      owner: '👑 Apenas Owner',
      admin: '👨‍💼 Admin do Grupo',
      superadmin: '🔱 Super Admin',
      user: '👤 Qualquer Um',
    };
    return descriptions[permission] || 'Desconhecido';
  }
}

module.exports = Permissions;
