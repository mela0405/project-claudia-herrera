import { getCurrentInstance } from 'vue'

export function useGlobalToast() {
  const vm = getCurrentInstance()
  const toastRef = vm?.proxy?.$root?.$refs?.toastRef

  return {
    show: (msg, color = 'pink-darken-2', icon = 'mdi-check-circle') => {
      toastRef?.showToast(msg, color, icon)
    }
  }
}
