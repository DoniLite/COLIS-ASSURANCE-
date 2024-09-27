import {toast} from 'react-toastify'

/**
 * Object de notification prenant des paramètre selon la callback appellé 
 * @type {{
 * success: (message:string) => any,
 * failed: (message:string) => any,
 * warning: (message:string) => any,
 * customSuccess : (message: {messageTitle: string}, duration: number) => Promise<any>,
 * customFailed : (message: {messageTitle: string}, duration: number) => Promise<any>,
 * customWarning : (message: {messageTitle: string}, duration: number) => Promise<any>,
 * }}
 */
export const notify = {
    success: (message) => toast.success(message),
    failed: (message) => toast.error(message),
    warning: (message) => toast.warning(message),
    customSuccess: async (message = {}, duration) => {
        let setTimeDuration = 0
        for (const [key, value] of Object.entries(message)) {
            setTimeout(() => toast.success(value), setTimeDuration)
            setTimeDuration += duration
        }
    },
    customFailed: async (message = {}, duration) => {
        let setTimeDuration = 0
        for (const [key, value] of Object.entries(message)) {
            setTimeout(() => toast.error(value), setTimeDuration)
            setTimeDuration += duration
        }
    },
    customWarning: async (message = {}, duration) => {
        let setTimeDuration = 0
        for (const [key, value] of Object.entries(message)) {
            setTimeout(() => toast.warning(value), setTimeDuration)
            setTimeDuration += duration
        }
    },
}