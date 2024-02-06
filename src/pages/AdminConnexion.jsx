import { NavLink } from "react-router-dom";
import colis from "../assets/img/COLIS.png"


export function AdminConnexion() {

    return(
        <div className="admin-start-cont">
            <div className="admin-connexion">
                <div className="center-connexion-div">
                    <center style={{marginBottom: '3rem'}}>
                        <h2>Connexion</h2>
                        <p>A votre espace</p>
                    </center>

                    <form action="">
                        <label htmlFor="email">Nom d'utilisateur</label>
                        <center>
                            <div className="input">
                                <input type="text" name="email" id="" />
                                <div className="i">
                                    <i className="fa-solid fa-user-tag"></i>
                                </div>
                            </div>
                        </center>

                        <label htmlFor="passWord">Mot de passe</label>
                        <center>
                            <div className="input">
                                <input type="password" name="passWord" id="" />
                                <div className="i">
                                    <i className="fa-solid fa-key"></i>
                                </div>
                            </div>
                        </center>

                        <div className="flex">
                            <div></div>
                            <div style={{display: 'flex', width: '20%'}}>
                                <input type="checkbox" name="" id="" />
                                <small>Se souvenir de moi</small>
                            </div>
                        </div>

                        <center>
                            <button>CONNEXION</button>
                        </center>

                        <div style={{ margin: '2rem' }}>
                            <a href="#">Mot de passe oublié?</a>
                        </div>
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