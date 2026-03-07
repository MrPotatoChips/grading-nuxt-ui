import { useOverlay } from '@nuxt/ui/composables/useOverlay'

import LazyUModal from '@nuxt/ui/components/Modal.vue'
import LazyUButton from '@nuxt/ui/components/Button.vue'

import { h as createElement, ref } from 'vue'

const UIClassConfig = {
  description: 'hidden',
  header: 'justify-center min-h-8 p-3',
  title: 'text-lg text-warning',
  body: 'text-center',
  footer: 'p-3',
  content: 'data-[state=open]:animate-(--scale-up-down-show) data-[state=closed]:animate-(--scale-up-down-hide) md:max-w-md'
}

const confirm = (
  options = {
    title: '',
    body: '',
    confirmButtonText: '',
    confirmButtonVariant: '',
    discardButtonVariant: '',
    discardButtonText: '',
    preConfirm: () => new Promise(resolve => resolve(true))
  }
) => {
  return new Promise((resolve, reject) => {
    const overlay = useOverlay()
    const isLoading = ref(false)

    overlay.closeAll()

    const MODAL_LOGOUT = createElement(LazyUModal, { ui: Object.assign(UIClassConfig, { title: 'text-lg text-warning' }), close: false }, {
      body: () => options?.body || 'Proceed this Action?',
      footer: props => {
        return createElement('div', { class: 'w-full flex justify-end gap-2' }, [
          createElement(
            LazyUButton,
            {
              loading: isLoading.value,
              color: options?.confirmButtonVariant || 'primary',
              onClick: async () => {
                isLoading.value = true

                const actionResults = () => {
                  return typeof options?.preConfirm === 'function' ? options.preConfirm(isLoading) : Promise.resolve(true)
                }

                return actionResults().then(resolve).catch(reject).finally(() => {
                  props.close()
                  isLoading.value = false
                })
              }
            },
            () => options?.confirmButtonText || 'Confirm'
          ),
          createElement(
            LazyUButton,
            {
              disabled: isLoading.value,
              color: options?.discardButtonVariant || 'neutral',
              variant: 'outline',
              onClick: () => {
                props.close()
              }
            },
            () => options?.discardButtonText || 'Cancel'
          )
        ])
      }
    })

    const modal = overlay.create(MODAL_LOGOUT, {
      props: {
        title: options?.title || 'Confirmation',
        description: options?.body || 'Please confirm your Actions'
      },
      destroyOnClose: true
    })

    modal.open()
  })
}

const invalid = (
  options = {
    title: '',
    body: '',
    confirmButtonText: '',
    confirmButtonVariant: '',
    preConfirm: () => new Promise(resolve => resolve(true))
  }
) => {
  return new Promise((resolve, reject) => {
    const overlay = useOverlay()
    const isLoading = ref(false)

    overlay.closeAll()

    const MODAL_LOGOUT = createElement(LazyUModal, { ui: Object.assign(UIClassConfig, { title: 'text-lg text-error' }), close: false }, {
      body: () => options?.body || 'Your inputs seem to be incorrect or incomplete, please check and try again.',
      footer: props => {
        return createElement('div', { class: 'w-full flex justify-end gap-2' }, [
          createElement(
            LazyUButton,
            {
              loading: isLoading.value,
              color: options?.confirmButtonVariant || 'error',
              onClick: async () => {
                isLoading.value = true

                const actionResults = () => {
                  return typeof options?.preConfirm === 'function' ? options.preConfirm(isLoading) : Promise.resolve(true)
                }

                return actionResults().then(resolve).catch(reject).finally(() => {
                  props.close()
                  isLoading.value = false
                })
              }
            },
            () => options?.confirmButtonText || 'Dismiss'
          )
        ])
      }
    })

    const modal = overlay.create(MODAL_LOGOUT, {
      props: {
        title: options?.title || 'Validation Error',
        description: options?.body || 'Invalid or incomplete inputs detected.'
      },
      destroyOnClose: true
    })

    modal.open()
  })
}

const success = (
  options = {
    title: '',
    body: '',
    confirmButtonText: '',
    confirmButtonVariant: '',
    preConfirm: () => new Promise(resolve => resolve(true))
  }
) => {
  return new Promise((resolve, reject) => {
    const overlay = useOverlay()
    const isLoading = ref(false)

    overlay.closeAll()

    const MODAL_LOGOUT = createElement(LazyUModal, { ui: Object.assign(UIClassConfig, { title: 'text-lg text-success' }), close: false }, {
      body: () => options?.body || 'No Response',
      footer: props => {
        return createElement('div', { class: 'w-full flex justify-end gap-2' }, [
          createElement(
            LazyUButton,
            {
              loading: isLoading.value,
              color: options?.confirmButtonVariant || 'primary',
              onClick: async () => {
                isLoading.value = true

                const actionResults = () => {
                  return typeof options?.preConfirm === 'function' ? options.preConfirm(isLoading) : Promise.resolve(true)
                }

                return actionResults().then(resolve).catch(reject).finally(() => {
                  props.close()
                  isLoading.value = false
                })
              }
            },
            () => options?.confirmButtonText || 'Dismiss'
          )
        ])
      }
    })

    const modal = overlay.create(MODAL_LOGOUT, {
      props: {
        title: options?.title || 'Successful',
        description: options?.body || 'No Response'
      },
      destroyOnClose: true
    })

    modal.open()
  })
}

export const overlays = {
  confirm,
  invalid,
  success
}

