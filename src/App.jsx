import logo from './assets/logo.png'
import { Metadata } from './Components/Metadata'
import { FormularioProvider } from './Components/Context'
import { Autorizations } from './Components/Autorizations'
import { Tipifications } from './Components/Tipifications'
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
          <Tipifications />
        </FormularioProvider>
      </div>
    </>
  )
}

export default App
