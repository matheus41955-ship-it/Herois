import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RotaPrivada from './assets/components/RotaPrivada';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Inicio from './pages/Inicio';
import Perfil from './pages/Perfil';
import Guildas from './pages/Guildas';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Telas de login e cadastro */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />

        <Route path='/inicio' element={<RotaPrivada><Inicio /></RotaPrivada>} />
        <Route path='/perfil' element={<RotaPrivada><Perfil /></RotaPrivada>} />
        <Route path='/time' element={ <RotaPrivada><Guildas /></RotaPrivada> } />
      </Routes>

      <ToastContainer
        position="top-right" 
        autoClose={1500} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  )
}

export default App