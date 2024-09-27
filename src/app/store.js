import { configureStore } from '@reduxjs/toolkit'
import userStateReducer from './userSlice'
import adminReducer  from './AdminSlice'
import UsersReducer from './coliSlice'
import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

export default () => {
    let store = configureStore({
        reducer: {
            userState: persistReducer(persistConfig, userStateReducer),
            admin: persistReducer(persistConfig, adminReducer),
            users: persistReducer(persistConfig, UsersReducer)
        }
    })
    let persistor = persistStore(store)
    return { store, persistor }
}