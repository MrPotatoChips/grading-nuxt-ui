import MAdmin from './admin.menu'
import MTeacher from './teacher.menu'
import MStudent from './student.menu'

export const getSidebarMenu = role => {
  switch (role) {
    case 'admin': {
      return MAdmin
    }
    case 'teacher': {
      return MTeacher
    }
    case 'student': {
      return MStudent
    }
    default: {
      return []
    }
  }
}
