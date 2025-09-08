
import { Routes, Route } from "react-router-dom";
import EnvioForm from "./pages/Envios/EnvioForm/EnvioForm";
import EnvioList from "./pages/Envios/EnviosList/EnviosList";
import CadastroProduto from "./CadastroProduto.jsx";
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" Component={EnvioList} />
      <Route path="/envio/novo" Component={EnvioForm} />
      <Route path="/envios/editar/:id" Component={EnvioForm} />
      <Route path="/CadastroProduto" Component={CadastroProduto} />
    </Routes>
  );
}

export default App