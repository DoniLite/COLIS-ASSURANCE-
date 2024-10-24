import { defer, NavLink, useNavigate, useParams, } from "react-router-dom";
import logo from '../assets/img/COLIS.png'
import { sliceColi } from "../functions/sliceColi";
import { serverPath } from "../main";
import { useEffect, useRef, useState } from "react";
import { fetchJSON } from "../functions/API";
import { notify } from "../hooks/useNofication";
import { useData } from "../hooks/useData";
import { AdminConnexion } from "./AdminConnexion";
import { useDispatch } from "react-redux";
import { putList } from "../app/coliSlice";
import { disconnectAdmin } from "../app/AdminSlice";



export function TableauDeBord() {

    const [allUsers, setUser] = useState([])
    const [allSousComptes, setSousCompte] = useState([])
    const [recharges, setRecharges] = useState([])
    const [adminBalance, setAdminBalance]  = useState()
    const [courses, setCourses] = useState()
    const {adminAccess} = useData()
    const navigate = useNavigate()

    useEffect(() => {
        fetchJSON(`${serverPath}allUserAdmin`).then(
            data => {
                setUser([
                    ...data.allUsers
                ])
                setSousCompte([
                    ...data.allSousComptes
                ])
                setAdminBalance(data.adminBalance)
                setCourses(data.courses)
            }
        ).catch(
            err => notify.failed('une erreur s\'est produite')
        )

        fetchJSON(`${serverPath}recharges`).then(
            data => {
                setRecharges([
                    ...data.recharges
                ])
            }
        ).catch(
            err => notify.failed('une erreur s\'est produite')
        )
    }, [])

   return (
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
                                        <h2 style={{ color: 'black' }}>{allUsers.length}</h2>
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
                                        <h2 style={{ color: 'black' }}>{allSousComptes.length}</h2>
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
                                        <h2 style={{ color: 'black' }}>{courses}</h2>
                                        <i style={{ color: '#f24709' }} className="fa-solid fa-chevron-down"></i>
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
                                        <h2 style={{ color: 'black' }}>{adminBalance}</h2>
                                        <i style={{ color: '#f24709' }} className="fa-solid fa-chevron-down"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="table-admin-side">
                        <div className="table-data">
                            <h3 style={{ marginBottom: '1rem', color: '#33379b' }}>Recharges récentes</h3>
                            <div className="table-data-head">
                                <h4 style={{ color: '#33379b' }}>ID</h4>
                                <h4>Nom</h4>
                                <h4>Montant</h4>
                                <h4>Mode</h4>
                                <h4>Agent</h4>
                                <h4>Statut</h4>
                                <h4>Action</h4>
                            </div>
                            {recharges.slice(0, 10).map(recharge => <TableDataContent user={recharge} key={recharge._id} />)}
                        </div>

                        <div className="recent-accounts">
                            <h3 style={{ color: '#33379b', marginBottom: '0.5rem' }}>Comptes des utlisateurs</h3>
                            <p>Récents</p>

                            <div className="recent-users-grid">
                                {allUsers.slice(0, 10).map(user => <RecentUserElement user={user} key={user._id} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </TableContainer>
        )

}


export function DashBordNav() {

    const dispatch = useDispatch()

    const disconnect = (e) => {
        e.preventDefault()
        dispatch(disconnectAdmin())
    }

    return(
        <div className="table-nav">
            <div className="table-nav-logo">
                <img src={logo} alt="" className="nibatic" />
                <p>HRM</p>
                <span>.</span>
            </div>

            <div className="admin-nav-row">
                <NavLink to={'/colis-assurance/page/admin/hrm'} >
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

                <NavLink to={`/colis-assurance/page/admin/allRecharges/${undefined}`}>
                    <div className="admin-nav-element">
                        <div style={{ display: 'flex', marginLeft: '1.5rem' }}>
                            <i className="fa-regular fa-credit-card fa-2x"></i>
                            <h3 style={{ marginLeft: '0.5rem', marginTop: '0.5rem' }}>Recharges</h3>
                        </div>
                    </div>
                </NavLink>
            </div>

            <div className="table-btn-deconnexion" onClick={disconnect}>
                <i className="fa-solid fa-right-from-bracket fa-2x"></i>
                <h3>Déconnexion</h3>
            </div>
        </div>
    )
}


export function TableContainer({children}) {
    const dispatch = useDispatch()
    const {allUsers, adminAccess} = useData()
    useEffect(()=>{
        fetchJSON(`${serverPath}api/allUsers`).then(
            data => {
                console.log(data)
                dispatch(putList(data.users))
            }
        )
    },[])
    console.log(allUsers, adminAccess)
    return(
        <div className="table-container">{children}</div>
    )
    // if(adminAccess) {
        
    // }
    // return navigate('log/admin/colis-assurance/')
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
 

function TableDataContent({user}) {
    return(
        <div className="table-data-content">
            <h4>{sliceColi(user._id)}</h4>
            <h4>{user.client}</h4>
            <h4>{user.amount}</h4>
            <h4>{user.mode}</h4>
            <h4>{user.agent}</h4>
            <h4>{user.statut}</h4>
            <NavLink to={`/colis-assurance/page/admin/accounts-details/${user.clientID}/actions/${user.amount}/not-blocked`} end>
                <h4 style={{ cursor: 'pointer' }}><i className="fa-solid fa-circle-arrow-right fa-2x"></i></h4>
            </NavLink>
        </div>
    )
}


/**
 * 
 * @param {{user: {user?: string, firstname?: string, blocked?: boolean, lastname?: string, username: string, password?: string, balance?: number, email?: string, phoneNumber?: string, location?: string, userIcon?: string, accounts?: number, livraisons: number, isChecked?: boolean, profilCompleted: boolean, registerDate: typeof Date | string, _id: string}}} param0 
 * @returns 
 */
function RecentUserElement({user}) {
    return(
        <NavLink to={`/colis-assurance/page/admin/accounts-details/${user._id}`}>
            <div style={{ marginBottom: '0.5rem'}} className="recent-user-element">
                <div>
                    <center>
                        <img src={`${serverPath}assets/user/${user.userIcon}`} alt="" className="user-balance" />
                    </center>
                    <div style={{ marginTop: '0.5rem' }}>
                        <center>
                            <h4 style={{ color: '#33379b' }}>{user.firstname ?? user.email.slice(0, 10)+'...'} {user.lastname ?? ''}</h4>
                            <small>{user.location ?? '###'}</small>
                        </center>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}


export function AllRecharges() {
    const [recharges, setRecharges] = useState([])
    const params = useParams()
    const {id} = params
    const {adminAccess} = useData()
    const navigate = useNavigate()

    useEffect(() => {
        fetchJSON(`${serverPath}recharges?id=${id}`).then(
            data => {
                console.log(data)
                setRecharges([
                    ...data.recharges
                ])
            }
        )
    }, [])

    return(
        <TableContainer>
            <DashBordNav />
            <div className="table-content3">
                <TableHeader page={'RECHARGES'} position={'fixed'} />
                <div className="table-data">
                    <div className="table-data-head">
                        <h4 style={{ color: '#33379b' }}>ID</h4>
                        <h4>Nom</h4>
                        <h4>Montant</h4>
                        <h4>Mode</h4>
                        <h4>Agent de recharge</h4>
                        <h4>Statut</h4>
                        <h4>Action</h4>
                    </div>
                    {recharges.map(recharge => <TableDataContent user={recharge} key={recharge._id} />)}
                </div>
            </div>
        </TableContainer>
    )
}