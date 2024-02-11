import { NavLink, Outlet } from "react-router-dom";
import logo from '../assets/img/LOGO.png'
import user from "../assets/img/Ghost.jpeg"
import { sliceColi } from "../functions/sliceColi";



export function TableauDeBord() {
    return(
        <TableContainer>

            <DashBordNav />

            <div className="table-content">

                <TableHeader page={'TABLEAU DE BORD'} />                

                <div className="table-admin-stat">
                    <div className="table-admin-stat-item">
                        <div className="table-admin-stat-item-grid">
                            <div className="stat-colum">
                                <div style={{ backgroundColor: '#06650c' }} className="circle-stat"></div>
                            </div>
                            <div className="stat-colum">
                                <h3>Utilisateurs</h3>
                                <div className="flex">
                                    <h2 style={{color: 'black'}}>8F</h2>
                                    <i style={{ color: '#06d315' }} className="fa-solid fa-chevron-up"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="table-admin-stat-item">
                        <div style={{ borderLeft: 'solid 1px' }} className="table-admin-stat-item-grid">
                            <div className="stat-colum">
                                <div style={{ backgroundColor: '#0649d8' }} className="circle-stat"></div>
                            </div>
                            <div className="stat-colum">
                                <h3>Sous comptes</h3>
                                <div className="flex">
                                    <h2 style={{ color: 'black' }}>8F</h2>
                                    <i style={{ color: '#06d315' }} className="fa-solid fa-chevron-up"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="table-admin-stat-item">
                        <div style={{ borderLeft: 'solid 1px' }} className="table-admin-stat-item-grid">
                            <div className="stat-colum">
                                <div style={{ backgroundColor: '#a70113' }} className="circle-stat"></div>
                            </div>
                            <div className="stat-colum">
                                <h3>Courses</h3>
                                <div className="flex">
                                    <h2 style={{ color: 'black' }}>8F</h2>
                                    <i style={{ color: '#f24709' }} class="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="table-admin-stat-item">
                        <div style={{ borderLeft: 'solid 1px' }} className="table-admin-stat-item-grid">
                            <div className="stat-colum">
                                <div style={{ backgroundColor: '#a70113' }} className="circle-stat"></div>
                            </div>
                            <div className="stat-colum">
                                <h3>Balance</h3>
                                <div className="flex">
                                    <h2 style={{ color: 'black' }}>8F</h2>
                                    <i style={{ color: '#f24709' }} class="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="table-admin-side">
                    <div className="table-data">
                        <h3 style={{ marginBottom: '1rem', color: '#33379b' }}>Recharge récentes</h3>
                        <div className="table-data-head">
                            <h4 style={{ color: '#33379b' }}>ID</h4>
                            <h4>Nom</h4>
                            <h4>Montant</h4>
                            <h4>Mode</h4>
                            <h4>Agent de recharge</h4>
                            <h4>Statut</h4>
                            <h4>Action</h4>
                        </div>
                        <div className="table-data-content">
                            <h4>{user._id}</h4>
                            <h4>{user.client}</h4>
                            <h4>{user.amount}</h4>
                            <h4>{user.mode}</h4>
                            <h4>{user.agent}</h4>
                            <h4>{user.statut}</h4>
                            <NavLink>
                                <h4 style={{ cursor: 'pointer' }}><i className="fa-solid fa-circle-arrow-right fa-2x"></i></h4>
                            </NavLink>
                        </div>
                        <div className="table-data-content">
                            <h4>.</h4>
                            <h4>KABORE Jean</h4>
                            <h4>100 000 FCFA</h4>
                            <h4>Appel</h4>
                            <h4>Léandre TOULOUM</h4>
                            <h4>Validé</h4>
                            <NavLink>
                                <h4 style={{ cursor: 'pointer' }}><i className="fa-solid fa-circle-arrow-right fa-2x"></i></h4>
                            </NavLink>
                        </div>
                        <div className="table-data-content">
                            <h4>.</h4>
                            <h4>KABORE Jean</h4>
                            <h4>100 000 FCFA</h4>
                            <h4>Appel</h4>
                            <h4>Léandre TOULOUM</h4>
                            <h4>Validé</h4>
                            <NavLink>
                                <h4><i className="fa-solid fa-circle-arrow-right fa-2x"></i></h4>
                            </NavLink>
                        </div>
                        <div className="table-data-content">
                            <h4>.</h4>
                            <h4>KABORE Jean</h4>
                            <h4>100 000 FCFA</h4>
                            <h4>Appel</h4>
                            <h4>Léandre TOULOUM</h4>
                            <h4>Validé</h4>
                            <NavLink>
                                <h4><i className="fa-solid fa-circle-arrow-right fa-2x"></i></h4>
                            </NavLink>
                        </div>
                    </div>

                    <div className="recent-accounts">
                        <h3 style={{ color: '#33379b', marginBottom: '0.5rem' }}>Comptes des utlisateurs</h3>
                        <p>Récents</p>

                        <div className="recent-users-grid">
                            <div style={{ marginBottom: '0.5rem' }} className="recent-user-element">
                                <div>
                                    <center>
                                        <img src={user.userIcon} alt="" className="user-balance" />
                                    </center>
                                    <div style={{ marginTop: '0.5rem' }}>
                                        <center>
                                            <h4 style={{ color: '#33379b' }}>{user.firstname ?? sliceColi(user._id)} {user.lastname??'Undefined'}</h4>
                                            <small>{user.locaation??'###'}</small>
                                        </center>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginBottom: '0.5rem' }} className="recent-user-element">
                                <div>
                                    <center>
                                        <img src={user} alt="" className="user-balance" />
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
                                        <img src={user} alt="" className="user-balance" />
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
                                        <img src={user} alt="" className="user-balance" />
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
                                        <img src={user} alt="" className="user-balance" />
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
                                        <img src={user} alt="" className="user-balance" />
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
                                        <img src={user} alt="" className="user-balance" />
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
                                        <img src={user} alt="" className="user-balance" />
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
                </div>
            </div>
        </TableContainer>
    )
}


