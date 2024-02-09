import { ColisContainer } from "../components/Colis";
import user from "../assets/img/Ghost.jpeg"
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { fetchJSON } from "../functions/API";
import { useData } from "../hooks/useData";
import { serverPath } from "../main";
import { notify } from "../hooks/useNofication";

/**
 * @param {Object[]} state - L'état du reducer.
 * @param {{type: 'en cours'|'terminé'|'annulé', payload: Object[]}} action - L'objet de réduction permettant de recueillir l'action.
 */
function reducer(state, action) {
    if(action.type === 'en cours') {
        return state.filter(item => item.state === 'en cours')
    } else if(action.type === 'terminé') {
        return state.filter(item => item.state === 'terminé')
    } else if (action.type === 'annulé') {
        return state.filter(item => item.state === 'annulé')
    }
}

const coliList = [
    {
        index: 0,
        price: '18 000',
        isValidate: true,
        state: 'livré'
    },
    {
        index: 0,
        price: '18 000',
        isValidate: true,
        state: 'en cours'
    }, 
    {
        index: 0,
        price: '18 000',
        isValidate: true,
        state: 'livré'
    }, 
    {
        index: 0,
        price: '18 000',
        isValidate: true,
        state: 'livré'
    }, 
    {
        index: 0,
        price: '18 000',
        isValidate: true,
        state: 'annulé'
    }, 
    {
        index: 0,
        price: '18 000',
        isValidate: true,
        state: 'en cours'
    }, 
    {
        index: 0,
        price: '18 000',
        isValidate: true,
        state: 'en cours'
    }, 
    {
        index: 0,
        price: '18 000',
        isValidate: true,
        state: 'en cours'
    }
]


export function Historique() {

    const params = useParams()
    const {user} = useData()
    const [colis, addColis] = useState(null)
    const [state, dispatch] = useReducer(reducer, colis)
    useEffect(() => {
        fetchJSON(`${serverPath}allColis?refKey=${params.id}`).then(
            data => {
                console.log(data)
                if(data.statut && data.statut === false) {
                    notify.warning('Une erreur s\'est produite 🤕')
                } else {
                    addColis(data.allColis)
                }
            }
        )
    }, [])
    return(
        <>
            <div className="first-story-container">
                <NavLink style={{ color: '#ffffff', padding: '1rem' }} to={'/'}>
                    <i className="fa-solid fa-circle-left fa-2x"></i>
                </NavLink>
                <center style={{marginTop: '2.5rem'}}>
                    <img src={`${serverPath}assets/user/${user.userIcon}`} alt="" className="user-balance" />
                    <p style={{ fontWeight: 'bold', marginBottom: '2rem' }}>{user.firstname} {user.lastname}</p>
                    <h3 style={{marginBottom: '2rem'}}>BALANCE {user.balance[0].balance}</h3>
                </center>

                <div className="side-stat">
                    <div style={{ color: '#049104', display: 'flex', justifyContent: 'center', alignItems: 'center'}} className="stat-item">
                        <div>
                            <center>
                                <h3>15</h3>
                            </center>
                            <small>En cours</small>
                        </div>
                    </div>
                    <div style={{ color: '#d44115'}} className="stat-item">
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

            <p style={{marginTop: '350px', padding: '1rem'}}>En cours</p>
            <ColisContainer coliList={state} />
        </>
    )
}