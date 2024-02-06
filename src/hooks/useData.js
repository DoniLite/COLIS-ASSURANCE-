import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export function useData() {
    const user = useSelector((state) => state.userState.data.user)
    const type = useSelector((state) => state.userState.type)
    const userState = useSelector((state) => state.userState.value)
    const updateData = useSelector((state) => state.userState.updateData)

    return{
        user,
        type,
        userState,
        updateData,
    }
}