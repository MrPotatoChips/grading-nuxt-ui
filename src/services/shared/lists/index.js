import SListAccounts from './accounts.service.js'
import SListLocations from './locations.service.js'
import SListMaintenances from './maintenances.service.js'

export default Object.assign(
  SListAccounts,
  SListLocations,
  SListMaintenances
)
