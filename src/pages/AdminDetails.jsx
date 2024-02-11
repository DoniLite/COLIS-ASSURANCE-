import { Outlet, NavLink } from "react-router-dom";
import { DashBordNav, TableContainer, TableHeader } from "./TableauDeBord";
import userPNG from "../assets/img/Ghost.jpeg"
import { ColisContainer } from "../components/Colis";


export function AdminDetails() {

    const user = {
        _id: '65c0d424522ad8102f0e41f5',
        username: 'brigitte',
        password: '$2b$10$2q46cjDZVlG6Xv1k4dOR1.16ikYJmaba87Z2sM8lBa5I8Yf.ZCjsW',
        balance: [{ balance: 0, _id: '65c0d424522ad8102f0e41f4' }],
        email: 'brigitte@mail.com',
        location: 'Hawai',
        userIcon: 'user.svg',
        accounts: 0,
        livraisons: 0,
        profilCompleted: false,
        isChecked: false,
        registerDate: '2024-02-05T12:27:16.848Z',
        __v: 0,
        phoneNumber: '+22607224034',
        firstname: 'Doni',
        lastname: 'Ghost',
    }


    return(
        <TableContainer>
            <DashBordNav />
            <div className="table-content3">
                <TableHeader page={'DÉTAILS DU COMPTE'} position={'fixed'} />
                <div className="first-admin-details-comptes">
                    <h4 style={{padding: '10px'}}>Utilisateur &gt; <span style={{ color: '#027bff'}}>Profil du compte</span></h4>
                    <div className="flow-box-cont">
                        <div className="column">
                            <img src={userPNG} alt="" />
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '1rem'}}>
                                <div>
                                    <h2 style={{ color: 'blue' }}>{user.firstname} {user.lastname}</h2>
                                    <p>{user.registerDate}</p>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <h3 style={{marginTop: '1rem'}}>Adresse</h3>
                            <p><i className="fa-solid fa-envelope"></i> {user.email}</p>
                            <p><i className="fa-solid fa-phone"></i> {user.phoneNumber}</p>
                            <p><i className="fa-solid fa-location-dot"></i> {user.location} </p>
                        </div>
                        <div className="column">
                            <div className="">
                                <h3 style={{ color: '#0263ce'}}>{user.balance[0].balance}</h3>
                                <p>Balance</p>
                            </div>
                            <div className="">
                                <h3 style={{ color: '#0263ce' }}>{user.livraisons}</h3>
                                <p>Courses</p>
                            </div>
                            <div className="">
                                <h3 style={{ color: '#0263ce' }}>{user.accounts}</h3>
                                <p>Sous-Comptes</p>
                            </div>
                            <div className="">
                                <h3 style={{ color: '#0263ce' }}>{user.accounts}</h3>
                                <p>Gains</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="second-admin-details-comptes">
                    <div className="second-admin-details-comptes-nav">
                        <ul>
                            <NavLink>
                                <li><i className="fa-solid fa-user-tag"></i> Sous-comptes</li>
                            </NavLink>
                            <NavLink>
                                <li><i className="fa-solid fa-rotate"></i> Historique</li>
                            </NavLink>
                            <NavLink>
                                <li><i className="fa-solid fa-rotate"></i> Actions</li>
                            </NavLink>
                        </ul>
                        <div className="render-box-model">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </TableContainer>
    )
}


