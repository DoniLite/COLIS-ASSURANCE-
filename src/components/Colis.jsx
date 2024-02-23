import { NavLink, useParams } from "react-router-dom"
import user from "../assets/img/Ghost.jpeg"
import { useData } from "../hooks/useData"
import { useEffect, useState } from "react"
import { fetchJSON } from "../functions/API"
import { sliceColi } from "../functions/sliceColi"
import { serverPath } from "../main"
import { Modal, Button } from 'flowbite-react'
import { toast } from 'react-toastify';
import { ColiActionConfirmation, DropColiConfirmation } from "./Forms"
import moment from "moment"
moment.locale('fr', {
    months : ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
})


export function ColisContainer({ coliList }) {
    
    if (coliList === null) {
        return(
            <>
                <center>
                    <p>Il semble que vous ne disposez d'aucun coli pour l'instant...</p>
                </center>
            </>
        )
    } else {
        return (
            <>
                {coliList.map((coli, index) => <Coli key={index} data={coli} />)}
            </>
        )
    }
    
}

function Coli({data}) {

    const statut = data.state
    
    function dataColor(statut){
        let c = undefined
        if(statut=='en cours') {
            c = '#ffa602'
        } else if (statut=='annulé') {
            c = '#ff2802'
        } else if (statut=='livré') {
            c = '#049104'
        }
        return c 
    } 

    const color = dataColor(statut)
    console.log(color, statut)

    const iconStyle = {
        width: '5rem',
        height: '5rem',
        border: `solid 1px ${color}`,
        backgroundColor: '#ffffff',
        color: color,
        borderRadius: '50%',
    }

    const smallStyle = {
        color,
        fontSize: '10px',
    }

    return(
        <div className="coli-container">
            <div style={iconStyle} className="coli - icon">
                <div>
                    <i className="fa-solid fa-person-biking"></i>
                </div>
            </div>
            <div className="coli-description">
                <div style={{}}>
                    <h4 style={{ color: '#00147e', paddingBottom: '5px' }}>Colis-{sliceColi(data._id)}</h4>
                    <p style={{paddingBottom: '5px', fontSize: '13px'}}>Valeur {data.price} FCFA</p>
                    <small style={smallStyle}>Statut du colis: {data.state} </small>
                </div>
            </div>
            <div className="redirect">
                <div>
                    <NavLink style={{ color: '#ffffff'}} to={`/statut/${data._id}/${data.type}`}>
                        <i className="fa-solid fa-arrow-right"></i>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export function Info({det, children}) {
    return (
        <>
            <ul style={{marginLeft: '1rem'}}>
                {det.map((el, index) => <li key={index}> <span>{el.title}</span> : {el.info} </li>)}
                {children}
            </ul>
        </>
    )
}


const infoExpéditeur = [
    {
        title: 'Nom',
        info: 'TRAORE Gounghin',
    },
    {
        title: 'N°CNI',
        info: 'B12349000'
    },
    {
        title: 'Numéro',
        info: '+226 74678999'
    },
    {
        title: 'Valeur du colis',
        info: '18 000'
    },
    {
        title: 'Description',
        info: 'Colis de madame TRAORE Gounghin, envoyé par M. OUEDRAOGO de Karparla 18h30. Valeur du colis 18 000. Sac de tisane'
    }
]

const infoReceveur = [
    {
        title: 'Nom',
        info: 'OUEDRAOGO Josué',
    },
    {
        title: 'N°CNI',
        info: 'B12098900',
    },
    {
        title: 'Numéro',
        info: '+226 74678999'
    },
    {
        title: 'Valeur du colis',
        info: '18 000'
    },
    {
        title: 'Lieu de livraison',
        info: 'KARPARLA'
    }
]

export function ColiStatut() {
    const params = useParams()
    const [coliData, addColi] = useState({})
    const [canAlert, setAlert] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    const coli = coliData.coli
    const {id, type} = params   
    const {user} = useData()

    const notify = {
        success: (message) => toast.success(message),
        failed: (message) => toast.error(message),
        warning: (message) => toast.warning(message)
    }

    useEffect(() => {
        fetchJSON(`${serverPath}coliData?id=${id}&type=${type}`).then(
            data => {
                console.log(data)   
                addColi(data)
                
            }
        )
    }, [])


    function openBox(e) {
        const box = document.querySelector('.create-user-box')
        e.preventDefault()
        box.style.transform = 'translateX(0%)'
    }

    function openSecondBox() {
        const box = document.querySelector('.create-user-box2')
        box.style.transform = 'translateX(0%)'
    }

    async function dropColi(e) {
        e.preventDefault()
        const data = await fetchJSON(`${serverPath}dropColi?id=${id}&type=${type}`)
        if(data.statut===true) {
            notify.success('Votre opération a été effectuée ☺️')
            setTimeout(() => {
                notify.success('Poursuivons avec la vérification')
            })
            openSecondBox()
            setOpenModal(false)
        } else {
            notify.failed(`Échec de l'opération`)
        }
    }
    
    console.log(coliData)

    if(coli !== undefined) {
        return (
            <>
                <center>
                    <h3 style={{ color: '#ffffff', position: 'relative', bottom: '1rem' }}>Détails du colis {sliceColi(coli._id)}</h3>
                </center>
                <div className="statut-description">
                    <div className="label">
                        <h4>Description</h4>
                    </div>
                    <p>
                        {coli.description}
                    </p>
                </div>

                <div className="container-details">
                    <div style={{ marginTop: '3.5rem' }} className="trait"></div>
                    <h3>Profil expéditeur</h3>
                    <Info det={coli.inFoExpediteur}>
                        <li key={coli.price}> <span>Valeur</span> : {coli.price} FCFA</li>
                        <li key={coli.begining}><span>Créé le</span> : {moment(coli.begining).format('DD, MMMM YYYY H[H]:mm')}</li>
                    </Info>
                    <div className="flex">
                        <div></div>
                        <div>
                            <img src={`${serverPath}assets/user/${coli.coliIcon}`} alt="" style={{width: '100%', height: '100px', borderRadius: '10px'}} />
                            <p style={{ marginTop: '1rem' }}>Image du colis</p>
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem' }} className="trait"></div>
                    <h3>Profile recepteur</h3>
                    <Info det={coli.inFoRecepteur} >
                        <li key={coli.lieu}> <span>Lieu</span> : {coli.lieu} </li>
                    </Info>
                    <div className="flex">
                        <div>
                            {!coli.isValidate && (<button style={{ width: '100%', padding: '10px', background: 'red', marginTop: '1.5rem' }} onClick={() => setOpenModal(true)}>Annuler</button>)}
                        </div>
                        <div>
                            <p>Statut: {coli.state} </p>
                            {!coli.isValidate && (<button style={{width: '100%', padding: '10px'}} onClick={openBox}>Valider</button>)}
                        </div>
                    </div>
                </div>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <div className="modal">
                            <h3>Suppression de Coli</h3>
                            <p>Voulez-vous vraiment supprimer ce coli ? <br /> Si vous cliquez sur oui un code de confirmation sera envoyé au numéro de l'expéditeur</p>
                            <div className="flex">
                                <button variant="secondary" onClick={() => setOpenModal(false)}>
                                    Annuler
                                </button>
                                <button variant="primary" onClick={dropColi}>
                                    Oui
                                </button>
                            </div>
                    </div>
                </Modal>
               

                <ColiActionConfirmation coliId={id} />
                <DropColiConfirmation coliId={id} />
            </>
        )
    }
}

export function SousCompte({user}) {
    return(
        <div className="sous-compte-model">
            <div className="first-card">
                <center>
                    <img src={`${serverPath}assets/user/${user.userIcon}`} alt="" className="user-sous-compte" />
                </center>
                <div className="sous-compte-row">
                    <center>
                        <h3>{user.livraisons}</h3>
                        <p>Livraisons</p>
                    </center>
                </div>
            </div>
            <div className="second-card">
                <div className="sous-compte-column">
                    <h4>{user.firstname} {user.lastname}</h4>
                    <p>Sous-compte N°{sliceColi(user._id, -4)}</p>
                </div>

                <div className="sous-compte-column2">
                    <div></div>
                    <div>
                        <a href={`tel:+${user.phoneNumber}`}>
                            <i className="fa-solid fa-phone"></i>
                        </a>
                        <span style={{margin: '10px'}}></span>
                        <a href={`mailto:+${user.email}`}>
                            <i className="fa-solid fa-comment"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="redirect-user">
                <div>
                    <NavLink style={{ color: '#ffffff' }} to={`/details-souscomptes/${user._id}`}>
                        <i className="fa-solid fa-arrow-right"></i>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}


const fingerPrint = () => {
    return(
        <>
            <div className="finger-div">
                <i className="fa-solid fa-fingerprint fa-2x"></i>
            </div>
            <p>Empreinte Admin</p>


            <div style={{ color: '#d44115', border: 'solid 1px #d44115' }} className="finger-div">
                <i className="fa-solid fa-fingerprint fa-2x"></i>
            </div>
            <p>Empreinte Admin</p>
        </>
    )
}