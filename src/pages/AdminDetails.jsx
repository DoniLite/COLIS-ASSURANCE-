import { Outlet } from "react-router-dom";
import { DashBordNav, TableContainer } from "./TableauDeBord";


export function AdminDetails() {
    return(
        <TableContainer>
            <DashBordNav />
            <div className="table-content3">
                <div className="first-admin-details-comptes">
                    <h3>Profil du compte</h3>
                    <div className="flow-box-cont">
                        <div className="column">
                            <img src={user.userIcon} alt="" />
                            <h2>{user.firstname} {user.lastname}</h2>
                            <p>{user.location}</p>
                        </div>
                        <div className="column">
                            <h3>Adresse</h3>
                            <p><i className="fa-solid fa-envelope"></i> {user.email}</p>
                            <p><i className="fa-solid fa-phone"></i> {user.phoneNumber}</p>
                            <p><i className="fa-solid fa-address-card"></i> {user.passport} </p>
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
                                <h3 style={{ color: '#0263ce' }}>{}</h3>
                                <p>Sous-Comptes</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="second-admin-details-comptes">
                    <div className="second-admin-details-comptes-nav">
                        <ul>
                            <li><i className="fa-solid fa-user-tag"></i> Sous-comptes</li>
                            <li><i className="fa-solid fa-rotate fa-2x"></i> Historique</li>
                            <li><i className="fa-solid fa-rotate fa-2x"></i> Actions</li>
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