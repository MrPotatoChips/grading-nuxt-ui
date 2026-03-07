// DG Supervisor Navigation Menu
const MDGSupervisor = [
  {
    label: 'Dashboard',
    icon: 'i-lucide-layout-dashboard',
    to: '/dgs/dashboard'
  },
  {
    label: 'Agents',
    icon: 'i-lucide-users',
    to: '/dgs/agents'
  },
  {
    label: 'Growers',
    icon: 'i-lucide-user-check',
    to: '/dgs/growers'
  },
  {
    label: 'Tasks',
    icon: 'i-lucide-check-square',
    to: '/dgs/tasks'
  },
  {
    label: 'Programs',
    icon: 'i-lucide-file-text',
    to: '/dgs/grower-programs'
  },
  {
    label: 'Events',
    icon: 'i-lucide-calendar',
    children: [
      {
        label: 'Agent Events',
        to: '/dgs/agent-events'
      },
      {
        label: 'Task Events',
        to: '/dgs/agent-task-events'
      },
      {
        label: 'Other Events',
        to: '/dgs/agent-other-events'
      }
    ]
  },
  {
    label: 'Reports',
    icon: 'i-lucide-file-bar-chart',
    to: '/dgs/reports'
  }
]

export default MDGSupervisor
