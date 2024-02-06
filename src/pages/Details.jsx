import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Info } from "../components/Colis";
import { useData } from "../hooks/useData";
import { fetchJSON } from "../functions/API";
import { ToogleUpdate } from '../app/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { serverPath } from "../main";
import { useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import fs from 'node:fs'

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

export function Details() {

    const {user} = useData()
    const balance = user.balance[0].balance
    
    return(
        <div style={{ backgroundColor: '#027bff'}}>
            <div style={{ padding: '1rem' }}>
                <NavLink style={{ color: '#ffffff' }} to={'/'}>
                    <i className="fa-solid fa-circle-left fa-2x"></i>
                </NavLink>
            </div>
            <div className="balance">
                <div className="icon">
                    <div>
                        <i className="fa-brands fa-dropbox fa-2x"></i>
                        <h4>Colis</h4>
                    </div>
                </div>
                <div className="title">
                    <div>
                        <p>BALANCE</p>
                        <h3 style={{ color: balance < 50 ? 'red' :''}}>{balance} FCFA</h3>
                    </div>
                </div>
                <div className="last">
                    <div>
                        <p>#</p>
                    </div>
                </div>
            </div>

            <div className="container-details">
                <Outlet />
            </div>
        </div>
    )
}


export function AddedColis() {
    return(
        <>
            <div style={{ marginTop: '2rem' }} className="trait"></div>
            <h3>Profil expéditeur</h3>
            <Info det={infoExpéditeur} />
            <div className="flex">
                <div>
                    <div className="finger-div">
                        <i className="fa-solid fa-fingerprint fa-2x"></i>
                    </div>
                    <p>Empreinte Admin</p>
                </div>
                <div>
                    <i className="fa-solid fa-file-image fa-4x"></i>
                    <p style={{ marginTop: '1rem' }}>Image du colis</p>
                </div>
            </div>

            <div style={{ marginTop: '2rem' }} className="trait"></div>
            <h3>Profile recepteur</h3>
            <Info det={infoReceveur} />
            <div className="flex">
                <div>
                    <div style={{ color: '#d44115', border: 'solid 1px #d44115' }} className="finger-div">
                        <i className="fa-solid fa-fingerprint fa-2x"></i>
                    </div>
                    <p>Empreinte Admin</p>
                </div>
                <div>
                    <form action="" onSubmit={() => { }}>
                        <button type="submit">Enregistrer</button>
                    </form>
                    <p style={{ marginTop: '1rem' }}>Colis accepté</p>
                    <p>Statut: En cours</p>
                </div>
            </div>
        </>
    )
}

export function NewColis() {

    const notify = {
        success: () => toast.success('Colis ajouté avec succès'),
        failed: () => toast.error('Une erreur est survenue'),
        warning: () => toast.warning('Votre solde est insufisant')
    }
    const {user} = useData()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [canNavigate, setNavigate] = useState(false)
    const [inputColor, setColor] = useState(false)
    
    console.log(inputColor)
    function fileUpload(e) {
        e.preventDefault()
        document.querySelector('#colis-file').click()
    }

    /**
     * 
     * @param {SubmitEvent} e 
     */
    async function createColis(e) {
        e.preventDefault()
        if (user.balance[0].balance > 50) {
            const formData = new FormData(e.currentTarget)
            const price = formData.get('price')
            const senderName = formData.get('senderName')
            const receverName = formData.get('receverName')
            const senderNumber = formData.get('senderNumber')
            const receverNumber = formData.get('receverNumber')
            const description = formData.get('description')
            const lieu = formData.get('lieu')
            const file = formData.get('avatar')
            console.log(file)
            const refKey = user._id

            const fetchData = {
                price,
                senderName,
                receverName,
                senderNumber,
                receverNumber,
                description,
                lieu,
                refKey,
                avatar: file,
            }


            axios.post(`${serverPath}addColis`, {
                ...fetchData
            }, {

                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(
                ({ data }) => {
                    console.log(data)
                    dispatch(ToogleUpdate(true))
                    notify.success()
                    setNavigate(true)
                }
            ).catch(
                err => {
                    console.log(err)
                    notify.failed()
                }
            )
        } else {
            notify.warning()
            setColor(true)
            setTimeout(() => {
                setColor(false)
            }, 3000)
        }
        // fetch(`${serverPath}addColis`, {
        //     method: 'POST',
        //     body: JSON.stringify(fetchData),
        //     headers: {
        //         'Content-Type': 'multipart/form -data'
        //     }
        // }).then(
        //     data => {
        //         console.log(data)
        //         dispatch(ToogleUpdate(true))
        //         setNavigate(true)
        //     }
        // ).catch(
        //     err => {
        //         console.log(err)
        //     }
        // )
        
    }

    if (canNavigate) {
        navigate('/')
    }

    return(
        <div className="new-colis">
            <div className="flex">
                <div>
                    <h3>Ajouter une course</h3>
                    <p>Compte principal</p>
                </div>

                <div></div>
            </div>
            <div style={{ marginTop: '2rem' }} className="trait"></div>
            <h3>Profil expéditeur</h3>

            {user.balance[0].balance < 50 && <p style={{color: 'red'}}>Vous ne pouvez pas ajouter de colis pour l'instant</p>}

            <form action="" onSubmit={createColis} enctype="multipart/form-data">
                <center>
                    <div className="input">
                        <input type="text" name="senderName" id="senderName" placeholder="Nom" disabled/>
                        <div className="i">
                            <i className="fa-solid fa-user-tag"></i>
                        </div>
                    </div>
                </center>

                <center>
                    <div className="input">
                        <input type="tel" name="senderNumber" id="senderNumber" placeholder="Numéro de télephone" />
                        <div className="i">
                            <i className="fa-solid fa-phone"></i>
                        </div>
                    </div>
                </center>

                <center>
                    <div className="input">
                        <input type="text" name="price" id="price" placeholder="Valeur du colis" />
                        <div className="i">
                            <i className="fa-solid fa-money-bill-1"></i>
                        </div>
                    </div>
                </center>

                <center>
                    <div className="input">
                        <input type="text" name="description" id="description" placeholder="Description du colis" />
                        <div className="i">
                            <i className="fa-solid fa-font"></i>
                        </div>
                    </div>
                </center>

                <div className="flex">
                    <p style={{ marginTop: '2rem', color: inputColor, }} >Image du colis</p>
                    <div>
                        <label htmlFor="colis-file"  style={{cursor: 'pointer'}} onClick={fileUpload}>
                            <i className="fa-solid fa-cloud-arrow-up fa-2x" style={{ color: '#027bff'}} ></i>
                            {inputColor && (<div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'red', position: 'relative', top: '-17px',}}></div>)}
                        </label>
                        <input type="file" name="avatar" id="colis-file" style={{ display: 'none' }} onChange={() => setColor(true)} />
                    </div>
                </div>

                <div style={{ marginTop: '2rem' }} className="trait"></div>
                <h3>Profile recepteur</h3>

                <center>
                    <div className="input">
                        <input type="receverName" name="receverName" id="" placeholder="Nom" />
                        <div className="i">
                            <i className="fa-solid fa-user-tag"></i>
                        </div>
                    </div>
                </center>

                <center>
                    <div className="input">
                        <input type="tel" name="receverNumber" id="receverNumber" placeholder="Numéro de télephone" />
                        <div className="i">
                            <i className="fa-solid fa-phone"></i>
                        </div>
                    </div>
                </center>

                <center>
                    <div className="input">
                        <input type="text" name="lieu" id="lieu" placeholder="Lieu de livraison" />
                        <div className="i">
                            <i class="fa-solid fa-location-dot"></i>
                        </div>
                    </div>
                </center>

                <center>
                    <button type="submit">Enregistrer</button>
                </center>

            </form>
        </div>
    )
}