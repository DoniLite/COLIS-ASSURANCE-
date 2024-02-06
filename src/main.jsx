import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import persistedStore from './app/store'
import { PersistGate } from 'redux-persist/integration/react'
import { HashLoader } from "react-spinners";


const { store, persistor } = persistedStore();


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <PersistGate loading={<Loader/>} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
)

export function Loader() {
  return(
    <>
      <HashLoader color={"#1d1d1d"} />
    </>
  )
}

export const serverPath = 'http://localhost:3005/'
//'https://coli-api.onrender.com/' 