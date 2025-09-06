
import { Routes, Route } from "react-router-dom";
import EnvioForm from "./pages/Envios/EnvioForm/EnvioForm";
import EnvioList from "./pages/Envios/EnviosList/EnviosList";
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" Component={EnvioList} />
      <Route path="/envio/novo" Component={EnvioForm} />
      <Route path="/envios/editar/:id" Component={EnvioForm} />
    </Routes>
  );
}

export default App