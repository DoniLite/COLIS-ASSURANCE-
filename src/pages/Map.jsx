import { NavLink } from "react-router-dom";
import user from "../assets/img/Ghost.jpeg"


export function Map() {
    return(
        <div className="map">
            <div style={{ padding: '1rem', position: 'fixed' }}>
                <NavLink style={{ color: '#ffffff' }} to={'/'}>
                    <i className="fa-solid fa-circle-left fa-2x"></i>
                </NavLink>
            </div>
            <canvas></canvas>
            <div className="map-side">
                <center>
                    <div className="small-trait"></div>
                </center>
                <div className="flex-div">
                    <img src={user} alt="" className="user-balance"/>
                    <div style={{display: 'flex'}}>
                        <div className="icon-map">
                            <i className="fa-brands fa-whatsapp fa-3x"></i>
                        </div>
                        <div className="icon-map">
                            <i className="fa-solid fa-phone fa-2x"></i>
                        </div>
                    </div>
                </div>

                <div style={{marginTop: '1rem'}} className="flex-div">
                    <small>Distance: 6 Km</small>
                    <small>Durée du trajet: 16 min</small>
                    <i style={{ color: '#049104'}} className="fa-solid fa-car fa-2x"></i>
                </div>

                <button>DEMARRER</button>
            </div>
        </div>
    )
}