export function AdminSousComptes() {

    const user = {
        _id: '65c0d424522ad8102f0e41f5',
        username: 'brigitte',
        password: '$2b$10$2q46cjDZVlG6Xv1k4dOR1.16ikYJmaba87Z2sM8lBa5I8Yf.ZCjsW',
        balance: [{ balance: 0, _id: '65c0d424522ad8102f0e41f4' }],
        email: 'brigitte@mail.com',
        location: 'Hawai',
        userIcon: 'user.svg',
        accounts: 0,
        livraisons: 0,
        profilCompleted: false,
        isChecked: false,
        registerDate: '2024-02-05T12:27:16.848Z',
        __v: 0,
        phoneNumber: '+22607224034',
        firstname: 'Doni',
        lastname: 'Ghost',
    }

    return(
        <div className="table-admin-side">
            <div className="recent-accounts">
                <div className="flex">
                    <h3 style={{ color: '#33379b', marginBottom: '0.5rem' }}>Liste des sous-comptes</h3>
                    <div style={{width: '50%', height: '2rem'}}>
                        <div className="search-bar">
                            <div className="icon-searh">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <input type="search" name="searchBar" id="searchBar" placeholder="Recherchez un compte" />
                        </div>
                    </div>
                </div>

                <div className="recent-users-grid2">
                    <div style={{ marginBottom: '0.5rem' }} className="recent-user-element">
                        <div>
                            <center>
                                <img src={userPNG} alt="" className="user-balance" />
                            </center>
                            <div style={{ marginTop: '0.5rem' }}>
                                <center>
                                    <h4 style={{ color: '#33379b' }}>{user.firstname ?? sliceColi(user._id)} {user.lastname ?? 'Undefined'}</h4>
                                    <small>{user.locaation ?? '###'}</small>
                                </center>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '0.5rem' }} className="recent-user-element">
                        <div>
                            <center>
                                <img src={userPNG} alt="" className="user-balance" />
                            </center>
                            <div style={{ marginTop: '0.5rem' }}>
                                <center>
                                    <h4 style={{ color: '#33379b' }}>Martial BANI</h4>
                                    <small>Ouagadougou</small>
                                </center>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '0.5rem' }} className="recent-user-element">
                        <div>
                            <center>
                                <img src={userPNG} alt="" className="user-balance" />
                            </center>
                            <div style={{ marginTop: '0.5rem' }}>
                                <center>
                                    <h4 style={{ color: '#33379b' }}>Martial BANI</h4>
                                    <small>Ouagadougou</small>
                                </center>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '0.5rem' }} className="recent-user-element">
                        <div>
                            <center>
                                <img src={userPNG} alt="" className="user-balance" />
                            </center>
                            <div style={{ marginTop: '0.5rem' }}>
                                <center>
                                    <h4 style={{ color: '#33379b' }}>Martial BANI</h4>
                                    <small>Ouagadougou</small>
                                </center>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '0.5rem' }} className="recent-user-element">
                        <div>
                            <center>
                                <img src={userPNG} alt="" className="user-balance" />
                            </center>
                            <div style={{ marginTop: '0.5rem' }}>
                                <center>
                                    <h4 style={{ color: '#33379b' }}>Martial BANI</h4>
                                    <small>Ouagadougou</small>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sous-comptes-details-side">
                <h3 style={{ color: '#33379b', marginBottom: '0.5rem' }}>Détails du sous-compte</h3>

                <div className="second-admin-details-comptes-nav">
                    <ul>
                        <NavLink>
                            <li>Profil</li>
                        </NavLink>
                        <NavLink>
                            <li>Historique</li>
                        </NavLink>
                    </ul>
                    <div className="render-box-model">
                        <Outlet />
                        <div className="flex">
                            <button style={{width: '40%', padding: '10px', background: 'green'}}>Modifier</button>
                            <button style={{ width: '40%', padding: '10px', background: 'red' }}>Supprimer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export function FlowBox() {

    const user = {
        _id: '65c0d424522ad8102f0e41f5',
        username: 'brigitte',
        password: '$2b$10$2q46cjDZVlG6Xv1k4dOR1.16ikYJmaba87Z2sM8lBa5I8Yf.ZCjsW',
        balance: [{ balance: 0, _id: '65c0d424522ad8102f0e41f4' }],
        email: 'brigitte@mail.com',
        location: 'Hawai',
        userIcon: 'user.svg',
        accounts: 0,
        livraisons: 0,
        profilCompleted: false,
        isChecked: false,
        registerDate: '2024-02-05T12:27:16.848Z',
        __v: 0,
        phoneNumber: '+22607224034',
        firstname: 'Doni',
        lastname: 'Ghost',
    }

    return (
        <div className="flow-box-cont2">
            <div className="column">
                <img style={{width: '3rem', height: '3rem', borderRadius: '50%', marginTop: '10px'}} src={userPNG} alt="" />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10px', }}>
                    <div>
                        <h4 style={{ color: 'blue' }}>{user.firstname} {user.lastname}</h4>
                        <p>{user.registerDate}</p>
                    </div>
                </div>
            </div>
            <div className="column">
                <p><i className="fa-solid fa-envelope"></i> {user.email}</p>
                <p><i className="fa-solid fa-phone"></i> {user.phoneNumber}</p>
                <p><i className="fa-solid fa-location-dot"></i> {user.location} </p>
            </div>
            <div className="column">
                <div className="">
                    <h3 style={{ color: '#0263ce' }}>{user.livraisons}</h3>
                    <p>Courses</p>
                </div>
            </div>
        </div>
    )
}

export function AdminComptesStory() {
    return(
        <>
            <ColisContainer coliList={''}/>
        </>
    )
}