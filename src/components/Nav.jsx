import { NavLink } from "react-router-dom";
import qrCode from '../assets/img/qr.png'
import { useData } from "../hooks/useData";
import { serverPath } from "../main";



function Nav() {
    const {user} = useData()
    return(
        <div className="responsive-nav">
            <NavLink to={'/paramètre'}>
                <i className="fa-solid fa-bars fa-2x"></i>
            </NavLink>
            <NavLink to={'/profil'}>
                <img src={`${serverPath}assets/user/${user.userIcon}`} alt="" className="user-icon"/>
            </NavLink>
        </div>
    )
}

export function FixedNavbar() {

    const { user, type, balance } = useData()
    console.log(user)
    const squareList = [
        {
            title: user.accounts,
            desc: 'Sous-comptes',
            color: '#23d3ef'
        },
        {
            title: user.livraisons == undefined? 0: user.livraisons,
            desc: 'Livraisons',
            color: '#09f109'
        },
        {
            title: 1,
            desc: 'Cartes',
            color: '#00147e'
        }
    ]

    const userSquare = {
        title: user.livraisons == undefined ? 0 : user.livraisons,
        desc: 'Livraisons',
        color: '#09f109'
    }

    return(
        <div className="fixed-nav">
            <Nav />
            <div className="deco-square"></div>
            <div className="section-div">
                <div>
                    <p>Bienvenue sur</p>
                    <h2 style={{color: '#ffffff', position: 'relative', bottom: '0.5rem' }}>Colis-assurance</h2>
                </div>
                <div>
                    <p>Balance</p>
                    <p>{balance}</p>
                </div>
                <div className="absolute-card">
                    <div>
                        <div>
                            <i className="fa-solid fa-earth-africa fa-2x"></i>
                        </div>
                        <img src={qrCode} alt="" className="qr" />
                        <p>Colis-assurance</p>
                    </div>
                </div>
            </div>
            <div className="scroll-container">
                {type === 'principal' && squareList.map((square, index) => (<Square key={index} obj={square} />)) }
                {type === 'secondaire' && <Square obj={userSquare} />}
            </div>
        </div>
    )
}

function Square({obj}) {
    return(
        <div className="square" style={{backgroundColor: obj.color}}>
            <div className="center-element">
                <div>
                    <center>
                        <h1>{obj.title}</h1>
                    </center>
                    <center>
                        <p>{obj.desc}</p>
                    </center>
                </div>
            </div>
        </div>
    )
}


export function BottomNav() {
    const {user} = useData()
    return(
        <div className="bottom-nav">
            <div>
                <NavLink to={`/story/${user._id}`} style={{ color: '#ffffff'}}>
                    <i className="fa-solid fa-rotate fa-2x"></i>
                </NavLink>
            </div>
            <div>
                <NavLink to={'/'} className="prin">
                    <div>
                        <i className="fa-brands fa-windows fa-2x"></i>
                    </div>
                </NavLink>
            </div>
            <div>
                <NavLink to={'/addColis'} style={{ color: '#ffffff' }}>
                    <i className="fa-solid fa-motorcycle fa-2x"></i>
                </NavLink>
            </div>
        </div>
    )
}