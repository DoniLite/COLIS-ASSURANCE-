import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export function useData() {
    /**
     * @type {{refkey?: string, firstname?: string, lastname?: string, username: string, password?: string, balance?: number, email?: string, phoneNumber?: string, location?: string, userIcon?: string, accounts?: number, livraisons: number, profilCompleted: boolean, registerDate: typeof Date | string}}
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
     * @type {typeof user.balance}
     */
    const balance = useSelector((state) => state.userState.balance)
    /**
     * @type {boolean}
     */
    const adminAccess = useSelector((state) => state.userState.adminAccess)

    return {
        user,
        type,
        userState,
        updateData,
        balance,
        adminAccess
    }
}