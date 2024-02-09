import { useEffect, useState } from "react"
import colis from "../assets/img/COLIS.png"
import Google from "../assets/img/Google.png"
import { NavLink, useNavigate, useParams, redirect, useNavigation } from "react-router-dom"
import { fetchJSON } from "../functions/API"
import { useSelector, useDispatch } from 'react-redux'
import { addDataToState, putConnected, setUserType, ToogleUpdate } from '../app/userSlice'
import { useData } from "../hooks/useData"
import { Loader, serverPath } from "../main"
import { HashLoader } from "react-spinners";
import axios from 'axios'
import { toast } from 'react-toastify';
import { Modal } from 'flowbite-react';
import 'react-toastify/dist/ReactToastify.min.css';
import { useCustomNavigation } from "../hooks/useCustomNavigation"
import { notify } from "../hooks/useNofication"

export const inputStyle = {
    width: '90%',
    padding: '1rem',
    border: `solid 1px `,
    background: 'transparent',
    borderRadius: '10px',
}

export function Clavier() {
    return(
        <div style={red} className="clavier">
            <div className="clavier-item">1</div>
            <div className="clavier-item">2</div>
            <div className="clavier-item">3</div>
            <div className="clavier-item">4</div>
            <div className="clavier-item">5</div>
            <div className="clavier-item">6</div>
            <div className="clavier-item">7</div>
            <div className="clavier-item">8</div>
            <div className="clavier-item">9</div>
            <div className="clavier-item"></div>
            <div className="clavier-item">0</div>
            <div className="clavier-item">
                <i className="fa-solid fa-delete-left"></i>
            </div>
        </div>
    )
}

export function Authentification() {

    const params = useParams()
    const navigate = useNavigate()
    let [error, setError] = useState(undefined)
    const dispatch = useDispatch()
    const [canNavigate, setNavigate] = useState(false)
    let [isError, putError] = useState(false)
    const {user, type} = useData()
    const [isValid, setValid] = useState(true)
    const { state, navigateTo } = useCustomNavigation()

    const color = isValid ? '#027bff' : 'red'

    const thisInputStyle = {
        ...inputStyle,
        border: inputStyle.border + color
    }

    /**
     * 
     * @param {SubmitEvent} e
     */
    async function otpVerification(e) {
        e.preventDefault()
        navigateTo('submitting')
        const formData = new FormData(e.currentTarget)
        const otpCode = formData.get('code')
        const userId = user._id

        const fetchData = {
            type,
            userId,
            code: otpCode,
            number: params.number
        }

        const codeResullt = await fetchJSON(`${serverPath}otp`, {
            method: 'POST',
            json: fetchData
        })
        console.log(codeResullt)
        if(codeResullt.data.statut) {
            dispatch(addDataToState(codeResullt.data))
            dispatch(putConnected())
            setNavigate(true)
            navigateTo('idle')
            notify.success('Bienvenue sur Colis-Assurance!🥳')
        }else {
            setError('code invalide')
            putError(true)
            setValid(false)
            navigateTo('idle')
            notify.warning('Votre code n\'est pas valide')
        }
    }

    if(canNavigate) {
        navigate('/')
    }

    return(
        <div className="code-confirmation">
            {state === 'submitting' && <Loader />}
            <div className="flex-div">
                <div></div>
                <img src={colis} alt="" className="app-logo" />
            </div>
            <h1 style={{color: 'black', marginTop: '6rem'}}>Authentification</h1>
            <p style={{ fontWeight: 'bold', margin: '1rem 0' }}>Saisissez le code de vérification envoyé sur votre numéro</p>
           {isError && <center><p>{error}</p></center>}


            <form action="" onSubmit={otpVerification}>
                <center style={{marginTop: '4rem', marginBottom: '2rem'}}>
                    <input type="text" name="code" id="code" style={thisInputStyle} onChange={() => setValid(true)} />
                    <small style={{ display: 'block', margin: '1rem 0' }}>Je n'ai pas reçu le code. <a href="">Renvoyer</a></small>
                </center>

                <center>
                    <button type="submit">Vérifier le code</button>
                </center>
            </form>
        </div>
    )
}

