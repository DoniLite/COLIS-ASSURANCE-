import { DashBordNav, TableContainer, TableHeader } from "./TableauDeBord";
import { useEffect, useState } from "react";
import { fetchJSON } from "../functions/API";
import { serverPath } from "../main";
import { NavLink } from 'react-router-dom'


export function AccountsManagement() {

    const [allUsers, setUser] = useState([])
    // const [canFetch, setFetch] = useState(true)
    

    useEffect(() => {
        fetchJSON(`${serverPath}allUserAdmin`).then(
            data => {
                setUser([
                    ...data.allUsers
                ])
                setFetch(false)
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }, [])

    console.log(allUsers)
    

    

    return(
        <TableContainer>
            <DashBordNav />
            <div className="table-content2">
                <TableHeader page={'COMPTES'} position={'fixed'} />
                <div className="admin-comptes-label">
                    <div className="first-admin-comptes-label-child">
                        <div>
                            <h1>Utilisateurs</h1>
                            <button>Ajouter</button>
                        </div>
                        <div>
                            <p>Voir de 1 à 9 comptes principaux</p>
                        </div>
                        <dir className="first-admin-comptes-child-searchbar">
                            <div className="search-bar">
                                <div className="icon-searh">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                                <input type="search" name="searchBar" id="searchBar" placeholder="Recherchez un compte" />
                            </div>
                        </dir>
                    </div>

                    <div className="second-admin-comptes-label-child">
                        {allUsers.map(user => <ComptesCard user={user}/>)}
                    </div>
                </div>
            </div>
        </TableContainer>
    )
}


function ComptesCard({user}) {
    return(
        <div className="card-admin-comptes-label">
            <div className="row">
                <div className="grid">
                    <img src={`${serverPath}assets/user/${user.userIcon}`} alt="" className="user-balance" />
                    <p><b>{user.firstname ?? 'Unknown'} {user.lastname??''}</b> <br />
                        <small>{user.location??'###'}</small>
                    </p>
                </div>

                <div className="grid-button">
                    <NavLink>
                        <button>Recharges</button>
                    </NavLink>
                    <NavLink to={`/colis-assurance/page/admin/accounts-details/${user._id}`}>
                        <button>Profil</button>
                    </NavLink>
                </div>
            </div>
            <div className="row">
                <small>Balance: {user.balance}</small> <small>Courses: {user.livraisons}</small> <small>Sous-comptes: {user.accounts}</small>
            </div>
        </div>
    )
}