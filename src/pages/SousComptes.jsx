import { NavLink } from "react-router-dom";
import { SousCompte } from "../components/Colis";
import { CreateUser } from "../components/Forms";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import { fetchJSON } from "../functions/API";
import { serverPath } from "../main";
import { useData } from "../hooks/useData";
import { addDataToState, putConnected, setUserType, ToogleUpdate } from '../app/userSlice'

export function SousComptePage() {

    const {user, updateData, type} = useData()
    const [sousComptes, updateAccount] = useState(null)
    const dispatch = useDispatch()

    function openBox(e) {
        const box = document.querySelector('.create-user-box')
        e.preventDefault()
        box.style.transform = 'translateX(0%)'
    }

    if (updateData) {
        fetchJSON(`${serverPath}allusers?refKey=${user._id}`).then(
            data => {
                console.log(data)
                updateAccount(data)
            }
        )
        dispatch(ToogleUpdate(false))
    }

    

    useEffect(() => {
        fetchJSON(`${serverPath}allusers?refKey=${user._id}`).then(
            data => {
                console.log(data)
                updateAccount(data)
            }
        )
    }, [])

    return(
        <>
            <div className="page-header">
                <div style={{padding: '1rem'}} className="flex">
                    <NavLink style={{ color: '#ffffff' }} to={'/paramètre'}>
                        <i className="fa-solid fa-circle-left fa-2x"></i>
                    </NavLink>
                    <h3 style={{color: '#ffffff', marginRight: '2rem',}}>Compte Entreprise</h3>
                </div>

                <div className="search-bar">
                    <div className="icon-searh">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <input type="search" name="searchBar" id="searchBar" placeholder="Recherchez un sous compte" />
                </div>
            </div>
            <div className="page-content-side">
                <div style={{ padding: '1rem', marginTop: '1rem' }} className="flex">
                    <h3>Sous comptes</h3>
                    <div className="add-account-btn" onClick={openBox}>
                        <i className="fa-solid fa-square-plus"></i>
                        <span></span> Créer
                    </div>
                </div>

                <AllUsers users={sousComptes} />
                {/* <div className="sous-compte-div">
                    <SousCompte />
                    <SousCompte />
                    <SousCompte />
                    <SousCompte />
                    <SousCompte />
                </div> */}
            </div>


            <CreateUser />
            
        </>
    )
}


function AllUsers({users}) {
    if(users === null) {
        return (
            <> <p>Aucun utilisateurs pour l'instant...</p> </>
        )
    } else {
        const sousComptes = users.allUsers
        return(
            <div className="sous-compte-div">
                {sousComptes.map((user, index) => (<SousCompte user={user} />))}
                {/* <SousCompte />
                    <SousCompte />
                    <SousCompte />
                    <SousCompte />
                    <SousCompte /> */}
            </div>
        )
    }
}