import { createSlice } from '@reduxjs/toolkit'

export const coliSlice = createSlice({
    name: 'coliState',
    initialState: {
        data: undefined
    },
    reducers: {
        updateColis: (state, action) => {
            return {
                ...state,
                data: action.payload,
            }
        }
    }
})

export const {updateColis} = coliSlice.actions

export default coliSlice.reducer