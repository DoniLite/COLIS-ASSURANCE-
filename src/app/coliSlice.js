import { createSlice } from "@reduxjs/toolkit";


export const UsersSlice = createSlice({
    name: 'UsersSlice',
    initialState: {
        list: []
    },
    reducers: {
        putList:(state, action) => {
            return{
                ...state,
                list: action.payload
            }
        },
        filterList: (state, action) => {
            const {users, value} = action.payload
            return{
                ...state,
                list: users.filter(el => {
                    const lowercaseFirstName = el.hasOwnProperty('firstname') ? el.firstname.toLowerCase() : '';
                    const lowercaseLastName = el.hasOwnProperty('lastname') ? el.lastname.toLowerCase() : '';
                    const lowercaseUsername = el.username.toLowerCase();
                    return lowercaseFirstName.includes(value) || lowercaseLastName.includes(value) || lowercaseUsername.includes(value);
                })
            }
        }
    }
})

export const {putList, filterList} = UsersSlice.actions

export default UsersSlice.reducer