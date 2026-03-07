import { h as createElement } from 'vue'

import { upperFirst } from 'scule'

import LazyUButton from '@nuxt/ui/components/Button.vue'
import LazyUDropdownMenu from '@nuxt/ui/components/DropdownMenu.vue'
import LazyUCheckbox from '@nuxt/ui/components/Checkbox.vue'

export default {
  methods: {

  tableNumber ({ table, row }) {
    const currentPage = table.options.state.pagination?.pageIndex + 1
    const perPage = table.options.state.pagination?.pageSize || 5

    return currentPage * perPage - perPage + (row.index + 1)
  },

  transformColumns (column) {
    if (!Object.keys(column).includes('accessorKey')) {
      column.accessorKey = column.id
    }

    if (!Object.keys(column).includes('enableSorting')) {
      column.enableSorting = false
    }

    if (!Object.keys(column).includes('header')) {
      column.header = this.getTableHeaderSettings
    }

    if (column.id === 'index') {
      column.enableHiding = false
      column.enablePinning = false
    }

    return column
  },

  getTableHeaderSelect ({ table, column }) {
    if (!column.getIsPinned()) {
      column.pin('left')
    }

    return createElement(LazyUCheckbox, {
      size: 'xl',
      modelValue: table.getIsSomeRowsSelected() ? 'indeterminate' : table.getIsAllRowsSelected(),
      onChange: () => {
        table.toggleAllRowsSelected()
      },
      'aria-label': 'Select All Rows'
    })
  },

  getTableHeaderSettings({ table, column }) {
    const isSorted = column.getIsSorted()
    const isPinned = column.getIsPinned()

    const label = column.columnDef.meta?.label || upperFirst(column.id)

    const items = []

    if (column.getCanSort()) {
      items.push(this.getTableSorting({ table, column }, isSorted))
    }

    if (column.getCanPin()) {
      items.push(this.getTablePining(column, isPinned))
    }

    if (items.length <= 0) {
      return label
    }

    return createElement(
      LazyUDropdownMenu,
      {
        'aria-label': 'Actions Dropdown',
        content: {
          align: 'start'
        },
        items
      },
      () => {
        const icon = column.getCanSort() ? (
            isSorted ? (String(isSorted).toLowerCase() === 'asc' ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down') : 'i-lucide-chevrons-up-down'
        ) : ''

        return createElement(LazyUButton, {
          label,
          color: 'neutral',
          variant: 'ghost',
          trailing: true,
          icon,
          class: '-mx-2.5 data-[state=open]:bg-elevated cursor-pointer',
          'aria-label': `Sort by ${String(isSorted).toLowerCase() === 'asc' ? 'descending' : 'ascending'}`
        })
      }
    )
  },

  getTableSorting({ table, column }, isSorted) {
    return [
      {
        label: 'Sorting',
        type: 'label'
      },
      {
        label: 'Asc',
        type: 'checkbox',
        class: 'cursor-pointer',
        icon: 'i-lucide-chevron-up',
        checked: isSorted === 'asc',
        onSelect: () => {
          if (isSorted === 'asc') {
            table.resetSorting()
          } else {
            column.toggleSorting(false)
          }
        }
      },
      {
        label: 'Desc',
        type: 'checkbox',
        class: 'cursor-pointer',
        icon: 'i-lucide-chevron-down',
        checked: isSorted === 'desc',
        onSelect: () => {
          if (isSorted === 'desc') {
            table.resetSorting()
          } else {
            column.toggleSorting(true)
          }
        }
      }
    ]
  },

  getTablePining(column, isPinned) {
    return [
      {
        label: 'Column Freezing',
        type: 'label'
      },
      {
        label: 'Left',
        type: 'checkbox',
        class: 'cursor-pointer',
        icon: 'i-lucide-chevron-left',
        checked: isPinned === 'left',
        onSelect: () => {
          if (isPinned === 'left') {
            column.pin(false)
          } else {
            column.pin('left')
          }
        }
      },
      {
        label: 'Right',
        type: 'checkbox',
        class: 'cursor-pointer',
        icon: 'i-lucide-chevron-right',
        checked: isPinned === 'right',
        onSelect: () => {
          if (isPinned === 'right') {
            column.pin(false)
          } else {
            column.pin('right')
          }
        }
      }
    ]
  }
  }
}
