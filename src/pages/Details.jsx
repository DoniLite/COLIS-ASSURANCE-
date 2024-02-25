import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Info } from "../components/Colis";
import { useData } from "../hooks/useData";
import { ToogleUpdate, addDataToState, updateBalance } from '../app/userSlice'
import { useDispatch } from 'react-redux'
import { Loader, serverPath } from "../main";
import { useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import { useCustomNavigation } from "../hooks/useCustomNavigation";
import { inputStyle } from "../components/Forms";


export function Details() {

    const {user, balance} = useData()
    
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

    const {user, type, trueBalance} = useData()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [canNavigate, setNavigate] = useState(false)
    const [inputColor, setColor] = useState(false)
    const {state, navigateTo} = useCustomNavigation()
    const [isValid, setValid] = useState(true)
    const color = isValid ? '#027bff' : 'red'

    const thisInputStyle = {
        ...inputStyle,
        border: inputStyle.border + color
    }
    
    function fileUpload(e) {
        e.preventDefault()
        document.querySelector('#colis-file').click()
    }

    const [imageURL, setImageURL] = useState('');
    const [inputChanged, setInputChanged] = useState(false)

    /**
     * @param {InputEvent} event
     */
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Utilise FileReader pour lire le contenu du fichier
            const reader = new FileReader();

            reader.onloadend = () => {
                // Met à jour l'état avec l'URL de l'image
                setImageURL(reader.result);
                setInputChanged(true)
            };

            reader.readAsDataURL(file);
        }
    };

    /**
     * 
     * @param {SubmitEvent} e 
     */
    async function createColis(e) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const price = parseInt(formData.get('price'))
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
            type,
        }
        navigateTo('submitting')
        if (trueBalance > 50 + price) {
            axios.post(`${serverPath}addColis`, {
                ...fetchData
            }, {

                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(
                ({ data }) => {
                    navigateTo("idle")
                    console.log(data)
                    if(data.statut === false) {
                        notify.failed()
                        return
                    }
                    dispatch(ToogleUpdate(true))
                    dispatch(addDataToState(data))
                    dispatch(updateBalance(data.user.balance))
                    notify.success()
                    setNavigate(true)
                }
            ).catch(
                err => {
                    navigateTo('idle')
                    console.log(err)
                    notify.failed()
                    navigateTo('idle')
                    setValid(false)
                }
            )
        } else {
            navigateTo('idle')
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
            {state === 'submitting' && <Loader />}
            <div className="flex">
                <div>
                    <h3>Ajouter une course</h3>
                    <p>Compte principal</p>
                </div>

                <div></div>
            </div>
            <div style={{ marginTop: '2rem' }} className="trait"></div>
            <h3>Profil expéditeur</h3>

            {trueBalance < 50 && <p style={{color: 'red'}}>Vous ne pouvez pas ajouter de colis pour l'instant</p>}

            <form action="" onSubmit={createColis} encType="multipart/form-data">
                <center>
                    <div className="input">
                        <input type="text" name="senderName" id="senderName" placeholder="Nom" style={thisInputStyle} onChange={() => setValid(true)} />
                        <div className="i">
                            <i className="fa-solid fa-user-tag"></i>
                        </div>
                    </div>
                </center>

                <center>
                    <div className="input">
                        <input type="tel" name="senderNumber" id="senderNumber" placeholder="Numéro de télephone" style={thisInputStyle} />
                        <div className="i">
                            <i className="fa-solid fa-phone"></i>
                        </div>
                    </div>
                </center>

                <center>
                    <div className="input">
                        <input type="text" name="price" id="price" placeholder="Valeur du colis" style={thisInputStyle} />
                        <div className="i">
                            <i className="fa-solid fa-money-bill-1"></i>
                        </div>
                    </div>
                </center>

                <center>
                    <div className="input">
                        <input type="text" name="description" id="description" placeholder="Description du colis" style={thisInputStyle} />
                        <div className="i">
                            <i className="fa-solid fa-font"></i>
                        </div>
                    </div>
                </center>

                <div className="flex">
                    <p style={{ marginTop: '2rem', color: inputColor, }} >Image du colis</p>
                    <div>
                        <label htmlFor="colis-file" style={{ cursor: 'pointer' }} onClick={fileUpload} >
                            <i className="fa-solid fa-cloud-arrow-up fa-2x" style={{ color: '#027bff' }} ></i>
                            {inputColor && (<div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'red', position: 'relative', top: '-17px',}}></div>)}
                        </label>
                        <input type="file" name="avatar" id="colis-file" style={{ display: 'none' }} onChange={(e) => { setColor(true); handleFileChange(e) ;}} />
                    </div>
                </div>

                <div style={{ marginTop: '2rem' }} className="trait"></div>
                <h3>Profile recepteur</h3>

                <center>
                    <div className="input">
                        <input type="receverName" name="receverName" id="" placeholder="Nom" style={thisInputStyle} />
                        <div className="i">
                            <i className="fa-solid fa-user-tag"></i>
                        </div>
                    </div>
                </center>

                <center>
                    <div className="input">
                        <input type="tel" name="receverNumber" id="receverNumber" placeholder="Numéro de télephone" style={thisInputStyle} />
                        <div className="i">
                            <i className="fa-solid fa-phone"></i>
                        </div>
                    </div>
                </center>

                <center>
                    <div className="input">
                        <input type="text" name="lieu" id="lieu" placeholder="Lieu de livraison" style={thisInputStyle} onChange={() => setValid(true)} />
                        <div className="i">
                            <i className="fa-solid fa-location-dot"></i>
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