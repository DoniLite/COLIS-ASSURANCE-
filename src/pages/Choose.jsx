import { NavLink, useParams, useNavigate } from "react-router-dom"
import colis from "../assets/img/COLIS.png"
import { setUserType } from "../app/userSlice"
import { useSelector, useDispatch } from 'react-redux'
import { useData } from "../hooks/useData"


export function Choice() {

    const params = useParams()
    console.log(params)
    return(
        <>
            <div style={{ padding: '1rem' }}>
                <NavLink style={{ color: '#027bff' }} to={'/profil'}>
                    <i className="fa-solid fa-circle-left fa-2x"></i>
                </NavLink>
            </div>
            <center>
                <p style={{fontSize: '25px', fontWeight: 'bold', marginTop: '4rem'}}>Service Client</p>
            </center>

            <div className="choice">
                <div className="choice-item">
                    <div>
                        <center>
                            <i className="fa-brands fa-dropbox fa-2x"></i>
                            <h3>Agence</h3>
                        </center>
                    </div>
                </div>
                <div className="choice-item">
                    <div>
                        <center>
                            <i className="fa-solid fa-phone fa-2x"></i>
                            <h3>Appeler</h3>
                        </center>
                    </div>
                </div>
                <div className="choice-item">
                    <div>
                        <center>
                            <i className="fa-brands fa-square-whatsapp fa-3x"></i>
                            <h3>WhatsApp</h3>
                        </center>
                    </div>
                </div>
            </div>

           <center>
                <button className="go">Allez-y</button>
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