import { useEffect, useState } from "react"
import colis from "../assets/img/COLIS.png"
import Google from "../assets/img/Google.png"
import { NavLink, useNavigate, useParams, redirect, useNavigation } from "react-router-dom"
import { fetchJSON } from "../functions/API"
import { useSelector, useDispatch } from 'react-redux'
import { addDataToState, putConnected, setUserType, ToogleUpdate } from '../app/userSlice'
import { useData } from "../hooks/useData"
import { serverPath } from "../main"
import { HashLoader } from "react-spinners";
import axios from 'axios'
import { toast } from 'react-toastify';
import { Modal } from 'flowbite-react';
import 'react-toastify/dist/ReactToastify.min.css';

export const id1 = '65a6c6c185261f43dd5c6e77'

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
    let [error, setError] = useState()
    const dispatch = useDispatch()
    const [canNavigate, setNavigate] = useState(false)
    let [isError, putError] = useState(false)
    const {user, type} = useData()

    /**
     * 
     * @param {SubmitEvent} e
     */
    async function otpVerification(e) {
        e.preventDefault()
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
            setNavigate(true)
        }else {
            setError(error='code invalide')
            putError(error = true)
        }
    }

    if(canNavigate) {
        navigate('/')
    }

    return(
        <div className="code-confirmation">
            <div className="flex-div">
                <div></div>
                <img src={colis} alt="" className="app-logo" />
            </div>
            <h1 style={{color: 'black', marginTop: '6rem'}}>Authentification</h1>
            <p style={{ fontWeight: 'bold', margin: '1rem 0' }}>Saisissez le code de vérification envoyé sur votre numéro</p>
           {isError && <center><p>{error}</p></center>}


            <form action="" onSubmit={otpVerification}>
                <center style={{marginTop: '4rem', marginBottom: '2rem'}}>
                    <input type="text" name="code" id="code" />
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
    const user = useSelector((state) => state.userState.data.user)

    async function SubmitPhone(e) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const phoneNumber = formData.get('number')
        const formattedPhoneNumber = encodeURIComponent(phoneNumber);
        const formattedId = encodeURIComponent(user._id);
        fetchJSON(`${serverPath}phoneVerification/?number=${formattedPhoneNumber}&id=${formattedId}`).then(
            data => {
                console.log(data)
                if(data.statut) {
                    navigate(`/authentification/${phoneNumber}`)
                } else {
                    errorMessage = 'Veuillez réssayer...'
                }
            }
        )
    }

    return(
        <div className="verif">
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
                    <input type="tel" name="number" id="number" />
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
    const navigation = useNavigation()
    const [toogleInput, setInput] = useState(true)
    const inputClass = toogleInput ? 'password' : 'text'
    

    /**
     * 
     * @param {SubmitEvent} e 
     */
    function connectUser(e) {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const email = form.get('email')
        const password = form.get('password')
        const userForm = {
            type: type,
            email,
            password,
        }

        fetchJSON(`${serverPath}connexion`, {
            method: 'POST',
            json: userForm,
            credentials: 'include',
        }).then(data => {
            if(data.err === false || data.user === null || data.user === false) {
                setError(error = true)
            }
            else{
                setError(error = false)
                dispatch(putConnected())
                dispatch(addDataToState(data))
                // console.log(redirect('/'))
                // return 
                setNavigate(true)
            }
        })
    }

    if(canNavigate) {
        navigate('/')
    }

    return (
        <div className="connexion">
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
                        <input type="text" name="email" id="email" />
                        <div className="i">
                            <i className="fa-solid fa-envelope"></i>
                        </div>
                    </div>
                </center>

                <label htmlFor="passWord">Mot de passe</label>
                <center>
                    <div className="input">
                        <input type={inputClass} name="password" id="password" onChange={() => setInput(false)} />
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
                if(data.statut){
                    if(data.statut == false){
                        setError(error=true)
                        setErrorData(errorData='Erreur serveur... Veuillez réssayer')
                    } else if (data.statut =='Données invalides') {
                        setError(error=true)
                        setErrorData(errorData = data.statut)
                    }
                } else{
                    console.log(data)
                    dispatch(addDataToState(data))
                    dispatch(setUserType('principal'))
                    dispatch(putConnected())
                    setNavigate(true)
                    // navigate('/phoneVerification')
                    console.log(user)
                }
            }
        ).catch(error => console.log(error))
    }

    if (canNavigate) {
        navigate('/phoneVerification')
    }

    return(
        <div className="inscription">
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
                        <input type="text" name="username" id="username"/>
                        <div className="i">
                            <i className="fa-solid fa-user-tag"></i>
                        </div>
                    </div>
                </center>

                <label htmlFor="email">Adresse email</label>
                <center>
                    <div className="input">
                        <input type="email" name="email" id="email"/>
                        <div className="i">
                            <i className="fa-solid fa-envelope"></i>
                        </div>
                    </div>
                </center>

                <label htmlFor="passWord">Mot de passe</label>
                <center>
                    <div className="input">
                        <input type={inputClass} name="password" id="password" onChange={() => setInput(false)} />
                        <div className="i" onClick={() => setInput(v => !v)}>
                            <i className='fa-solid fa-key'></i>
                        </div>
                    </div>
                </center>

                <div className="check">
                    <input type="checkbox" name="isAgree" id="isAgree" checked={checked} onChange={() => setChecked(!checked)}/>
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

        fetchJSON(`${serverPath}addAccount/`, {
            method: 'POST',
            json: fetcData,
        }).then(
            data => {
                console.log(data)
                // reloading of this page
                // window.location.reload()
                dispatch(ToogleUpdate(true))
                setNavigate(true)
                closeBox()
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }

    if (canNavigate) {
        navigate('/compte-entreprise')
    }

    return(
        <div className="create-user-box">
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
                        <input type="text" name="username" id="username" placeholder="Nom d'utilisateur" />
                        <div className="i">
                            <i className="fa-solid fa-user-tag"></i>
                        </div>
                    </div>
                </center>
                
                <center>
                    <div className="input">
                        <input type="email" name="email" id="email" placeholder="Adresse email" />
                        <div className="i">
                            <i className="fa-solid fa-envelope"></i>
                        </div>
                    </div>
                </center>

                <center>
                    <div className="input">
                        <input type={inputClass} name="password" id="password" onChange={() => setInput(false)} placeholder="Mot de passe" />
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

    const notify = {
        success: () => toast.success('Votre profil a été mis à jour!'),
        failed: () => toast.error('Une erreur est survenue'),
        warning: () => toast.warning('')
    }

    const {type, user} = useData()

    const params = useParams()
    const reason = params.reason
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [nav, setNav] = useState(false)
    const [toogleInput, setInput] = useState(true)
    const inputClass = toogleInput ? 'password' : 'text'
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
        const formData = new FormData(e.currentTarget)
        const firstname = formData.get('firstname')
        const lastname = formData.get('lastname')
        const password = formData.get('password')
        const passport = formData.get('passport')
        const pastpassword = formData.get('pastpassword')
        const phoneNumber = formData.get('phoneNumber')
        const country = formData.get('country')
        const town = formData.get('town')
        const avatar = formData.get('avatar')
        const userType = type
        const userId = user._id
        let dataFetch

        if (reason ==='update') {
            dataFetch = {
                firstname,
                lastname,
                passport,
                userType,
                userId,
                isForUpdate: true,
                country,
                town,
                avatar,
            }
        } else {
            dataFetch = {
                firstname,
                lastname,
                pastpassword,
                password,
                passport,
                phoneNumber,
                userType,
                userId,
                isForUpdate: false,
                avatar,
            }
        }

        
        const request = await axios.post(`${serverPath}updateUser`,{
            ...dataFetch
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(request.data)
        dispatch(addDataToState(request.data))
        setNav(true)
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
                        <input type="text" name="firstname" id="firstname" placeholder="Prénom" required/>
                        <div className="i">
                            <i className="fa-solid fa-user-tag"></i>
                        </div>
                    </div>
                </center>

                <center>
                    <div className="input">
                        <input type="text" name="lastname" id="lastname" placeholder="Nom" required/>
                        <div className="i">
                            <i className="fa-solid fa-user-tag"></i>
                        </div>
                    </div>
                </center>

                {reason == 'change' && (<>
                    <center>
                        <div className="input">
                            <input type={inputClass} name="pastpassword" id="pastpassword" onChange={() => setInput(false)} placeholder="Ancien mot de passe" required/>
                            <div className="i" onClick={() => setInput(v => !v)}>
                                <i className="fa-solid fa-key"></i>
                            </div>
                        </div>
                    </center>
                    <center>
                        <div className="input">
                            <input type={inputClass} name="password" id="password" onChange={() => setInput(false)} placeholder="Mot de passe" required/>
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
                                <input type="text" name="country" id="country" placeholder="Pays" required/>
                                <div className="i">
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                            </div>
                        </center>
                        <center>
                            <div className="input">
                                <input type="text" name="town" id="town" placeholder="Ville" required/>
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

    const notify = {
        success: () => toast.success('Colis ajouté avec succès'),
        failed: () => toast.error('Une erreur est survenue'),
        warning: () => toast.warning('Votre solde est insufisant')
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
        const formData = new FormData(e.currentTarget)
        const coliOtp = formData.get('coliOtp')

        fetchJSON(`${serverPath}addColis?code=${coliOtp}&id=${coliId}`).then(
            data => {
                if(data.statut){
                    closeBox()
                    window.location.reload()
                } else {
                    setAlert(true)
                }
            }
        )
    } 

    return (
        <div className="create-user-box">
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
                        <input type="text" name="coliOtp" id="coliOtp" placeholder="Code de confirmation" />
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

