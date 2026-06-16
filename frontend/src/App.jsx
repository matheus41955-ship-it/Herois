import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import RotaPrivada from './assets/components/RotaPrivada'
import Cadastro from './pages/Cadastro'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Telas de login e cadastro */}
        {<Route path="/" element={<Navigate to="/login" replace />} />}
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App