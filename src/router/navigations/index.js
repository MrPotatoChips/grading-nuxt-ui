import MAdmin from './admin.menu'
import MDGAgent from './dg-agent.menu'
import MDGSupervisor from './dg-supervisor.menu'
import MDGManager from './dg-manager.menu'
import MMarketingOfficer from './marketing-officer.menu'
import MMarketingManager from './marketing-manager.menu'
import MAudit from './audit.menu'

export const getSidebarMenu = role => {
  switch (role) {
    case 'admin': {
      return MAdmin
    }
    case 'dga': {
      return MDGAgent
    }
    case 'dgs': {
      return MDGSupervisor
    }
    case 'dgm': {
      return MDGManager
    }
    case 'mko': {
      return MMarketingOfficer
    }
    case 'mkm': {
      return MMarketingManager
    }
    case 'audit': {
      return MAudit
    }
    default: {
      return []
    }
  }
}
