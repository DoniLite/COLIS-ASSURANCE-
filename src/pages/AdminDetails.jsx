import { Outlet, NavLink, useParams } from "react-router-dom";
import { DashBordNav, TableContainer, TableHeader } from "./TableauDeBord";
import userPNG from "../assets/img/Ghost.jpeg"
import { ColisContainer } from "../components/Colis";
import { useEffect, useState } from "react";
import { fetchJSON } from "../functions/API";
import { serverPath } from "../main";
import { notify } from "../hooks/useNofication";
import { inputStyle } from "../components/Forms";
import { useCustomNavigation } from "../hooks/useCustomNavigation";
import { sliceColi } from "../functions/sliceColi";
import { Modal } from 'flowbite-react'


export function AdminDetails() {

    const params = useParams()
    const [user, setuser] = useState({})

    useEffect(() => {
        fetchJSON(`${serverPath}userDetailsAdmin?id=${params.id}`).then(
            data => {
                setuser({
                    ...data.user
                })
            }
        ).catch(
            err => {
                notify.failed('Oups... Une erreur est survenue')
            }
        )
    }, [])

    // const user = {
    //     _id: '65c0d424522ad8102f0e41f5',
    //     username: 'brigitte',
    //     password: '$2b$10$2q46cjDZVlG6Xv1k4dOR1.16ikYJmaba87Z2sM8lBa5I8Yf.ZCjsW',
    //     balance: [{ balance: 0, _id: '65c0d424522ad8102f0e41f4' }],
    //     email: 'brigitte@mail.com',
    //     location: 'Hawai',
    //     userIcon: 'user.svg',
    //     accounts: 0,
    //     livraisons: 0,
    //     profilCompleted: false,
    //     isChecked: false,
    //     registerDate: '2024-02-05T12:27:16.848Z',
    //     __v: 0,
    //     phoneNumber: '+22607224034',
    //     firstname: 'Doni',
    //     lastname: 'Ghost',
    // }
 

    return(
        <TableContainer>
            <DashBordNav />
            <div className="table-content3">
                <TableHeader page={'DÉTAILS DU COMPTE'} position={'fixed'} />
                <div className="first-admin-details-comptes">
                    <h4 style={{padding: '10px'}}>Utilisateur &gt; <span style={{ color: '#027bff'}}>Profil du compte</span></h4>
                    <div className="flow-box-cont">
                        <div className="column">
                            <img src={`${serverPath}assets/user/${user.userIcon}`} alt="" />
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '1rem'}}>
                                <div>
                                    <h2 style={{ color: 'blue' }}>{user.firstname} {user.lastname}</h2>
                                    <p>{user.registerDate}</p>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <h3 style={{marginTop: '1rem'}}>Adresse</h3>
                            <p><i className="fa-solid fa-envelope"></i> {user.email}</p>
                            <p><i className="fa-solid fa-phone"></i> {user.phoneNumber}</p>
                            <p><i className="fa-solid fa-location-dot"></i> {user.location} </p>
                        </div>
                        <div className="column">
                            <div className="">
                                <h3 style={{ color: '#0263ce'}}>{user.balance}</h3>
                                <p>Balance</p>
                            </div>
                            <div className="">
                                <h3 style={{ color: '#0263ce' }}>{user.livraisons}</h3>
                                <p>Courses</p>
                            </div>
                            <div className="">
                                <h3 style={{ color: '#0263ce' }}>{user.accounts}</h3>
                                <p>Sous-Comptes</p>
                            </div>
                            <div className="">
                                <h3 style={{ color: '#0263ce' }}>{user.accounts}</h3>
                                <p>Gains</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="second-admin-details-comptes">
                    <div className="second-admin-details-comptes-nav">
                        <ul>
                            <NavLink to={`/colis-assurance/page/admin/accounts-details/${user._id}`} end>
                                <li><i className="fa-solid fa-user-tag"></i> Sous-comptes</li>
                            </NavLink>
                            <NavLink to={`/colis-assurance/page/admin/accounts-details/${user._id}/userStory`} end>
                                <li><i className="fa-solid fa-clipboard"></i> Historique</li>
                            </NavLink>
                            <NavLink to={`/colis-assurance/page/admin/accounts-details/${user._id}/actions`} end>
                                <li><i className="fa-solid fa-gear"></i> Actions</li>
                            </NavLink>
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


