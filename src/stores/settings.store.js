import { defineStore } from "pinia"

const SETTINGS_STORAGE_KEY = 'settings'

const useSettings = defineStore(SETTINGS_STORAGE_KEY, {
  state: () => ({
    miniSidebar: false,
    sidebar: false,
    navbar: false,
    footer: false
  }),
  getters: {
    miniSidebarState: state => state.miniSidebar,
    sidebarState: state => state.sidebar,
    navbarState: state => state.navbar,
    footerState: state => state.footer,
    layoutState: state => state.layout
  },
  actions: {
    toggleMiniSidebar() {
      this.miniSidebar = !this.miniSidebar
    },
    toggleSidebar() {
      this.sidebar = !this.sidebar
    },
    toggleNavbar() {
      this.navbar = !this.navbar
    },
    toggleFooter() {
      this.footer = !this.footer
    },
    setLayout(layout) {
      this.layout = layout
    }
  },
  persist: {
    key: SETTINGS_STORAGE_KEY,
    storage: localStorage
  }
})

export { useSettings }
