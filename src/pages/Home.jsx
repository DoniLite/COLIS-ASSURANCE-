import { ColisContainer } from "../components/Colis";
import { BottomNav, FixedNavbar } from "../components/Nav";
import { Start } from "./Start";
import { useData } from "../hooks/useData";
import { useEffect, useState } from "react";
import { fetchJSON } from "../functions/API";
import { serverPath } from "../main";
import { updateBalance } from "../app/userSlice";
import {useDispatch} from 'react-redux'

export function Home() {

    // const ws = new WebSocket('ws://localhost:3005/')
    const {userState, user, type,} = useData()
    const [colis, setColis] = useState([])
    const dispatch = useDispatch()
    
    if(userState) {
        useEffect(() => {
            fetchJSON(`${serverPath}allColis?refKey=${user._id}&type=${type}`).then(
                data => {
                    // console.log(data)
                    // dispatch(updateColis(data))
                    setColis([
                        ...data.allColis
                    ])
                    dispatch(updateBalance(data.balance))
                    console.log(data)
                }
            ).catch(
                error => {
                    console.log(error)
                }
            )
        }, [])
        
        return (
            <>
               {user.blocked===false && (
                    <>
                        <FixedNavbar />
                        <div className="body">
                            <p style={{ color: 'black', fontWeight: 'bold', padding: '5px' }}>Récents</p>
                            <ColisContainer coliList={colis} />
                        </div>
                        <BottomNav />
                    </>
               )}

               {user.blocked===true && (
                    <>
                        <p style={{textAlign: 'center', fontWeight: 'bold', marginTop: '50vh'}}>L'accès à votre compte vous a été revoqué...</p>
                    </>
               )}
            </>
        )
    } else {
        return (
            <Start />
        )
    }

}