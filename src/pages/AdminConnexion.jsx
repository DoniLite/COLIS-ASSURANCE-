import { json, NavLink, useNavigate } from "react-router-dom";
import colis from "../assets/img/COLIS.png"
import {putAdminConnected} from '../app/AdminSlice'
import { useState } from "react";
import { fetchJSON } from "../functions/API";
import { serverPath } from "../main";
import { notify } from "../hooks/useNofication";
import { useDispatch } from "react-redux";
import { putList } from "../app/coliSlice";
import { useData } from "../hooks/useData";


export function AdminConnexion() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {adminAccess} = useData()
    /**
     * 
     * @param {Event} e 
     */
    const handleConnectAdmin = (e) => {
        e.preventDefault()
        const el = e.currentTarget
        const formData = new FormData(el)
        const login = formData.get('login')
        const password = formData.get('password')
        const fetchData = {
            login,
            password
        }
        
        fetchJSON(`${serverPath}api/admin`, {
            json: fetchData
        }).then(
            data => {
                console.log(data)
                if (data.statut===true) {
                    notify.success('Bienvenu à vous cher administrateur')
                    dispatch(putAdminConnected())
                    dispatch(putList(data.users))
                    // navigate('/colis-assurance/page/admin/hrm')
                    console.log(adminAccess)
                    return
                }
                notify.warning('connexion invalide! ressayez')
            }
        ).catch(
            err => {
                console.log(err)
                notify.failed('Quelque chose ne s\'est pas bien passé')
            }
        )
    }

    return(
        <div className="admin-start-cont">
            <div className="admin-connexion">
                <div className="center-connexion-div">
                    <center style={{marginBottom: '3rem'}}>
                        <h2>Connexion</h2>
                        <p>A votre espace</p>
                    </center>

                    <form action="" onSubmit={handleConnectAdmin}>
                        <label htmlFor="email">Nom d'utilisateur</label>
                        <center>
                            <div className="input">
                                <input type="text" name="login" id="login" />
                                <div className="i">
                                    <i className="fa-solid fa-user-tag"></i>
                                </div>
                            </div>
                        </center>

                        <label htmlFor="passWord">Mot de passe</label>
                        <center>
                            <div className="input">
                                <input type="password" name="password" id="password" />
                                <div className="i">
                                    <i className="fa-solid fa-key"></i>
                                </div>
                            </div>
                        </center>

                        <center>
                            <button type="submit">CONNEXION</button>
                        </center>
                    </form>
                </div>
            </div>

            <div className="admin-icon-container">
                <center>
                    <div className="load-logo">
                        <img src={colis} alt="" />
                    </div>
                    <div style={{display: 'flex', marginTop: '1rem'}}>
                        <h2>COLIS ASSURANCE</h2>
                        <div style={{ width: '1rem', height: '1rem', borderRadius: '50%', background: '#f04608'}}></div>
                    </div>
                </center>
            </div>
        </div>
    )
}