import { useSelector } from 'react-redux'
import { reduceBalance } from '../functions/sliceBalance'

export function useData() {
    /**
     * @type {{user?: string, firstname?: string, blocked?: boolean, lastname?: string, username: string, password?: string, balance?: number, email?: string, phoneNumber?: string, location?: string, userIcon?: string, accounts?: number, livraisons: number, isChecked?: boolean, profilCompleted: boolean, registerDate: typeof Date | string, _id: string}}
     */
    const user = useSelector((state) => state.userState.data.user)
    /** 
     * @type {'principal'|'secondaire'}
     */
    const type = useSelector((state) => state.userState.type)
    /**
     * @type {boolean}
     */
    const userState = useSelector((state) => state.userState.value)
    /**
     * @type {boolean}
     */
    const updateData = useSelector((state) => state.userState.updateData)
    /**
     * @type {string}
     */
    const balance = reduceBalance(useSelector((state) => state.userState.balance))
    /**
     * @type {number}
     */
    const trueBalance = useSelector((state) => state.userState.balance) 
    /**
     * @type {boolean}
     */
    const adminAccess = useSelector((state) => state.admin.canConnect)

    return {
        user,
        type,
        userState,
        updateData,
        balance,
        adminAccess,
        trueBalance
    }
}