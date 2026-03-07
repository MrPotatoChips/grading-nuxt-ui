// Audit Navigation Menu
const MAudit = [
  {
    label: 'Dashboard',
    icon: 'i-lucide-layout-dashboard',
    to: '/audit/dashboard'
  },
  {
    label: 'Grower Management',
    icon: 'i-lucide-users',
    to: '/audit/grower-management'
  },
  {
    label: 'Events',
    icon: 'i-lucide-calendar',
    children: [
      {
        label: 'Agent Events',
        to: '/audit/agent-events'
      },
      {
        label: 'Other Events',
        to: '/audit/agent-other-events'
      }
    ]
  },
  {
    label: 'Reports',
    icon: 'i-lucide-file-bar-chart',
    children: [
      {
        label: 'Growers',
        to: '/audit/reports/growers'
      },
      {
        label: 'Tasks',
        to: '/audit/reports/tasks'
      },
      {
        label: 'Other Events',
        to: '/audit/reports/other-events'
      }
    ]
  }
]

export default MAudit
