import colis from "../assets/img/COLIS.png"
import firstIcon from "../assets/img/icon1.png"
import secondIcon from "../assets/img/COLIS.png"
import thirdIcon from "../assets/img/icon1.png"
import { useNavigate } from "react-router-dom"
import { setUserType } from '../app/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useData } from "../hooks/useData"

export function Start() {

    const navigate = useNavigate()
    const type = useData()
    const dispatch = useDispatch()

    /**
     * 
     * @param {Event} e 
     */
    function InscriptionClickHandler(e) {
        e.preventDefault()
        navigate('/inscription') 
        dispatch(setUserType({type: 'first',}))
    }
    

    return(
        <>
            <div className="start-container-div">
                <center>
                    <img src={colis} alt="" className="start-logo" />
                </center>

                <center>
                    <img src={firstIcon} alt="" className="start-icon" />
                </center>

                <div style={{ padding: '1rem' }}>
                    <h2 style={{ color: 'black' }}>Gérez vos</h2>
                    <p style={{ fontWeight: 'bold' }}>Colis en toute sécurité.</p>
                </div>

                <div className="button-flex">
                    <button onClick={InscriptionClickHandler}>S'inscrire</button>
                    <button onClick={() => { navigate('/choose') }}>Commencer</button>
                </div>
            </div>
        </>
    )
}

function CarousselAnimé() {
    return(
        <div className="caroussel-container">
            <div className="second-caroussel-container">
                <div className="caroussel-item">
                    <center>
                        <img src={secondIcon} alt="" />
                        <p>Passez juste votre course à nos livreurs</p>
                    </center>
                </div>
                <div className="caroussel-item">
                    <center>
                        <img src={thirdIcon} alt="" />
                        <p>Faites vous livre instantanément</p>
                    </center>
                </div>
            </div>

            <div className="dot-container">
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </div>
    )
}

function Load() {
    return(
        <div className="load" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className="load-logo">
                <img src={colis} alt="" />
            </div>
        </div>
    )
}