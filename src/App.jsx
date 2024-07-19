import logo from './assets/logo.png'
import { Metadata } from './Components/Metadata'
import { FormularioProvider } from './Context'
import { Autorizations } from './Components/Autorizations'
// import { Tipifications } from './Components/Tipifications'
import { TipificationsV2 } from './Components/TipificationsV2'
import './App.css'

function App() {
  return (
    <>
      <div>
        <img src={logo} className="logo" alt="logo" />
      </div>
      <div className="card">
        <FormularioProvider>
          <Metadata />
          <Autorizations />
          <TipificationsV2 />
        </FormularioProvider>
      </div>
    </>
  )
}

export default App
