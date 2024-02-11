import { useEffect, useState} from "react"
import { useParams } from 'react-router-dom'
import { fetchJSON } from "../functions/API"
import { serverPath } from "../main"
import { notify } from "../hooks/useNofication"


export function SousComptesDetails() {
    const [user, setUser] = useState({})
    const [colis, setColis] = useState(null)
    const params = useParams()

    useEffect(() => {
        fetchJSON(`${serverPath}sousComptes?id=${params.id}`).then(
            data => {
                console.log(data)
                if(data.statut && data.statut === false) {
                    notify.failed('Aucun utilisateur ne possède ce compte')
                }else {
                    setUser({
                        ...data.userData
                    })
                    setColis([
                        ...data.allColis
                    ])
                }
            }
        ).catch(

        )
    }, [])

    return (
        <>
            <div className="first-story-container">
                <NavLink style={{ color: '#ffffff', padding: '1rem' }} to={'/'}>
                    <i className="fa-solid fa-circle-left fa-2x"></i>
                </NavLink>
                <center style={{ marginTop: '2.5rem' }}>
                    <img src={`${serverPath}assets/user/${user.userIcon}`} alt="" className="user-balance" />
                    <p style={{ fontWeight: 'bold', marginBottom: '2rem' }}>{user.firstname} {user.lastname}</p>
                    <h3 style={{ marginBottom: '2rem' }}>BALANCE {user.balance[0].balance}</h3>
                </center>

                <div className="side-stat">
                    <div style={{ color: '#049104', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="stat-item">
                        <div>
                            <center>
                                <h3>15</h3>
                            </center>
                            <small>En cours</small>
                        </div>
                    </div>
                    <div style={{ color: '#d44115' }} className="stat-item">
                        <div>
                            <center>
                                <h3>10</h3>
                            </center>
                            <small>Terminés</small>
                        </div>
                    </div>
                    <div style={{ color: '#d48115' }} className="stat-item">
                        <div>
                            <center>
                                <h3>03</h3>
                            </center>
                            <small>Annulés</small>
                        </div>
                    </div>
                </div>
            </div>

            <p style={{ marginTop: '350px', padding: '1rem' }}>En cours</p>
            <ColisContainer coliList={colis} />
        </>
    )
}