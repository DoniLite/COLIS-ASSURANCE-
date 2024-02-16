import { configureStore } from '@reduxjs/toolkit'
import userStateReducer from './userSlice'
import adminReducer from './AdminSlice'
import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, userStateReducer)

export default () => {
    let store = configureStore({
        reducer: {
            userState: persistedReducer,
            admin: adminReducer,
        }
    })
    let persistor = persistStore(store)
    return { store, persistor }
}