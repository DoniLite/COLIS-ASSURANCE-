import { NavLink } from "react-router-dom";
import { SousCompte } from "../components/Colis";
import { CreateUser } from "../components/Forms";
import { useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from "react";
import { fetchJSON } from "../functions/API";
import { serverPath } from "../main";
import { useData } from "../hooks/useData";
import { ToogleUpdate } from '../app/userSlice'

// /**
//  * 
//  * @param {Object[]} state - L'état du reducer.
//  * @param {{type: string, payload: Object[]}} action - L'objet de réduction permettant de recueillir l'action.
//  */
// function reducer(state, action) {

// }

export function SousComptePage() {

    const { user, updateData, type } = useData()
    /**
     * @type {{current: typeof user[]}}
     */
    const ref = useRef([])
    const [sousComptes, updateAccount] = useState([...ref.current])
    console.log(sousComptes)
    console.log(ref.current)
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
                ref.current = data.allUsers
                updateAccount(ref.current)
            }
        )
        dispatch(ToogleUpdate(false))
    }

    

    useEffect(() => {
        fetchJSON(`${serverPath}allusers?refKey=${user._id}`).then(
            data => {
                console.log(user)
                console.log(data)
                ref.current = data.allUsers
                updateAccount(ref.current)
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
                    <input type="search" name="searchBar" id="searchBar" onChange={(e) => {
                        const searchText = e.target.value.toLowerCase();
                        if (searchText.length < 1) {
                            // Si le champ de recherche est vide, réinitialise le tableau d'état
                            updateAccount(ref.current);
                        } else {
                            // Sinon, filtre les sous-comptes en fonction du texte de recherche
                            updateAccount(sousComptes.filter(account => {
                                const lowercaseFirstName = account.hasOwnProperty('firstname') ? account.firstname.toLowerCase() : '';
                                const lowercaseLastName = account.hasOwnProperty('lastname') ? account.lastname.toLowerCase() : '';
                                const lowercaseUsername = account.username.toLowerCase();
                                return lowercaseFirstName.includes(searchText) || lowercaseLastName.includes(searchText) || lowercaseUsername.includes(searchText);
                            }));
                        }
                    }} placeholder="Recherchez un sous compte" />
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
            <> <p>Aucun utilisateurs 🥱...</p> </>
        )
    } else {
        return(
            <div className="sous-compte-div">
                {users.map((user, index) => (<SousCompte user={user} key={index} />))}
                {/* <SousCompte />
                    <SousCompte />
                    <SousCompte />
                    <SousCompte />
                    <SousCompte /> */}
            </div>
        )
    }
}