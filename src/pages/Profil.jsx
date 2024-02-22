import { NavLink, Navigate, Outlet, redirect, useNavigate } from "react-router-dom";
import userImg from "../assets/img/Ghost.jpeg"
import { useState } from "react";
import { useData } from "../hooks/useData";
import { serverPath } from "../main";


export function Profil() {
    const {user, balance} = useData()
    console.log(balance)
    return(
        <>
            <div className="first-profil-div">
                <NavLink style={{ color: '#ffffff' }} to={'/'}>
                    <i className="fa-solid fa-circle-left fa-2x"></i>
                </NavLink>
                <h2>PROFIL</h2>
                <div></div>
            </div>

            <div className="profil-side">
                <img src={`${serverPath}assets/user/${user.userIcon}`} alt="" className="user-balance" />
                <div style={{marginLeft: '1rem'}}>
                    {user.firstname && (<p>{user.firstname} {user.lastname}</p>)}
                    <p style={{marginTop: '10px'}}>Balance :{balance}  </p>
                    <p>{user.registerDate}</p>
                </div>
            </div>

            <div className="flex-element">
                <NavLink to={'/profil/accountInfo'} end>INFORMATIONS</NavLink>
                <NavLink to={'/profil'} end>BALANCES</NavLink>
            </div>

            <div className="balance-cont">
                

                <div style={{width: '90%', margin: '0 auto'}}>
                    <Outlet />
                </div>

            </div>
        </>
    )
}


export function Balance() {
    const {user, balance} = useData()
    let [icrement, setIncrement] = useState(1)
    let value = 5000*icrement

    const navigate = useNavigate()

    /**
     * - CallBack de l'évènement submit du formulaire permettant de rediriger l'utilisateur vers la page de paiement
     * @param {SubmitEvent} e 
     */
    function submitForm(e) {
        e.preventDefault()
        navigate(`/paiement/${value}`)
    }

    return(
        <>
            <div className="pack">
                <div>
                    <p style={{ marginBottom: '0.5rem' }}>Balance actuelle</p>
                    <h2>{balance}</h2>
                </div>
            </div>
        
            <div style={{marginTop: '3rem'}} className="trait"></div>
            <h3>Modifier la balance</h3>
            <p>Veuillez saisir le montant (minimal 5000)</p>

            <form action="" onSubmit={submitForm}>
                <div className="paiement-method">
                    <div className="flex-icrement">
                        <div className="increment">
                            <div className="soustraire" onClick={() => setIncrement(icrement > 0 ? (icrement - 1) : icrement = 0)}>
                                <i className="fa-solid fa-window-minimize"></i>
                            </div>
                            <input style={{ border: 'none', background: 'transparent', width: '30px', }} type="text" value={icrement} name="price" id="price" onChange={(e) => setIncrement(e.target.value)} />
                            <div className="ajouter" onClick={() => setIncrement(icrement + 1)}>
                                <i className="fa-solid fa-plus"></i>
                            </div>
                        </div>

                        <h3 style={{ color: '#027bff', marginTop: '0.7rem' }}>{value} FCFA</h3>
                    </div>
                </div>

                <center>
                    <button>Paiement</button>
                </center>
            </form>
        </>
    )
}

export function InformationsAccount() {
    const {user} = useData()
    if (user.profilCompleted) {
        return (
            <>
                <div className="user-det">
                    <h4 style={{ marginBottom: '1rem' }}> <span style={{ color: '#027bff', position: 'relative', top: '0.5rem', right: '1rem' }}><i class="fa-solid fa-envelope fa-2x"></i></span>{user.email}</h4>
                    <h4 style={{ marginBottom: '1rem' }}> <span style={{ color: '#027bff', position: 'relative', top: '0.5rem', right: '1rem' }}><i className="fa-solid fa-user fa-2x"></i></span>{user.firstname} {user.lastname}</h4>
                    <h4 style={{ marginBottom: '1rem' }}> <span style={{ color: '#027bff', position: 'relative', top: '0.5rem', right: '1rem' }}><i className="fa-solid fa-phone fa-2x"></i></span>{user.phoneNumber}</h4>
                    <h4 style={{ marginBottom: '1rem' }}> <span style={{ color: '#027bff', position: 'relative', top: '0.5rem', right: '1rem' }}><i className="fa-solid fa-location-dot fa-2x"></i></span>{user.location}</h4>
                </div>
                
                <NavLink to={'/profil-updating/change'}>
                    <center style={{ marginTop: '1rem' }}>
                        <button>Modifier</button>
                    </center>
                </NavLink>
            </>
        )
    } else{
        return(
            <>
                <center>
                    <p>Veuillez compléter votre profil...</p>
                    <NavLink to={'/profil-updating/update'}>
                        <center style={{ marginTop: '1rem' }}>
                            <button>Compléter profil</button>
                        </center>
                    </NavLink>
                </center>
            </>
        )
    }
    
}


const obj = {
    element: () => {
        return (
            <div className="finger-div">
                <i className="fa-solid fa-fingerprint fa-2x"></i>
            </div>
        )
    }
}