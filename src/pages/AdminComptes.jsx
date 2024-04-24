import { DashBordNav, TableContainer, TableHeader } from "./TableauDeBord";
import { Suspense, useEffect, useState, lazy } from "react";
import { fetchJSON } from "../functions/API";
import { Loader, serverPath } from "../main";
import { NavLink } from 'react-router-dom'
import { CreateForm, createUserCustomHandler } from "../components/CreateForm";
import { useData } from "../hooks/useData";
import { AdminConnexion } from "./AdminConnexion";


export function AccountsManagement() {

   const {adminAccess} = useData()
    

    /**
     * 
     * @param {MouseEvent} e 
     */
    function showForm(e) {
        e.preventDefault()
        const box = document.querySelector('.create-user-box')
        box.style.transform = 'translateX(0%)'
    }

    if (adminAccess) {
        return (
            <TableContainer>
                <DashBordNav />
                <div className="table-content2">
                    <TableHeader page={'COMPTES'} position={'fixed'} />
                    <div className="admin-comptes-label">
                        <div className="first-admin-comptes-label-child">
                            <div>
                                <h1>Utilisateurs</h1>
                                <button style={{ cursor: 'pointer', }} onClick={showForm}>Ajouter</button>
                            </div>
                            <div>
                                <p>Voir de 1 à 9 comptes principaux</p>
                            </div>
                            <dir className="first-admin-comptes-child-searchbar">
                                <div className="search-bar">
                                    <div className="icon-searh">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                    <input type="search" name="searchBar" id="searchBar" placeholder="Recherchez un compte" onChange={(e) => {
                                        const searchText = e.target.value.toLowerCase();
                                        if (searchText.length < 1) {
                                            // Si le champ de recherche est vide, réinitialise le tableau d'état
                                            setAccounts(accountsRef.current);
                                        } else {
                                            // Sinon, filtre les sous-comptes en fonction du texte de recherche
                                            setAccounts(accounts.filter(account => {
                                                const lowercaseFirstName = account.hasOwnProperty('firstname') ? account.firstname.toLowerCase() : '';
                                                const lowercaseLastName = account.hasOwnProperty('lastname') ? account.lastname.toLowerCase() : '';
                                                const lowercaseUsername = account.username.toLowerCase();
                                                return lowercaseFirstName.includes(searchText) || lowercaseLastName.includes(searchText) || lowercaseUsername.includes(searchText);
                                            }));
                                        }
                                    }} />
                                </div>
                            </dir>
                        </div>

                        <Suspense fallback={<Loader />}>
                            <Users />
                        </Suspense>
                        <CreateUserBox />
                    </div>
                </div>
            </TableContainer>
        )
    }
    
    return (
        <AdminConnexion />
    )
    
}


const Users = lazy(()=> import('../components/AllUsers'))

const CreateUserBox = ()=> {
    return(
        <div style={{width: '70%', margin: '0 auto'}}>
            <CreateForm
                customObject={[
                    {
                        type: 'text',
                        inputName: 'username',
                        placeholder: 'Nom d\'utilisateur',
                        iconClass: 'fa-solid fa-user-tag'
                    },
                    {
                        type: 'email',
                        inputName: 'email',
                        placeholder: 'Adresse mail',
                        iconClass: 'fa-solid fa-envelope'
                    },
                    {
                        type: 'password',
                        inputName: 'password',
                        placeholder: 'Mot de passe',
                        iconClass: 'fa-solid fa-key'
                    }
                ]}
                inputDescription="Ajouter un utilisateur"
                btn="Enregisrer"
                eventHandler={createUserCustomHandler}
            />
        </div>
    )
}