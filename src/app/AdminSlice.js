import { createSlice } from '@reduxjs/toolkit'

export const AdminSlice = createSlice({
    name: 'coliState',
    initialState: {
        canConnect: false
    },
    reducers: {
        putAdminConnected: (state) => {
            return {
                ...state,
                canConnect: true
            }
        }
    }
})

export const { putAdminConnected } = AdminSlice.actions

export default AdminSlice.reducer