import { NavLink, Outlet, useParams } from "react-router-dom";
import { Info } from "../components/Colis";




export function Statut() {
    
    return(
        <div style={{ backgroundColor: '#027bff' }}>
            <div style={{padding: '1rem' }}>
                <NavLink style={{ color: '#ffffff'}} to={'/'}>
                    <i className="fa-solid fa-circle-left fa-2x"></i>
                </NavLink>
            </div>
            <Outlet />
        </div>
    )
}

