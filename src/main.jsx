import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import persistedStore from './app/store'
import { PersistGate } from 'redux-persist/integration/react'
import { HashLoader } from "react-spinners";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const { store, persistor } = persistedStore();


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <PersistGate persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
)

export function Loader() {
  return(
    <>
      <center style={{position: 'absolute', top: '50px', left: '40%'}}>
        <HashLoader color={"#1d1d1d"} />
      </center>
    </>
  )
}

export const serverPath = 'http://localhost:3005/'
//'https://coli-api.onrender.com/' 