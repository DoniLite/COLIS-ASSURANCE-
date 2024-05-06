import { createSlice } from '@reduxjs/toolkit'

export const AdminSlice = createSlice({
    name: 'adminState',
    initialState: {
        canConnect: false
    },
    reducers: {
        putAdminConnected: (state) => {
            return {
                ...state,
                canConnect: true
            }
        },
        disconnectAdmin: (state) => {
            return{
                ...state,
                canConnect: false
            }
        }
    }
})

export const { putAdminConnected, disconnectAdmin } = AdminSlice.actions

export default AdminSlice.reducer