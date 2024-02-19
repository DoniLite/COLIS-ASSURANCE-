import { createSlice } from '@reduxjs/toolkit'
import { fetchJSON } from '../functions/API'

export const authentificateSlice = createSlice({
    name: 'userState',
    initialState: {
        value: false,
        data: {},
        type: undefined,
        updateData: false,
        balance: 0
    },
    reducers: {
        putConnected: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes.
            // Also, no return statement is required from these functions.
            return{
                ...state,
                value: true
            }
        },
        updateBalance: (state, action) => {

            return {
                ...state,
                balance: action.payload
            }
        
        },
        disconnected: (state) => {
            return{
                ...state,
                value: false,
                data: {}
            }
        },
        setUserType: (state, action) => {
            return {
                ...state,
                type: action.payload
            }
        },
        addDataToState: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes.
            // Also, no return statement is required from these functions.
            
            return{
                ...state,
                data: action.payload
            }
        },
        ToogleUpdate: (state, action) => {
            return {
                ...state,
                updateData: action.payload
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { putConnected, updateBalance, disconnected, addDataToState, setUserType, ToogleUpdate } = authentificateSlice.actions

export default authentificateSlice.reducer