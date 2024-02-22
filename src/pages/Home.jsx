import { ColisContainer } from "../components/Colis";
import { BottomNav, FixedNavbar } from "../components/Nav";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useNavigation } from 'react-router-dom'
import { Start } from "./Start";
import { useData } from "../hooks/useData";
import { useEffect, useState } from "react";
import { fetchJSON } from "../functions/API";
import { HashLoader } from "react-spinners";
import { ToogleUpdate } from '../app/userSlice'
import { serverPath } from "../main";
import moment from "moment";

const coliList = [
    {
        index: 0,
        price: '20 000',
        isValidate: false,
        state: 'en cours'
    },
    {
        index: 9087,
        price: '18 000',
        isValidate: true,
        state: 'en cours'
    },
    {
        index: 678,
        price: '18 000',
        isValidate: true,
        state: 'livré'
    },
    {
        index: 10,
        price: '18 000',
        isValidate: true,
        state: 'annulé'
    },
    {
        index: 789,
        price: '18 000',
        isValidate: true,
        state: 'annulé'
    }, 
    {
        index: 0,
        price: '18 000',
        isValidate: true,
        state: 'en cours'
    },
    {
        index: 0,
        price: '18 000',
        isValidate: true,
        state: 'en cours'
    },
    {
        index: 0,
        price: '18 000',
        isValidate: true,
        state: 'en cours'
    }
]

export function Home() {

    const navigate = useNavigate()
    const {userState, user, type, updateData} = useData()
    const dispatch = useDispatch()
    const [colis, setColis] = useState([])
    const navigation = useNavigation()
    const {state} = navigation

    // const date = moment(user.registerDate)
    // console.log(date.format('DD, MMM YYYY'))

    
    // if(updateData) {
    //     fetchJSON(`${serverPath}allColis?refKey=${user._id}`).then(
    //         data => {
    //             // console.log(data)
    //             // dispatch(updateColis(data))
    //             setColis(data)
    //         }
    //     ).catch(
    //         error => {
    //             console.log(error)
    //         }
    //     )
    //     dispatch(ToogleUpdate(false))
    // }

    fetchJSON(`${serverPath}me`).then(
        data => {
            console.log(data)
        }
    ).catch(
        err => {
            console.log(err)
        }
    )
    

    if(userState) {
        useEffect(() => {
            fetchJSON(`${serverPath}allColis?refKey=${user._id}&type=${type}`).then(
                data => {
                    // console.log(data)
                    // dispatch(updateColis(data))
                    setColis([
                        ...data.allColis
                    ])
                    console.log(data)
                }
            ).catch(
                error => {
                    console.log(error)
                }
            )
        }, [])
        
        return (
            <>
                <FixedNavbar />
                {state === 'idle' && (<div className="body">
                    <p style={{ color: 'black', fontWeight: 'bold', padding: '5px' }}>Récents</p>
                    <ColisContainer coliList={colis} />
                </div>)}
                {state === 'loading' || state === 'submitting' && (<HashLoader color={"#1d1d1d"} />)}
                <BottomNav />
            </>
        )
    } else {
        return (
            <Start />
        )
    }

}