export function PhoneVerification() {
    const navigate = useNavigate()
    let errorMessage
    const [isValid, setValid] = useState(true)
    const { state, navigateTo } = useCustomNavigation()

    const color = isValid ? '#027bff' : 'red'

    const thisInputStyle = {
        ...inputStyle,
        border: inputStyle.border + color
    }
    const user = useSelector((state) => state.userState.data.user)

    async function SubmitPhone(e) {
        e.preventDefault()
        navigateTo('submitting')
        const formData = new FormData(e.currentTarget)
        const phoneNumber = formData.get('number')
        const formattedPhoneNumber = encodeURIComponent(phoneNumber);
        const formattedId = encodeURIComponent(user._id);
        fetchJSON(`${serverPath}phoneVerification/?number=${formattedPhoneNumber}&id=${formattedId}`).then(
            data => {
                console.log(data)
                navigateTo('idle')
                if(data.statut) {
                    navigate(`/authentification/${phoneNumber}`)
                } else {
                    errorMessage = 'Veuillez réssayer...'
                    setValid(false)
                    notify.warning('Veuillez vérifier les données entrées dans le formulaire')
                }
            }
        )
    }

    return(
        <div className="verif">

            {state === 'submitting' && <Loader />}
            <div className="flex-div">
                <div></div>
                <img src={colis} alt="" className="app-logo" />
            </div>

            <h1 style={{ color: 'black', marginTop: '6rem' }}>Vérification Phone</h1>
            <p style={{ fontWeight: 'bold', marginBottom: '4rem' }}>Veuillez insérer votre numéro</p>
            {errorMessage !== undefined && <center><p>{errorMessage}</p> </center>}

            <form action="" onSubmit={SubmitPhone}>
                <small>Saisissez le numéro sans identifiant ex:00112233</small>
                <label htmlFor="number">Numéro</label>
                <center>
                    <input type="tel" name="number" id="number" style={thisInputStyle} onChange={() => setValid(true)} />
                </center>

                <center style={{marginTop: '2rem'}}>
                    <button type="submit">Ajouter le numéro</button>
                </center>
            </form>
        </div>
    )
}

