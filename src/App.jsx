import logo from "./assets/logo.png";
import { Metadata } from "./Components/Metadata";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <img src={logo} className="logo" alt="logo" />
      </div>
      <div className="card">
        <Metadata />
      </div>
    </>
  );
}

export default App;
