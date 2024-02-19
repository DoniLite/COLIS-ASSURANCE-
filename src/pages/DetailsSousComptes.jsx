import { useEffect, useReducer, useState} from "react"
import { NavLink, useParams } from 'react-router-dom'
import { fetchJSON } from "../functions/API"
import { serverPath } from "../main"
import { notify } from "../hooks/useNofication"
import { ColisContainer } from "../components/Colis"
import { useData } from "../hooks/useData"
import { coliReducer } from "./Historique"


export function SousComptesDetails() {

    /**
    * 
    * @param {Event} e 
    */
    function setActive(e) {
        const allItems = document.querySelectorAll('.stat-item')
        const element = e.currentTarget
        allItems.forEach(item => {
            item.classList.remove('active')
        })
        element.classList.add('active')
    }

    const [user, setUser] = useState({})
    const [colis, setColis] = useState([])
    const [filterState, setFilterState] = useState('Tous les colis')
    const [state, dispatch] = useReducer(coliReducer, colis)
    const {balance} = useData()
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
                    dispatch({type: 'update', payload: data.allColis})
                }
            }
        ).catch(

        )
    }, [])

    const colisTerminés = colis.filter(item => item.state === 'terminé')
    const colisEnCours = colis.filter(item => item.state === 'en cours')
    const colisAnnulés = colis.filter(item => item.state === 'annulé')

    return (
        <>
            <div className="first-story-container">
                <NavLink style={{ color: '#ffffff', padding: '1rem' }} to={'/'}>
                    <i className="fa-solid fa-circle-left fa-2x"></i>
                </NavLink>
                <center style={{ marginTop: '2.5rem' }}>
                    <img src={`${serverPath}assets/user/${user.userIcon}`} alt="" className="user-balance" />
                    <p style={{ fontWeight: 'bold', marginBottom: '2rem' }}>{user.firstname} {user.lastname}</p>
                    <h3 style={{ marginBottom: '2rem' }}>BALANCE {balance}</h3>
                </center>

                <div className="side-stat">
                    <div style={{ color: '#049104', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="stat-item" onClick={(e) => { dispatch({ type: 'terminé', payload: colisTerminés }); setActive(e); setFilterState('terminés') }}>
                        <div>
                            <center>
                                <h3>{colisTerminés.length}</h3>
                            </center>
                            <small>Terminés</small>
                        </div>
                    </div>
                    <div style={{ color: '#d44115' }} className="stat-item" onClick={(e) => { dispatch({ type: 'annulé', payload: colisAnnulés }); setActive(e); setFilterState('annulé') }}>
                        <div>
                            <center>
                                <h3>{colisAnnulés.length}</h3>
                            </center>
                            <small>Annulés</small>
                        </div>
                    </div>
                    <div style={{ color: '#d48115' }} className="stat-item" onClick={(e) => { dispatch({ type: 'en cours', payload: colisEnCours }); setActive(e); setFilterState('en cours')}}>
                        <div>
                            <center>
                                <h3>{colisEnCours.length}</h3>
                            </center>
                            <small>En cours</small>
                        </div>
                    </div>
                </div>
            </div>

            <p style={{ marginTop: '350px', padding: '1rem' }}>{filterState}</p>
            <ColisContainer coliList={state} />
        </>
    )
}