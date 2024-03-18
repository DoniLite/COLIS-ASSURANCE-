import React, { useState } from "react"
import { useCustomNavigation } from "../hooks/useCustomNavigation"
import { inputStyle } from "./Forms"
import { Loader, serverPath } from "../main"
import { fetchJSON } from "../functions/API"
import { notify } from "../hooks/useNofication"


/**
 * 
 * @param {{customObject:{type:string, inputName: string, placeholder: string, iconClass: string}[], inputDescription: string, btn: string, eventHandler: (e:SubmitEvent, set: (state:'idle'|'submitting'|'loading')=>void, putInputValid:(v:boolean)=>void) => void, children?: React.JSX.Element,}} param0 
 * @returns {React.JSX.Element}
 */
export const CreateForm = ({ customObject, eventHandler, inputDescription, btn, children }) => {
    const [isValid, setValid] = useState(true)
    const { state, navigateTo } = useCustomNavigation()
    const [toogleInput, setInput] = useState(true)
    const inputClass = toogleInput ? 'password' : 'text'

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
    return (
        <>
            <div className="create-user-box">
                {state === 'submitting' && <Loader />}
                <div className="flex">
                    <div>
                        <h2 style={{ color: 'blue' }}>{inputDescription}</h2>
                        <p>###</p>
                    </div>
                    <div className="close-box" onClick={closeBox}>
                        <i className="fa-solid fa-circle-xmark fa-2x"></i>
                    </div>
                </div>

                <form action="" onSubmit={(e)=> eventHandler(e, navigateTo, setValid)}>

                    {customObject.map(input => (
                        <center>
                            <div className="input">
                                <input type={input.type==='password'? inputClass: input.type} name={input.inputName} id={input.inputName} onChange={input.type === 'password' ? (e) => { setInput(false); setValid(true); } : null} style={thisInputStyle} placeholder={input.placeholder} />
                                <div className="i" onClick={input.type === 'password' ? () => setInput(v => !v): null}>
                                    <i className={input.iconClass}></i>
                                </div>
                            </div>
                        </center>
                    ))}
                    <center>
                        <button type="submit">{btn}</button>
                    </center>
                    {children}
                </form>
            </div>
        </>
    )
}

/**
 * 
 * @param {SubmitEvent} e 
 * @param {(state:'idle'|'submitting'|'loading')=>void} set -fonction permettant la mise à jour du state pour le <Loader />
 * @param {(v:boolean)=>void} inputValidator
 */
export const createUserCustomHandler = (e, set, inputValidator) => {
    e.preventDefault()
    set('submitting')
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
            set('idle')
            if (data.statut) {
                if (data.statut == false) {
                    notify.warning('Une erreur s\'est produite 🙁')
                    inputValidator(false)
                } else if (data.statut == 'Données invalides') {
                    inputValidator(false)
                    notify.warning('Données invalides 😷 \n vérifiez vos informations!')
                }
            } else {
                console.log(data)
                notify.success('opération effectuée')
                // setTimeout(() => window.location.reload(), 1000)
               
            }
        }
    ).catch(error => { console.log(error); set('idle'); notify.failed('Une erreur s\'est produite 🤕'); })
}