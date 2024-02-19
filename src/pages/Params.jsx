import { NavLink, useNavigate } from "react-router-dom"
import user from "../assets/img/Ghost.jpeg"
import { useData } from "../hooks/useData"
import { serverPath } from "../main"
import { disconnected } from "../app/userSlice"
import {useDispatch} from 'react-redux'
import { useState } from "react"


export function Params() {
    const {user, type} = useData()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [canNavigate, setNavigate] = useState(false)
    function disconnectUser(e) {
        e.preventDefault()
        dispatch(disconnected())
        setNavigate(true)
    }

    if(canNavigate) {
        navigate(`/connexion/${type}`)
    }
    console.log(user)
    return(
        <>
            <div className="first-param-cont">
                <div></div>
                <NavLink style={{ color: '#ffffff' }} to={'/'}>
                    <i className="fa-solid fa-circle-right fa-2x"></i>
                </NavLink>
                
            </div>

            <center style={{margin: '2rem 0'}}>
                <img src={`${serverPath}assets/user/${user.userIcon}`} alt="" className="user-balance" /> <br />
                {user.firstname  && (<p>{user.firstname} {user.lastname}</p>)}
                <div className="trait" style={{ backgroundColor: '#027bff'}}></div>
            </center>

            <p className="intitulé">Support</p>
            <div className="det-params">
                <NavLink to={''}>
                    <div className="params-item">
                        <i className="fa-solid fa-phone"></i>
                        <p>Appelez le service client</p>
                    </div>
                </NavLink>
                <NavLink to={'https://wa.me/22655270506'}>
                    <div className="params-item">
                        <i className="fa-solid fa-comment"></i>
                        <p>Écrire au service client</p>
                    </div>
                </NavLink>
            </div>

            <p className="intitulé">Profil d'utilisateur</p>
            <div className="det-params">
                {user.isChecked === false && (
                    <NavLink to={`/phoneVerification/${user._id}`}>
                        <div className="params-item">
                            <i className="fa-solid fa-phone"></i>
                            <p>vérifier votre numéro de téléphone</p>
                        </div>
                    </NavLink>
                )}
                {user.profilCompleted !== true && (
                    <NavLink to={'/profil-updating/update'}>
                        <div className="params-item">
                            <i className="fa-solid fa-user-tie"></i>
                            <p>Completer votre profil</p>
                        </div>
                    </NavLink>
                )}
                {type === 'principal' && (
                    <NavLink to={'/compte-entreprise'}>
                        <div className="params-item">
                            <i className="fa-solid fa-landmark"></i>
                            <p>Compte entreprise</p>
                        </div>
                    </NavLink>
                )}
                {user.profilCompleted === true && (
                    <NavLink to={'/profil-updating/change'}>
                        <div className="params-item">
                            <i className="fa-solid fa-user-tie"></i>
                            <p>Modifier le profil</p>
                        </div>
                    </NavLink>
                )}
            </div>

            <p className="intitulé">Termes et condtions</p>
            <div className="det-params">
                <NavLink>
                    <div className="params-item">
                        <i className="fa-solid fa-shield-halved"></i>
                        <p>Termes d'utilisation</p>
                    </div>
                </NavLink>
                <NavLink>
                    <div className="params-item">
                        <i className="fa-solid fa-lock"></i>
                        <p>Confidentialité de l'application</p>
                    </div>
                </NavLink>
                <NavLink onClick={disconnectUser}>
                    <div className="params-item" style={{color: 'red'}}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <p>Déconnexion</p>
                    </div>
                </NavLink>
            </div>
        </>
    )
}

