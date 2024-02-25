import { ColisContainer } from "../components/Colis";
import { BottomNav, FixedNavbar } from "../components/Nav";
import { Start } from "./Start";
import { useData } from "../hooks/useData";
import { useEffect, useState } from "react";
import { fetchJSON } from "../functions/API";
import { serverPath } from "../main";

export function Home() {

    const {userState, user, type,} = useData()
    const [colis, setColis] = useState([])
    
    if(userState) {
        useEffect(() => {
            fetchJSON(`${serverPath}allColis?refKey=${user._id}&type=${type}`).then(
                data => {
                    // console.log(data)
                    // dispatch(updateColis(data))
                    setColis([
                        ...data.allColis
                    ])
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
                <FixedNavbar />
                <div className="body">
                    <p style={{ color: 'black', fontWeight: 'bold', padding: '5px' }}>Récents</p>
                    <ColisContainer coliList={colis} />
                </div>
                <BottomNav />
            </>
        )
    } else {
        return (
            <Start />
        )
    }

}