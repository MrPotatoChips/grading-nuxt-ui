import RAdmin from './private/admin.routes'
import RPrivateShared from './private/shared.routes'
import RDGAgent from './private/dg-agent.routes'
import RDGSupervisor from './private/dg-supervisor.routes'
import RDGManager from './private/dg-manager.routes'
import RMarketingOfficer from './private/marketing-officer.routes'
import RMarketingManager from './private/marketing-manager.routes'
import RAudit from './private/audit.routes'

import RPublicShared from './shared.routes'

const allRoutes = []

export default allRoutes.concat(
  RAdmin,
  RPrivateShared,
  RDGAgent,
  RDGSupervisor,
  RDGManager,
  RMarketingOfficer,
  RMarketingManager,
  RAudit,
  RPublicShared
)
