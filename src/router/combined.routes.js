import RAdmin from './private/admin.routes'
import RTeacher from './private/teacher.routes'
import RStudent from './private/student.routes'

import RPrivateShared from './private/shared.routes'
import RPublicShared from './shared.routes'

const allRoutes = []

export default allRoutes.concat(
  RAdmin,
  RTeacher,
  RStudent,
  RPrivateShared,
  RPublicShared
)
