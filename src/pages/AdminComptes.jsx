import { DashBordNav, TableContainer, TableHeader } from "./TableauDeBord";
import user from "../assets/img/Ghost.jpeg"
import { useEffect, useMemo, useState } from "react";
import { fetchJSON } from "../functions/API";
import { serverPath } from "../main";


export function AccountsManagement() {

    const [allUsers, setUser] = useState(null)
    const [canFetch, setFetch] = useState(true)
    

    useEffect(() => {
        if(canFetch) {
            fetchJSON(`${serverPath}allUserAdmin`).then(
                data => {
                    setUser(data)
                    setFetch(false)
                }
            ).catch(
                err => {
                    console.log(err)
                }
            )
        }
    }, [canFetch])

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
                                    <i className="fa-solid fa-magnifying-glass fa-2x"></i>
                                </div>
                                <input type="search" name="searchBar" id="searchBar" placeholder="Recherchez un compte" />
                            </div>
                        </dir>
                    </div>

                    <div className="second-admin-comptes-label-child">
                        <div className="card-admin-comptes-label">
                            <div className="row">
                                <div className="grid">
                                    <img src={user} alt="" className="user-balance" />
                                    <p><b>Léandre Dabiré</b> <br />
                                        <small>Ouagadougou </small>
                                    </p>
                                </div>

                                <div className="grid-button">
                                    <button>Recharges</button>
                                    <button>Profil</button>
                                </div>
                            </div>
                            <div className="row">
                                <small>Balance: 50 000 FCFA</small> <small>Courses: 52</small> <small>Sous-comptes: 3</small>
                            </div>
                        </div>

                        <div className="card-admin-comptes-label">
                            <div className="row">
                                <div className="grid">
                                    <img src="" alt="" />
                                    <p><b>Léandre Dabiré</b> <br />
                                        <small>Ouagadougou </small>
                                    </p>
                                </div>

                                <div className="grid">
                                    <button>Recharges</button>
                                    <button>Profil</button>
                                </div>
                            </div>
                            <div className="row">
                                <small>Balance: 50 000 FCFA</small> <small>Courses: 52</small> <small>Sous-comptes: 3</small>
                            </div>
                        </div>

                        <div className="card-admin-comptes-label">
                            <div className="row">
                                <div className="grid">
                                    <img src="" alt="" />
                                    <p><b>Léandre Dabiré</b> <br />
                                        <small>Ouagadougou </small>
                                    </p>
                                </div>

                                <div className="grid">
                                    <button>Recharges</button>
                                    <button>Profil</button>
                                </div>
                            </div>
                            <div className="row">
                                <small>Balance: 50 000 FCFA</small> <small>Courses: 52</small> <small>Sous-comptes: 3</small>
                            </div>
                        </div>

                        <div className="card-admin-comptes-label">
                            <div className="row">
                                <div className="grid">
                                    <img src="" alt="" />
                                    <p><b>Léandre Dabiré</b> <br />
                                        <small>Ouagadougou </small>
                                    </p>
                                </div>

                                <div className="grid">
                                    <button>Recharges</button>
                                    <button>Profil</button>
                                </div>
                            </div>
                            <div className="row">
                                <small>Balance: 50 000 FCFA</small> <small>Courses: 52</small> <small>Sous-comptes: 3</small>
                            </div>
                        </div>

                        <div className="card-admin-comptes-label">
                            <div className="row">
                                <div className="grid">
                                    <img src="" alt="" />
                                    <p><b>Léandre Dabiré</b> <br />
                                        <small>Ouagadougou </small>
                                    </p>
                                </div>

                                <div className="grid">
                                    <button>Recharges</button>
                                    <button>Profil</button>
                                </div>
                            </div>
                            <div className="row">
                                <small>Balance: 50 000 FCFA</small> <small>Courses: 52</small> <small>Sous-comptes: 3</small>
                            </div>
                        </div>

                        <div className="card-admin-comptes-label">
                            <div className="row">
                                <div className="grid">
                                    <img src="" alt="" />
                                    <p><b>Léandre Dabiré</b> <br />
                                        <small>Ouagadougou </small>
                                    </p>
                                </div>

                                <div className="grid">
                                    <button>Recharges</button>
                                    <button>Profil</button>
                                </div>
                            </div>
                            <div className="row">
                                <small>Balance: 50 000 FCFA</small> <small>Courses: 52</small> <small>Sous-comptes: 3</small>
                            </div>
                        </div>

                        <div className="card-admin-comptes-label">
                            <div className="row">
                                <div className="grid">
                                    <img src="" alt="" />
                                    <p><b>Léandre Dabiré</b> <br />
                                        <small>Ouagadougou </small>
                                    </p>
                                </div>

                                <div className="grid">
                                    <button>Recharges</button>
                                    <button>Profil</button>
                                </div>
                            </div>
                            <div className="row">
                                <small>Balance: 50 000 FCFA</small> <small>Courses: 52</small> <small>Sous-comptes: 3</small>
                            </div>
                        </div>

                        <div className="card-admin-comptes-label">
                            <div className="row">
                                <div className="grid">
                                    <img src="" alt="" />
                                    <p><b>Léandre Dabiré</b> <br />
                                        <small>Ouagadougou </small>
                                    </p>
                                </div>

                                <div className="grid">
                                    <button>Recharges</button>
                                    <button>Profil</button>
                                </div>
                            </div>
                            <div className="row">
                                <small>Balance: 50 000 FCFA</small> <small>Courses: 52</small> <small>Sous-comptes: 3</small>
                            </div>
                        </div>

                        <div className="card-admin-comptes-label">
                            <div className="row">
                                <div className="grid">
                                    <img src="" alt="" />
                                    <p><b>Léandre Dabiré</b> <br />
                                        <small>Ouagadougou </small>
                                    </p>
                                </div>

                                <div className="grid">
                                    <button>Recharges</button>
                                    <button>Profil</button>
                                </div>
                            </div>
                            <div className="row">
                                <small>Balance: 50 000 FCFA</small> <small>Courses: 52</small> <small>Sous-comptes: 3</small>
                            </div>
                        </div>

                        <div className="card-admin-comptes-label">
                            <div className="row">
                                <div className="grid">
                                    <img src="" alt="" />
                                    <p><b>Léandre Dabiré</b> <br />
                                        <small>Ouagadougou </small>
                                    </p>
                                </div>

                                <div className="grid">
                                    <button>Recharges</button>
                                    <button>Profil</button>
                                </div>
                            </div>
                            <div className="row">
                                <small>Balance: 50 000 FCFA</small> <small>Courses: 52</small> <small>Sous-comptes: 3</small>
                            </div>
                        </div>

                        <div className="card-admin-comptes-label">
                            <div className="row">
                                <div className="grid">
                                    <img src="" alt="" />
                                    <p><b>Léandre Dabiré</b> <br />
                                        <small>Ouagadougou </small>
                                    </p>
                                </div>

                                <div className="grid">
                                    <button>Recharges</button>
                                    <button>Profil</button>
                                </div>
                            </div>
                            <div className="row">
                                <small>Balance: 50 000 FCFA</small> <small>Courses: 52</small> <small>Sous-comptes: 3</small>
                            </div>
                        </div>

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
                    <img src={user} alt="" className="user-balance" />
                    <p><b>{user.firstname ?? 'Unknown'} {user.lastname??''}</b> <br />
                        <small>{user.location??'###'}</small>
                    </p>
                </div>

                <div className="grid-button">
                    <button>Recharges</button>
                    <button>Profil</button>
                </div>
            </div>
            <div className="row">
                <small>Balance: {user.balance[0].balance}</small> <small>Courses: {user.livraisons}</small> <small>Sous-comptes: {user.accounts}</small>
            </div>
        </div>
    )
}


// function compteLabel ({user}) {
//     return(
//         <div className="card-admin-comptes-label">
//             <div className="row">
//                 <div className="grid">
//                     <img src={user.userIcon} alt="" />
//                     <p><b>{user.firstname} {user.lastname}</b> <br />
//                         <small>{user.location} </small>
//                     </p>
//                 </div>

//                 <div className="grid">
//                     <button>Recharges</button>
//                     <button>Profil</button>
//                 </div>
//             </div>
//             <div className="row">
//                 <small>Balance: {user.balance[0].balance}</small> <small>Courses: 52</small> <small>Sous-comptes: 3</small>
//             </div>
//         </div>
//     )
// }