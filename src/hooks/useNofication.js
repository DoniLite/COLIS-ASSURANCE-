import {toast} from 'react-toastify'

export const notify = {
    success: (message) => toast.success(message),
    failed: (message) => toast.error(message),
    warning: (message) => toast.warning(message)
}