export function AdminSousComptes() {

    const params = useParams()
    const {id} = params
    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        fetchJSON(`${serverPath}userDetailsAdmin?id=${id}`).then(
            data => {
                console.log(data)
                setAccounts([
                    ...data.sousCompte
                ])
                console.log(accounts)
            }
        ).catch(
            err => {
                notify.failed('Oups... Une erreur est survenue')
            }
        )
    }, [])
    console.log(id)
    

    return(
        <div className="table-admin-side">
            <div className="recent-accounts">
                <div className="flex">
                    <h3 style={{ color: '#33379b', marginBottom: '0.5rem' }}>Liste des sous-comptes</h3>
                    <div style={{width: '50%', height: '2rem'}}>
                        <div className="search-bar">
                            <div className="icon-searh">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <input type="search" name="searchBar" id="searchBar" placeholder="Recherchez un compte" />
                        </div>
                    </div>
                </div>

                <div className="recent-users-grid2">
                    {accounts.map(user => (
                        <div style={{ marginBottom: '0.5rem' }} className="recent-user-element">
                            <div>
                                <center>
                                    <img src={`${serverPath}assets/user/${user.userIcon}`} alt="" className="user-balance" />
                                </center>
                                <div style={{ marginTop: '0.5rem' }}>
                                    <center>
                                        <h4 style={{ color: '#33379b' }}>{user.firstname ?? sliceColi(user._id)} {user.lastname ?? 'Undefined'}</h4>
                                        <small>{user.location ?? '###'}</small>
                                    </center>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="sous-comptes-details-side">
                <h3 style={{ color: '#33379b', marginBottom: '0.5rem' }}>Détails du sous-compte</h3>

                <div className="second-admin-details-comptes-nav">
                    <ul>
                        <NavLink to={`/colis-assurance/page/admin/accounts-details/${id}`}>
                            <li>Profil</li>
                        </NavLink>
                        <NavLink to={`/colis-assurance/page/admin/accounts-details/${id}/story`}>
                            <li>Historique</li>
                        </NavLink>
                    </ul>
                    <div className="render-box-model">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}


export function FlowBox() {

    const user = {
        _id: '65c0d424522ad8102f0e41f5',
        username: 'brigitte',
        password: '$2b$10$2q46cjDZVlG6Xv1k4dOR1.16ikYJmaba87Z2sM8lBa5I8Yf.ZCjsW',
        balance: [{ balance: 0, _id: '65c0d424522ad8102f0e41f4' }],
        email: 'brigitte@mail.com',
        location: 'Hawai',
        userIcon: 'user.svg',
        accounts: 0,
        livraisons: 0,
        profilCompleted: false,
        isChecked: false,
        registerDate: '2024-02-05T12:27:16.848Z',
        __v: 0,
        phoneNumber: '+22607224034',
        firstname: 'Doni',
        lastname: 'Ghost',
    }

    return (
        <>
            <div className="flow-box-cont2">
                <div className="column">
                    <img style={{ width: '3rem', height: '3rem', borderRadius: '50%', marginTop: '10px' }} src={userPNG} alt="" />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10px', }}>
                        <div>
                            <h4 style={{ color: 'blue' }}>{user.firstname} {user.lastname}</h4>
                            <p>{user.registerDate}</p>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <p><i className="fa-solid fa-envelope"></i> {user.email}</p>
                    <p><i className="fa-solid fa-phone"></i> {user.phoneNumber}</p>
                    <p><i className="fa-solid fa-location-dot"></i> {user.location} </p>
                </div>
                <div className="column">
                    <div className="">
                        <h3 style={{ color: '#0263ce' }}>{user.livraisons}</h3>
                        <p>Courses</p>
                    </div>
                </div>
            </div>
            <div className="flex">
                <button style={{ width: '40%', padding: '10px', background: 'orange' }}>Bloquer</button>
                <button style={{ width: '40%', padding: '10px', background: 'red' }}>Supprimer</button>
            </div>
        </>
    )
}

export function AdminComptesStory() {
    const [colis, setColis] = useState([])
    const params = useParams()
    const type = 'principal'
    console.log(params.id)

    useEffect(() => {
        fetchJSON(`${serverPath}allColis?refKey=${params.id}&type=${type}`).then(
            data => {
                setColis([
                    ...data.allColis
                ])
                console.log(colis)
            }
        ).catch(
            err => notify.failed('une erreur s\'est produite')
        )
    }, [])

    return(
        <>
            <div style={{width: '70%', margin: '0 auto'}}>
                <ColisContainer coliList={colis} />
            </div>
            
        </>
    )
}


export function AdminActions() {
    const params = useParams()
    const [isValid, setValid] = useState(true)
    const {state, navigateTo} = useCustomNavigation()
    const [action, setAction] = useState('')
    const [openModal, setOpenModal] = useState(false);

    const color = isValid ? '#027bff' : 'red'

    const thisInputStyle = {
        ...inputStyle,
        border: inputStyle.border + color
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    function actionControler(e) {
        e.preventDefault()
        let text = e.currentTarget.innerText
        switch (text) {
            case 'Bloquer':
                setAction('bloquer')
                setOpenModal(true)
                break
            case 'Supprimer':
                setAction('supprimer')
                setOpenModal(true)
                break
        }
    }

    function actionsHandler() {
        switch (action) {
            case 'bloquer':
                fetchJSON(`${serverPath}sousComptes?action=bloquer&id=${user._id}`).then(
                    data => {
                        console.log(data)
                        if (data.statut && data.statut === true) {
                            notify.success('Le compte a été bloqué')
                            setOpenModal(false)
                            setNavigate(true)
                        } else {
                            notify.failed('Une erreur est survenue')
                            setOpenModal(false)
                        }
                    }
                ).catch(
                    err => {
                        notify.failed('Une erreur est survenue')
                    }
                )
                break
            case 'supprimer':
                fetchJSON(`${serverPath}accountsActions?action=supprimer&id=${user._id}&admin=${admin._id}`).then(
                    data => {
                        console.log(data)
                        if (data.statut && data.statut === true) {
                            notify.success('Le compte a été supprimé')
                            setOpenModal(false)
                            setNavigate(true)
                        } else {
                            notify.failed('Une erreur est survenue')
                            setOpenModal(false)
                        }
                    }
                ).catch(
                    err => {
                        notify.failed('Une erreur est survenue')
                    }
                )
                break
        }
    }   

    /**
     * 
     * @param {SubmitEvent} e 
     */
    function rechargement(e) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const value = formData.get('value')

        const fetchForm = {
            value,
            id: params.id
        }

        fetchJSON(`${serverPath}rechargement`, {
            json: fetchForm
        }).then(
            data => {
                if(data.statut === true) {
                    notify.success('Action effectuée avec succès')
                    window.location.reload()
                } else {
                    notify.failed("une erreur s'est produite veuillez réssayer")
                }
            }
        )
    }

    return(
        <>
            <div className="flex">
                <div>
                    <h3 style={{ color: 'blue' }}>Recharger le compte</h3>
                    <p>###</p>
                </div>
                <div className="close-box"></div>
            </div>

            <form action="" style={{ width: '50%', margin: '0 auto' }} onSubmit={rechargement}>
                <center>
                    <div className="input">
                        <input type="text" name="value" id="value" style={thisInputStyle}  placeholder="Montant de la recharge"  />
                        <div className="i">
                            <i className="fa-regular fa-credit-card"></i>
                        </div>
                    </div>
                </center>

                <center>
                    <button type="submit" style={{border: 'none', width: '80%', padding: '10px', color: 'white', backgroundColor: 'blue', marginTop: '1rem', fontWeight: 'bold', borderRadius: '5px'}}>Confirmer</button>
                </center>
            </form>


            <h3 style={{ color: 'blue', marginTop: '2rem' }}>Supprimer ou bloquer le compte</h3>
            <div style={{ marginTop: '2rem', width: '50%', margin: '0 auto' }}>
                <div className="flex">
                    <button style={{ width: '40%', padding: '10px', background: 'orange' }} onClick={actionControler}>Bloquer</button>
                    <button style={{ width: '40%', padding: '10px', background: 'red' }} onClick={actionControler}>Supprimer</button>
                </div>
            </div>

            <Modal show={openModal} onClose={() => setOpenModal(false)} style={{ zIndex: '9999' }}>
                <div className="modal">
                    <h3>{action} le Compte?</h3>
                    <p>Voulez-vous vraiment {action} ce compte ? <br /> Si vous cliquez sur oui cette action ne pourra plus être irréversible</p>
                    <div className="flex">
                        <button variant="secondary" onClick={() => setOpenModal(false)}>
                            Annuler
                        </button>
                        <button variant="primary" onClick={actionsHandler}>
                            Oui
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}