// DG Manager Navigation Menu
const MDGManager = [
  {
    label: 'Dashboard',
    icon: 'i-lucide-layout-dashboard',
    to: '/dgm/dashboard'
  },
  {
    label: 'Supervisors',
    icon: 'i-lucide-users',
    to: '/dgm/supervisors'
  },
  {
    label: 'Growers',
    icon: 'i-lucide-user-check',
    to: '/dgm/growers'
  },
  {
    label: 'Events',
    icon: 'i-lucide-calendar',
    children: [
      {
        label: 'Agent Events',
        to: '/dgm/agent-events'
      },
      {
        label: 'Other Events',
        to: '/dgm/agent-other-events'
      }
    ]
  },
  {
    label: 'Reports',
    icon: 'i-lucide-file-bar-chart',
    children: [
      {
        label: 'Growers',
        to: '/dgm/reports/growers'
      },
      {
        label: 'Tasks',
        to: '/dgm/reports/tasks'
      },
      {
        label: 'Other Events',
        to: '/dgm/reports/other-events'
      }
    ]
  }
]

export default MDGManager
