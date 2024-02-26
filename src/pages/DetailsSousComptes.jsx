import { useEffect, useReducer, useState} from "react"
import { NavLink, useParams } from 'react-router-dom'
import { fetchJSON } from "../functions/API"
import { serverPath } from "../main"
import { notify } from "../hooks/useNofication"
import { ColisContainer } from "../components/Colis"
import { useData } from "../hooks/useData"
import { coliReducer } from "./Historique"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Modal } from 'flowbite-react'


export function SousComptesDetails() {

    const [user, setUser] = useState({})
    const [colis, setColis] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const [action, setAction] = useState('')
    const [filterState, setFilterState] = useState('Tous les colis')
    const [state, dispatch] = useReducer(coliReducer, colis)
    const {user: admin} = useData()
    const params = useParams()

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

    function openActionBar(e) {
        e.preventDefault()
        const actionBar = document.querySelector('.action-bar')
        actionBar.style.display = 'block'
        // let div = document.createElement('div')
        // div.style.position = 'absolute'
        // div.style.top = '0'
        // div.style.left = '0'
        // div.style.bottom = '0'
        // div.style.right = '0'
        // div.style.backgroundColor = 'red'
        // const root = document.getElementById('root')
        // root.appendChild(div)
    }

    const actionBar = document.querySelector('.action-bar')

    function closeBox() {
        const actionBar = document.querySelector('.action-bar')
        actionBar.style.display = 'none'
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    function actionDirectors(e) {
        e.preventDefault()
        const action = e.currentTarget.innerText
        switch (action) {
            case 'Bloquer le compte':
                setAction('bloquer')
                setOpenModal(true)
                break
            case 'Supprimer le compte':
                setAction('supprimer')
                setOpenModal(true)
                break
            case 'Infos sur le compte':
                notify.failed('Cette fonctionnalité n\'est pas encore disponible')
                break
        }
            
        console.log(action)
    }

    function actionsHandler() {
        switch (action) {
            case 'bloquer':
                fetchJSON(`${serverPath}sousComptes?action=bloquer&id=${user._id}`).then(
                    data => {
                        console.log(data)
                        if(data.statut && data.statut === true) {
                            notify.success('Le compte a été bloqué')
                        }else {
                            notify.failed('Une erreur est survenue')
                        }
                    }
                ).catch(
                    err => {
                        notify.failed('Une erreur est survenue')
                    }
                )
                break
            case 'supprimer':
                fetchJSON(`${serverPath}accountsActions?action=supprimer&id=${user._id}&admin=${admin._id}`).then(
                    data => {
                        console.log(data)
                        if(data.statut && data.statut === true) {
                            notify.success('Le compte a été supprimé')
                        }else {
                            notify.failed('Une erreur est survenue')
                        }
                    }
                ).catch(
                    err => {
                        notify.failed('Une erreur est survenue')
                    }
                )
                break
        }
    }   

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

    const colisTerminés = colis.filter(item => item.state === 'livré')
    const colisEnCours = colis.filter(item => item.state === 'en cours')
    const colisAnnulés = colis.filter(item => item.state === 'annulé')

    return (
        <>
            <div className="first-story-container">
               <div className="flex">
                    <NavLink style={{ color: '#ffffff', padding: '1rem' }} to={'/compte-entreprise'}>
                        <i className="fa-solid fa-circle-left fa-2x"></i>
                    </NavLink>
                    <FontAwesomeIcon style={{ fontSize: '30px', fontWeight: 'bold', marginTop: '0.7rem', marginRight: '0.5rem', cursor: 'pointer' }} icon="fa-solid fa-ellipsis-vertical" onClick={openActionBar} />
                    <div className="action-bar" style={{position: 'absolute', display: 'none', right: '2.8rem', width: '15rem', backgroundColor: '#ffffff', transition: '.5s', zIndex: '99999',}}>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                            <div></div>
                            <div style={{color: 'black', position: 'absolute', top: '0.5rem', right: '1rem'}} onClick={closeBox}>
                                <i className="fa-solid fa-circle-xmark "></i>
                            </div>
                        </div>
                        <ul style={{width: '100%', color: 'black', listStyle: 'none'}}>
                            <li onClick={actionDirectors} style={{ width: '100%', padding: '5px', borderBottom: 'solid 1px #027bff' }}><FontAwesomeIcon icon="fa-solid fa-hand" style={{paddingRight: '5px'}} />Bloquer le compte</li>
                            <li onClick={actionDirectors} style={{ width: '100%', padding: '5px', borderBottom: 'solid 1px #027bff' }}><FontAwesomeIcon icon="fa-solid fa-trash" style={{ paddingRight: '5px' }} />Supprimer le compte</li>
                            <li onClick={actionDirectors} style={{ width: '100%', padding: '5px', borderBottom: 'solid 1px #027bff' }}><FontAwesomeIcon icon="fa-solid fa-circle-info" style={{ paddingRight: '5px' }} />Infos sur le compte</li>
                        </ul>
                    </div>
               </div>
                <center style={{ marginTop: '2.5rem' }}>
                    <img src={`${serverPath}assets/user/${user.userIcon}`} alt="" className="user-balance" />
                    <p style={{ fontWeight: 'bold', marginBottom: '2rem' }}>{user.firstname} {user.lastname}</p>
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

            <Modal show={openModal} onClose={() => setOpenModal(false)} style={{zIndex: '9999'}}>
                <div className="modal">
                    <h3>{action} le Compte?</h3>
                    <p>Voulez-vous vraiment {action} ce compte ? <br /> Si vous cliquez sur oui cette action ne pourra plus être irréversible</p>
                    <div className="flex">
                        <button variant="secondary" onClick={() => setOpenModal(false)}>
                            Annuler
                        </button>
                        <button variant="primary" onClick={actionsHandler}>
                            Oui
                        </button>
                    </div>
                </div>
            </Modal>

            <p style={{ marginTop: '350px', padding: '1rem' }}>{filterState}</p>
            <ColisContainer coliList={state} />
        </>
    )
}