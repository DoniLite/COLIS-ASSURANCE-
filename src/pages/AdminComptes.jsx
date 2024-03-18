import { DashBordNav, TableContainer, TableHeader } from "./TableauDeBord";
import { Suspense, useEffect, useState, lazy } from "react";
import { fetchJSON } from "../functions/API";
import { Loader, serverPath } from "../main";
import { NavLink } from 'react-router-dom'
import { CreateForm, createUserCustomHandler } from "../components/CreateForm";


export function AccountsManagement() {

   
    

    /**
     * 
     * @param {MouseEvent} e 
     */
    function showForm(e) {
        e.preventDefault()
        const box = document.querySelector('.create-user-box')
        box.style.transform = 'translateX(0%)'
    }
    

    return(
        <TableContainer>
            <DashBordNav />
            <div className="table-content2">
                <TableHeader page={'COMPTES'} position={'fixed'} />
                <div className="admin-comptes-label">
                    <div className="first-admin-comptes-label-child">
                        <div>
                            <h1>Utilisateurs</h1>
                            <button style={{cursor: 'pointer',}} onClick={showForm}>Ajouter</button>
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

                    <Suspense fallback={<Loader />}>
                        <Users />
                    </Suspense>
                    <CreateUserBox />
                </div>
            </div>
        </TableContainer>
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