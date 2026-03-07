// DG Agent Navigation Menu
const MDGAgent = [
  {
    label: 'Dashboard',
    icon: 'i-solar-widget-5-line-duotone',
    to: {
      name: 'dga.dashboard'
    }
  },
  {
    label: 'Growers',
    icon: 'i-solar-users-group-rounded-line-duotone',
    to: {
      name: 'dga.growers'
    }
  },
  {
    label: 'Tasks',
    icon: 'i-solar-checklist-minimalistic-line-duotone',
    to: {
      name: 'dga.tasks'
    }
  },
  {
    label: 'Programs',
    icon: 'i-lucide-file-text',
    children: [
      {
        label: 'Grower Programs',
        to: {
          name: 'dga.grower-programs'
        }
      },
      {
        label: 'Program Receipts',
        to: '/dga/program-receipts'
      }
    ]
  },
  {
    label: 'Events',
    icon: 'i-lucide-calendar',
    children: [
      {
        label: 'Task Events',
        to: '/dga/task-events'
      },
      {
        label: 'Other Events',
        to: '/dga/other-events'
      }
    ]
  }
]

export default MDGAgent
