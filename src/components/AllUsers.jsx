import { useEffect, useState } from "react"
import { fetchJSON } from "../functions/API"
import { serverPath } from "../main"
import { NavLink } from "react-router-dom"


const AllUsers = () => {
    const [allUsers, setUser] = useState([])
    // const [canFetch, setFetch] = useState(true)


    useEffect(() => {
        fetchJSON(`${serverPath}allUserAdmin`).then(
            data => {
                setUser([
                    ...data.allUsers
                ])
                // setFetch(false)
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }, [])

    console.log(allUsers)
    return (
        <div className="second-admin-comptes-label-child">
            {allUsers.map(user => <ComptesCard user={user} />)}
        </div>
    )
}

function ComptesCard({ user }) {
    return (
        <div className="card-admin-comptes-label">
            <div className="row">
                <div className="grid">
                    <img src={`${serverPath}assets/user/${user.userIcon}`} alt="" className="user-balance" />
                    <p><b>{user.firstname ?? 'Unknown'} {user.lastname ?? ''}</b> <br />
                        <small>{user.location ?? '###'}</small>
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

export default AllUsers