export function DashBordNav() {
    return(
        <div className="table-nav">
            <div className="table-nav-logo">
                <img src={logo} alt="" className="nibatic" />
                <p>HRM</p>
                <span>.</span>
            </div>

            <div className="admin-nav-row">
                <NavLink to={'/colis-assurance/page/admin/hrm'}>
                    <div className="admin-nav-element">
                        <div style={{ display: 'flex', marginLeft: '1.5rem' }}>
                            <i className="fa-solid fa-shapes fa-2x"></i>
                            <h3 style={{ marginLeft: '0.5rem', marginTop: '0.5rem' }}>Tableau de bord</h3>
                        </div>
                    </div>
                </NavLink>

                <NavLink to={'/colis-assurance/page/admin/accounts'}>
                    <div className="admin-nav-element">
                        <div style={{ display: 'flex', marginLeft: '1.5rem' }}>
                            <i className="fa-solid fa-list fa-2x"></i>
                            <h3 style={{ marginLeft: '0.5rem', marginTop: '0.5rem' }}>Comptes</h3>
                        </div>
                    </div>
                </NavLink>

                <NavLink to={'/colis-assurance/page/admin/accounts-details'}>
                    <div className="admin-nav-element">
                        <div style={{ display: 'flex', marginLeft: '1.5rem' }}>
                            <i className="fa-solid fa-gear fa-2x"></i>
                            <h3 style={{ marginLeft: '0.5rem', marginTop: '0.5rem' }}>Paramètre</h3>
                        </div>
                    </div>
                </NavLink>
            </div>

            <div className="table-btn-deconnexion">
                <i className="fa-solid fa-right-from-bracket fa-2x"></i>
                <h3>Déconnexion</h3>
            </div>
        </div>
    )
}


export function TableContainer({children}) {
    return(
        <div className="table-container">{children}</div>
    )
}

export function TableHeader({page, position}) {
    return(
        <div className="table-content-header" style={{position: {position}}}>
            <h2 style={{ color: '#33379b' }}>{page}</h2>
            <div className="user-admin">
                <div className="user-admin-info">
                    <h3>Martial BANI</h3>
                    <div style={{ display: 'flex', marginTop: '0.5rem', marginLeft: '2rem' }}>
                        <div style={{ backgroundColor: '#06d315', width: '0.5rem', height: '0.5rem', borderRadius: '50%', marginRight: '0.5rem' }} ></div><p>Admin</p>
                    </div>
                </div>
                <div className="user-admin-icon">
                    <i className="fa-solid fa-circle-user fa-3x"></i>
                </div>
            </div>
        </div>
    )
}