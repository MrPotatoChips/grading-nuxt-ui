// Marketing Officer Navigation Menu
const MMarketingOfficer = [
  {
    label: 'Dashboard',
    icon: 'i-lucide-layout-dashboard',
    to: '/mko/dashboard'
  },
  {
    label: 'Grower Programs',
    icon: 'i-lucide-file-text',
    children: [
      {
        label: 'Pending',
        to: '/mko/grower-programs/pending'
      },
      {
        label: 'History',
        to: '/mko/grower-programs/history'
      },
      {
        label: 'Program Receipts',
        to: '/mko/grower-programs/receipts'
      }
    ]
  }
]

export default MMarketingOfficer
