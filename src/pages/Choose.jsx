import { NavLink, useParams, useNavigate } from "react-router-dom"
import colis from "../assets/img/COLIS.png"
import { setUserType } from "../app/userSlice"
import { useSelector, useDispatch } from 'react-redux'
import { useData } from "../hooks/useData"
import { fetchJSON } from "../functions/API"
import { Loader, serverPath } from "../main"
import { notify } from "../hooks/useNofication"
import { useCustomNavigation } from "../hooks/useCustomNavigation"
import { useState } from "react"


export function Choice() {

    const params = useParams()
    const navigate = useNavigate()
    const price = params.data
    const {user, type} = useData()
    const {state, navigateTo} = useCustomNavigation()
    const [link, setLink] = useState('')
    const [mode, setMode] = useState('')

    /**
     * 
     * @param {Event} e 
     */
    function setActive(e) {
        const allItems = document.querySelectorAll('.choice-item')
        const element = e.currentTarget
        allItems.forEach(item => {
            item.classList.remove('active')
        })
        element.classList.add('active')
    }

    function initPayement() {
        navigateTo('submitting')
        const dataTofetch = {
            price,
            id: user._id,
            mode,
            type
        }

        fetchJSON(`${serverPath}initPayement`, {
            json: dataTofetch
        }).then(
            data => {
                navigateTo('idle')
                if(data.statut === true) {
                    notify.success('Votre requête a bien été envoyée')
                    // navigate(link)
                } else {
                    notify.failed('échec de l\'opération veuillez retenter')
                }
            }
        ).catch(
            err => {
                navigateTo('idle')
                notify.failed('une erreur est survenue')
            }
        )
        
    }
    console.log(params)
    return(
        <>
        <a href="tel:+22607224034"></a>
            {state === 'submitting' && <Loader />}
            <div style={{ padding: '1rem' }}>
                <NavLink style={{ color: '#027bff' }} to={'/profil'}>
                    <i className="fa-solid fa-circle-left fa-2x"></i>
                </NavLink>
            </div>
            <center>
                <p style={{fontSize: '25px', fontWeight: 'bold', marginTop: '4rem'}}>Service Client</p>
            </center>

            <div className="choice">
                <div className="choice-item active" onClick={(e) => { setActive(e); setLink(''); setMode('Agence')}}>
                    <div>
                        <center>
                            <i className="fa-brands fa-dropbox fa-2x"></i>
                            <h3>Agence</h3>
                        </center>
                    </div>
                </div>
                <div className="choice-item" onClick={(e) => { setActive(e); setLink('tel:+22607224034'); setMode('Appel') }}>
                    <div>
                        <center>
                            <i className="fa-solid fa-phone fa-2x"></i>
                            <h3>Appeler</h3>
                        </center>
                    </div>
                </div>
                <div className="choice-item" onClick={(e) => { setActive(e); setLink('https://wa.me/22655270506'); setMode('WhatsApp') }}>
                    <div>
                        <center>
                            <i className="fa-brands fa-square-whatsapp fa-3x"></i>
                            <h3>WhatsApp</h3>
                        </center>
                    </div>
                </div>
            </div>

           <center>
                <button className="go" onClick={initPayement}>Allez-y</button>
           </center>
        </>
    )
}

export function Choose() {

    const dispatch = useDispatch()
    const {type} = useData()
    const navigate = useNavigate()

    function putUserPrincipale(e) {
        e.preventDefault()
        dispatch(setUserType('principal'))
        navigate(`/connexion/${type}`)
    }

    function putUserSecondaire(e) {
        e.preventDefault()
        dispatch(setUserType('secondaire'))
        navigate(`/connexion/${type}`)
    }

    return(
        <>
            <div className="flex-div">
                <div style={{ padding: '1rem', marginTop: '15px' }}>
                    <NavLink style={{ color: '#027bff' }} to={'/'}>
                        <i className="fa-solid fa-circle-left fa-2x"></i>
                    </NavLink>
                </div>
                <img src={colis} alt="" className="app-logo"/>
            </div>

            <center>
                <p style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '5rem', position: 'relative', top: '2rem' }}>Qui se connecte?</p>
            </center>

            <div className="who-is-connect">
                <div>
                    <center>
                        <div onClick={putUserPrincipale} className="user-cont" style={{ backgroundColor: '#027bff', color: '#ffffff' }}>
                            <i className="fa-solid fa-user-plus fa-2x"></i>
                        </div>
                    </center>   
                    <center style={{marginTop: '1rem'}}>
                        <h4>Principal</h4>
                    </center>
                </div>
                <div>
                    <center>
                        <div onClick={putUserSecondaire} className="user-cont">
                            <i className="fa-solid fa-user-plus fa-2x"></i>
                        </div>
                    </center>
                    <center style={{ marginTop: '1rem' }}>
                        <h4>Sous-comptes</h4>
                    </center>
                </div>
            </div>

            <center style={{ marginTop: '25vh' }}>
                <small>@audacedigit.com</small>
            </center>
        </>
    )
}