export function Connexion() {

    let [error, setError] = useState(false)
    const [canNavigate, setNavigate] = useState(false)
    const {type} = useData()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { state, navigateTo } = useCustomNavigation()
    const [toogleInput, setInput] = useState(true)
    const inputClass = toogleInput ? 'password' : 'text'
    const [isValid, setValid] = useState(true)
    
    const color = isValid ? '#027bff' : 'red'

    const thisInputStyle = {
        ...inputStyle,
        border: inputStyle.border + color
    }

    /**
     * 
     * @param {SubmitEvent} e 
     */
    function connectUser(e) {
        e.preventDefault()
        navigateTo('submitting')
        const form = new FormData(e.currentTarget)
        const email = form.get('email')
        const password = form.get('password')
        const userForm = {
            type: type,
            email,
            password,
        }

        console.log(state)

        fetchJSON(`${serverPath}connexion`, {
            method: 'POST',
            json: userForm,
            credentials: 'include',
        }).then(data => {
            if (data.err === false || data.user === null || data.user === false) {
                setError(error => error = true)
                setValid(false)
                navigateTo('idle')
            }
            else {
                setError(error = false)
                dispatch(putConnected())
                dispatch(addDataToState(data))
                setValid(true)
                navigateTo('idle')
                // console.log(redirect('/'))
                // return 
                setNavigate(true)
            }
        }).catch(
            err => {
                navigateTo('idle')
                console.log(err)
            }
        )
    }

    if(canNavigate) {
        navigate('/')
    }

    return (
        <div className="connexion">
            { state === 'submitting'  && <Loader />}
            <div className="flex-div">
                <div></div>
                <img src={colis} alt="" className="app-logo" />
            </div>

            <h3 style={{ color: 'black', marginTop: '2rem' }}>Renseignez...</h3>
            <p style={{  marginBottom: '2rem' }}>Bienvenue sur Colis-Assurance</p>
            {error && (<p style={{ color: 'red' }}>Nom d'utilisateur ou mot de passe incorect...</p>)}

            <form action="" onSubmit={connectUser}>
                <label htmlFor="email">Adresse email</label>
                <center>
                    <div className="input">
                        <input type="text" name="email" id="email" style={thisInputStyle} onChange={() => {setValid(true); setError(false);}}/>
                        <div className="i">
                            <i className="fa-solid fa-envelope"></i>
                        </div>
                    </div>
                </center>

                <label htmlFor="passWord">Mot de passe</label>
                <center>
                    <div className="input">
                        <input type={inputClass} name="password" id="password" style={thisInputStyle} onChange={() => { setInput(false); setValid(true); setError(false); }} />
                        <div className="i" onClick={() => setInput(v => !v)}>
                            <i className='fa-solid fa-key'></i>
                        </div>
                    </div>
                </center>
                <div style={{ margin: '1rem' }}>
                    <NavLink to={'/recupération'}>
                        Mot de passe oublié?
                    </NavLink>
                </div>

                <center>
                    <div className="btn-group">
                        <button>CONNEXION</button>
                        <button>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                                <div style={{position: 'relative', bottom: '6px'}}>
                                    <img src={Google} alt="" style={{ width: '1.5rem', position: 'relative', top: '7px', right: '10px' }} />
                                       Connexion avec Google
                                </div>
                            </div>
                        </button>
                    </div>
                </center>
            </form>

            <div style={{ margin: '1rem' }}>
                <small>N'avez vous pas de <NavLink to={'/inscription'} style={{ color: 'blue' }} >compte</NavLink>?</small>
            </div>
        </div>
    )
}

export function Inscription() {


    const [checked, setChecked] = useState(false)
    let [error, setError] = useState(false)
    let [errorData, setErrorData] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useData()
    const [canNavigate, setNavigate] = useState(false)
    const [canToogleClass, setToogleClass] = useState(false)
    const iconClass = canToogleClass ? 'fa-solid fa-eye' :'fa-solid fa-key'
    const [toogleInput, setInput] = useState(true)
    const inputClass = toogleInput ? 'password' :'text'
    const [isValid, setValid] = useState(true)
    const { state, navigateTo } = useCustomNavigation()

    const color = isValid ? '#027bff' : 'red'

    const thisInputStyle = {
        ...inputStyle,
        border: inputStyle.border + color
    }


    navigator.geolocation.getCurrentPosition(
        function (position) {
            // Récupère les coordonnées de latitude et longitude
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            // Fais quelque chose avec ces coordonnées, comme les afficher sur la page
            console.log("Latitude : " + latitude + ", Longitude : " + longitude);
        },
        function (error) {
            // Gère les erreurs, si l'utilisateur ne donne pas la permission, par exemple
            console.error("Erreur de géolocalisation : " + error.message);
            console.log(error)
        }
    );


    /**
     * 
     * @param {SubmitEvent} e 
     */
    function createUser(e) {
        e.preventDefault()
        navigateTo('submitting')
        const formData = new FormData(e.currentTarget)
        const username = formData.get('username')
        const email = formData.get('email')
        const password = formData.get('password')
        const userFetch = {
            username,
            email,
            password,
        }

        fetchJSON(`${serverPath}createAccount`, {
            method: 'POST',
            json: userFetch
        }).then(
            data => {
                navigateTo('idle')
                if(data.statut){
                    if(data.statut == false){
                        setError(true)
                        setErrorData('Erreur serveur... Veuillez réssayer')
                        notify.warning('Une erreur s\'est produite 🙁')
                        setValid(false)
                    } else if (data.statut == 'Données invalides') {
                        setError(true)
                        setErrorData(data.statut)
                        setValid(false)
                        notify.warning('Veuillez réssayer 😷')
                    }
                } else{
                    console.log(data)
                    dispatch(setUserType('principal'))
                    notify.success('Opération effectuée!')
                    setTimeout(() => notify.success('Poursuivons avec la vérification 🤠'))
                    setNavigate(true)
                    // navigate('/phoneVerification')
                    console.log(user)
                }
            }
        ).catch(error => { console.log(error); navigateTo('idle'); notify.failed('Une erreur s\'est produite 🤕')})
    }

    if (canNavigate) {
        navigate('/phoneVerification')
    }

    return(
        <div className="inscription">
            {state === 'submitting' && <Loader />}
            <div className="flex-div">
                <div></div>
                <img src={colis} alt="" className="app-logo" />
            </div>

            <h2 style={{ color: 'black', marginTop: '1.5rem' }}>Bienvenue</h2>
            <p style={{ fontWeight: 'bold', marginBottom: '2rem' }}>Colis-Assurance la plateforme 100% fiable</p>
            {error && (<center><p style={{ color: 'red', }}>{errorData}</p></center>)}

            <form action="" onSubmit={createUser}>
                <label htmlFor="userName">Nom d'utilisateur</label>
                <center>
                    <div className="input">
                        <input type="text" name="username" id="username" style={thisInputStyle}/>
                        <div className="i">
                            <i className="fa-solid fa-user-tag"></i>
                        </div>
                    </div>
                </center>

                <label htmlFor="email">Adresse email</label>
                <center>
                    <div className="input">
                        <input type="email" name="email" id="email" style={thisInputStyle}/>
                        <div className="i">
                            <i className="fa-solid fa-envelope"></i>
                        </div>
                    </div>
                </center>

                <label htmlFor="passWord">Mot de passe</label>
                <center>
                    <div className="input">
                        <input type={inputClass} name="password" id="password" onChange={() => {setInput(false); setValid(true); setError(false);}} style={thisInputStyle} />
                        <div className="i" onClick={() => setInput(v => !v)}>
                            <i className='fa-solid fa-key'></i>
                        </div>
                    </div>
                </center>

                <div className="check">
                    <input type="checkbox" name="isAgree" id="isAgree" value={checked} onChange={() => setChecked(v => !v)}/>
                    <small style={{position: 'relative', bottom: '1rem'}}>J'accepte les termes de confidentialité et les conditions d'utilisation</small>
                </div>
                
                <center>
                    <div className="btn-group">
                        <button disabled={!checked} type="submit">INSCRIPTION</button>
                        <button>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                                <div style={{ position: 'relative', bottom: '6px' }}>
                                    <img src={Google} alt="" style={{ width: '1.5rem', position: 'relative', top: '7px', right: '10px' }} />
                                    Inscription avec Google
                                </div>
                            </div>
                        </button>
                    </div>
                </center>
            </form>

            <div style={{ margin: '1rem' }}>
                <small>Avez-vous un <NavLink to={'/choose'} style={{color: 'blue'}} >compte</NavLink>?</small>
            </div>
        </div>
    )
}

export function CreateUser() {

    const {user} = useData()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [canNavigate, setNavigate] = useState(false)
    const [toogleInput, setInput] = useState(true)
    const inputClass = toogleInput ? 'password' : 'text'
    const [isValid, setValid] = useState(true)
    const {state, navigateTo} = useCustomNavigation()

    const color = isValid ? '#027bff' : 'red'

    const thisInputStyle = {
        ...inputStyle,
        border: inputStyle.border + color
    }

    /**
     * 
     * @param {Event} e 
     */
    function closeBox(e) {
        e.preventDefault()
        const box = document.querySelector('.create-user-box')
        box.style.transform = 'translateX(110%)'
    }

    /**
     * 
     * @param {SubmitEvent} e 
     */
    async function addAccount(e) {
        e.preventDefault()
        navigateTo('submitting')
        const formData = new FormData(e.currentTarget)
        const username = formData.get('username')
        const password = formData.get('password')
        const email = formData.get('email')
        const refKey = user._id


        const fetcData = {
            username,
            password,
            email,
            refKey,
        }

        if (username.length === 0  || password.length === 0 || email.length === 0) {
            setValid(false)
            notify.warning('Vos champs sont vides 😮‍💨')
            setTimeout(() => notify.warning('Veuillez réessayer 🧐'), 1000)
        }else{
            fetchJSON(`${serverPath}addAccount/`, {
                method: 'POST',
                json: fetcData,
            }).then(
                data => {
                    navigateTo('idle')
                    console.log(data)
                    if (data.statut) {
                        setValid(false)
                        notify.warning(data.statut)
                        setTimeout(() => notify.warning('Veuillez réessayer 🧐'), 1000)
                    } else {
                        dispatch(ToogleUpdate(true))
                        notify.success('Opération éffectuée 💯💫')
                        setTimeout(() => notify.success('vous pouvez fermer cette fenêtre'), 1000)
                    }
                    // reloading of this page
                    // window.location.reload()
                }
            ).catch(
                err => {
                    navigateTo('idle')
                    notify.failed('Une erreur s\'est produite 🤕')
                }
            )
        }
    }

    return(
        <div className="create-user-box">
            {state === 'submitting' && <Loader />}
            <div className="flex">
                <div>
                    <h2 style={{color: 'blue'}}>Sous compte</h2>
                    <p>N°###</p>
                </div>
                <div className="close-box" onClick={closeBox}>
                    <i className="fa-solid fa-circle-xmark fa-2x"></i>
                </div>
            </div>

            <form action="" onSubmit={addAccount}>
                <center>
                    <div className="input">
                        <input type="text" name="username" id="username" style={thisInputStyle} placeholder="Nom d'utilisateur" />
                        <div className="i">
                            <i className="fa-solid fa-user-tag"></i>
                        </div>
                    </div>
                </center>
                
                <center>
                    <div className="input">
                        <input type="email" name="email" id="email" style={thisInputStyle} placeholder="Adresse email" />
                        <div className="i">
                            <i className="fa-solid fa-envelope"></i>
                        </div>
                    </div>
                </center>

                <center>
                    <div className="input">
                        <input type={inputClass} name="password" id="password" onChange={() => {setInput(false); setValid(true)}} style={thisInputStyle} placeholder="Mot de passe" />
                        <div className="i" onClick={() => setInput(v => !v)}>
                            <i className='fa-solid fa-key'></i>
                        </div>
                    </div>
                </center>

                

                <center>
                    <button type="submit">Enregistrer</button>
                </center>

            </form>

            <small>Le sous compte validera ses informations à la prochaine connexion</small>
        </div>
    )
}

export function CompleteProfil() {

    const {type, user} = useData()
    const {state, navigateTo} = useCustomNavigation()
    const params = useParams()
    const reason = params.reason
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [nav, setNav] = useState(false)
    const [toogleInput, setInput] = useState(true)
    const inputClass = toogleInput ? 'password' : 'text'
    const [isValid, setValid] = useState(true)

    const color = isValid ? '#027bff' : 'red'

    const thisInputStyle = {
        ...inputStyle,
        border: inputStyle.border + color
    }
    console.log(reason)

    function fileUpload(e) {
        e.preventDefault()
        document.querySelector('#avatar').click()
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
    async function updateUserInfo(e) {
        e.preventDefault()
        navigateTo('submitting')
        const formData = new FormData(e.currentTarget)
        const firstname = formData.get('firstname')
        const lastname = formData.get('lastname')
        const password = formData.get('password')
        const pastpassword = formData.get('pastpassword')
        const phoneNumber = formData.get('phoneNumber')
        const country = formData.get('country')
        const town = formData.get('town')
        const avatar = formData.get('avatar')
        /**
         * @type {string}
         */
        const userType = type
        /**
         * @type {string}
         */
        const userId = user._id
        let dataFetch
        let isAvatarPresent = true

        if(avatar===null) {
            isAvatarPresent = false
        }

        if (reason ==='update') {
            dataFetch = {
                firstname,
                lastname,
                userType,
                userId,
                isForUpdate: true,
                country,
                town,
                avatar,
                isAvatarPresent
            }
        } else {
            dataFetch = {
                firstname,
                lastname,
                pastpassword,
                password,
                phoneNumber,
                userType,
                userId,
                isForUpdate: false,
                avatar,
            }
        }

        
        axios.post(`${serverPath}updateUser`,{
            ...dataFetch
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(
            ({ data }) => {
                navigateTo('idle')
                if(data.statut === false) {
                    setValid(false)
                    notify.warning('Un champ de formulaire est mal rempli')
                    setTimeout(() => notify.warning('Veuillez réessayer 🧐'), 1000)
                }else {
                    setTimeout(() => {
                        notify.success('Bravo 💫💯')
                        dispatch(addDataToState(data))
                    }, 1000)
                    setNav(true)
                }
            }
        ).catch(
            err => {notify.failed('Une erreur s\'est produite'); navigateTo('idle');}
        )
        // fetchJSON(`${serverPath}updateUser`, {
        //     method: 'POST',
        //     json: dataFetch,
        // }).then(
        //     data => {
        //         if(data.statut === false) {
        //             console.log('erreur')
        //         } else {
        //             console.log(data)
        //             dispatch(addDataToState(data))
        //             console.log(user)
        //             setNav(true)
        //         }
        //         // navigate('/')
        //     }
        // ) 
    }
    
    if (nav) {
        navigate('/paramètre')
    }

    return(
        <div className="complet-profil">

            {state === 'submitting' && <Loader />}
            
            <div>
                <NavLink style={{ color: '#027bff', padding: '1rem' }} to={'/paramètre'}>
                    <i className="fa-solid fa-circle-left fa-2x"></i>
                </NavLink>
            </div>
            <h2 style={{ color: 'black', marginTop: '3rem' }}>Mise à jour</h2>
            <p style={{ fontWeight: 'bold', marginBottom: '4rem' }}>De vos informations</p>
            <form action="" onSubmit={updateUserInfo}>
                <input type="file" name="avatar" id="avatar" style={{ display: 'none' }} onChange={handleFileChange} />
                <center style={{ margin: '2rem 0' }}>
                    <img htmlFor="avatar" src={inputChanged ? imageURL : `${serverPath}assets/user/${user.userIcon}`} alt="" className="user-balance" onClick={fileUpload} /> <br />
                    <p>Choisissez une photo</p>
                    <div className="trait" style={{ backgroundColor: '#027bff' }}></div>
                </center>
                <center>
                    <div className="input">
                        <input type="text" name="firstname" id="firstname"  placeholder="Prénom" style={thisInputStyle} required/>
                        <div className="i">
                            <i className="fa-solid fa-user-tag"></i>
                        </div>
                    </div>
                </center>

                <center>
                    <div className="input">
                        <input type="text" name="lastname" id="lastname" onChange={() => setValid(true)} placeholder="Nom" style={thisInputStyle} required/>
                        <div className="i">
                            <i className="fa-solid fa-user-tag"></i>
                        </div>
                    </div>
                </center>

                {reason == 'change' && (<>
                    <center>
                        <div className="input">
                            <input type={inputClass} name="pastpassword" id="pastpassword" style={thisInputStyle} onChange={() => setInput(false)} placeholder="Ancien mot de passe" required/>
                            <div className="i" onClick={() => setInput(v => !v)}>
                                <i className="fa-solid fa-key"></i>
                            </div>
                        </div>
                    </center>
                    <center>
                        <div className="input">
                            <input type={inputClass} name="password" id="password" style={thisInputStyle} onChange={() => {setInput(false); setValid(true);}}  placeholder="Mot de passe" required/>
                            <div className="i" onClick={() => setInput(v => !v)}>
                                <i className='fa-solid fa-key'></i>
                            </div>
                        </div>
                    </center>
                    
                </>)}

                {user.location === undefined || user.location === '' && (
                    <>
                        <center>
                            <div className="input">
                                <input type="text" name="country" id="country" style={thisInputStyle} placeholder="Pays" required/>
                                <div className="i">
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                            </div>
                        </center>
                        <center>
                            <div className="input">
                                <input type="text" name="town" id="town" style={thisInputStyle} placeholder="Ville" onChange={setValid(true)} required/>
                                <div className="i">
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                            </div>
                        </center>
                    </>
                )}

                <center>
                    <button type="submit">Enregistrer</button>
                </center>

            </form>
        </div>
    )
}

export function ColiActionConfirmation ({coliId}) {

    

    const [isValid, setValid] = useState(true)
    const {state, navigateTo} = useCustomNavigation()

    const color = isValid ? '#027bff' : 'red'

    const thisInputStyle = {
        ...inputStyle,
        border: inputStyle.border + color
    }

    const [canAlert, setAlert] = useState(false)

    /**
     * 
     * @param {Event} e 
     */
    function closeBox(e) {
        e.preventDefault()
        const box = document.querySelector('.create-user-box')
        box.style.transform = 'translateX(110%)'
    }

    async function ConfirmColi(e) {
        e.preventDefault()
        navigateTo('submitting')
        const formData = new FormData(e.currentTarget)
        const coliOtp = formData.get('coliOtp')

        fetchJSON(`${serverPath}addColis?code=${coliOtp}&id=${coliId}`).then(
            data => {
                navigateTo('idle')
                if(data.statut){
                    notify.success('Course confirmée!🤙🏾')
                    closeBox()
                    window.location.reload()
                } else {
                    setAlert(true)
                    setValid(false)
                    notify.warning('Données invalides!🙄')
                }
            }
        ).catch(
            err => {
                notify.failed('Une erreur est survenue 🤕')
                navigateTo('idle')
            }
        )
    } 

    return (
        <div className="create-user-box">
            {state === 'submitting' && <Loader />}
            <div className="flex">
                <div>
                    <h3 style={{ color: 'blue' }}>Confirmez votre course</h3>
                    <p>###</p>
                </div>
                <div className="close-box" onClick={closeBox}>
                    <i className="fa-solid fa-circle-xmark fa-2x"></i>
                </div>
            </div>
           

            {canAlert && <center><p style={{ color: 'red' }}>Code incorrect !!!</p></center> }

            <form action="" onSubmit={ConfirmColi}>
                <center>
                    <div className="input">
                        <input type="text" name="coliOtp" id="coliOtp" style={thisInputStyle} placeholder="Code de confirmation" onChange={() => {setAlert(false); setValid(true)}} />
                        <div className="i">
                            <i className="fa-solid fa-key"></i>
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

