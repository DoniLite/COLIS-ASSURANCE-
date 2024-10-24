import './App.css'
import { Outlet, useRouteError, RouterProvider, createBrowserRouter, useNavigate, useNavigation } from 'react-router-dom'
import { Home } from './pages/Home'
import { AddedColis, Details, NewColis } from './pages/Details'
import { Statut } from './pages/Statut'
import { Params } from './pages/Params'
import { Balance, InformationsAccount, Profil } from './pages/Profil'
import { Historique } from './pages/Historique'
import { Map } from './pages/Map'
import { Choice, Choose } from './pages/Choose'
import { Start } from './pages/Start'
import { Authentification, CompleteProfil, Connexion, Inscription, PhoneVerification, Recupération, ResetPassword } from './components/Forms'
import { ColiStatut, ColisContainer } from './components/Colis'
import { SousComptePage } from './pages/SousComptes'
import { AdminConnexion } from './pages/AdminConnexion'
import { AllRecharges, TableauDeBord } from './pages/TableauDeBord'
import { AccountsManagement } from './pages/AdminComptes'
import { AdminActions, AdminComptesStory, AdminDetails, AdminSousComptes, FlowBox, StoryContainer } from './pages/AdminDetails'
import { forwardRef, useEffect } from 'react'
import { fetchJSON } from './functions/API'
import { useData } from './hooks/useData'
import { Analytics } from '@vercel/analytics/react';
import { HashLoader } from "react-spinners";
import {motion} from 'framer-motion'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Loader } from './main'
import { ToastContainer } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SousComptesDetails } from './pages/DetailsSousComptes'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'connexion/:query',
        element: <Connexion />,
      },
      {
        path: 'inscription',
        element: <Inscription />
      },
      {
        path: 'authentification/:id/:number',
        element: <Authentification />,
      },
      {
        path: 'phoneVerification/:id',
        element: <PhoneVerification />,
      },
      {
        path: 'choose',
        element: <Choose />
      },
      {
        path: 'recupération',
        element: <Recupération />
      },
      {
        path: 'reset/:action/:id',
        element: <ResetPassword />
      },
      {
        path: 'details-souscomptes/:id',
        element: <SousComptesDetails />
      },
      {
        path: 'home',
        element: <Start />
      },
      {
        path: 'profil-updating/:reason',
        element: <CompleteProfil />,
      },
      {
        path: 'statut/:admin',
        element: <Statut />,
        children: [
          {
            path:':id/:type',
            element: <ColiStatut />
          }
        ]
      },
      {
        path: 'paramètre',
        element: <Params />
      },
      {
        path: 'story/:id',
        element: <Historique />,
      },
      {
        path: 'profil',
        element: <Profil />,
        children:[
          {
            path: '',
            element: <Balance />
          },
          {
            path: 'accountInfo',
            element: <InformationsAccount />
          }
        ]
      }, 
      {
        path: 'map',
        element: <Map />
      },
      {
        path: 'addColis',
        element: <Details  />,
        children: [
          {
            path: '',
            element: <NewColis />
          },
          {
            path: 'create-new-colis',
            element: <AddedColis />
          }
        ]
      }, 
      {
        path: 'compte-entreprise',
        element: <SousComptePage />
      },
      {
        path: 'paiement/:data',
        element: <Choice />
      },
      {
        path: 'log/admin/colis-assurance',
        element: <AdminConnexion />,
      },
      {
        path: 'colis-assurance/page/admin/hrm',
        element: <TableauDeBord />,
      },
      {
        path: 'colis-assurance/page/admin/allRecharges/:id',
        element: <AllRecharges />,
      },
      {
        path: 'colis-assurance/page/admin/accounts',
        element: <AccountsManagement />
      },
      {
        path: 'colis-assurance/page/admin/accounts-details/:id',
        element: <AdminDetails />,
        children: [
          {
            path: '',
            element: <AdminSousComptes />,
          },
          {
            path: 'userStory',
            element: <StoryContainer />
          },
          {
            path: 'actions/:amount/:userState',
            element: <AdminActions />,
          }
        ]
      }
    ]
  }
])

function Root() {

  return (
    <>
      <MotionBox initial={{opacity: 0, y: 40,}} animate={{opacity: 1, y: 0,}} >
        <Outlet />
      </MotionBox>
      <SpeedInsights/>
      <Analytics />
      <ToastContainer />
    </>
  )
}

function ErrorPage () {
  const error = useRouteError()
  console.log(error)
  return(
    <>
      <center style={{ marginTop: '2rem', color: 'blue' }}>
        <p>Oups... Une erreur s'est produite</p>
        <motion.small>Veuillez recharger la page</motion.small>
      </center>
    </>
  )
}

export function App() {
  
  return(
    <>
      <RouterProvider router={router} />
    </>
  )
}

const Box = forwardRef(({ children }, ref) =>{
  return(
    <div ref={ref}>
      {children}
    </div>
  )
})

const MotionBox = motion(Box)

export default App