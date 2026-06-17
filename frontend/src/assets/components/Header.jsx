import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../api/api";

function Header() {
    const [usuario, setUsuario] = useState("");
    const [carteira, setCarteira] = useState(0);

    useEffect(() => {
        async function carregarDadosUsuario() {
            const { data } = await api.get('/usuarios/home');
            setUsuario(data.usuario);
            setCarteira(data.carteira);
        }

        carregarDadosUsuario();
    }, [])

    const navigate = useNavigate();

    function Logout() {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div>
            <header className="w-screen h-30 bg-gray-950 text-white shadow-md shadow-orange-500/50 flex items-center justify-center p-6">
                <h1 className=" text-transparent font-bold text-4xl bg-linear-to-r from-orange-300 to-orange-400 bg-clip-text">SALA DOS HERÓIS</h1>
            </header>
            <div className="w-screen h-16 bg-gray-900 border-b-2 border-b-orange-400 shadow-md shadow-orange-500/50 grid grid-cols-3 items-center px-6">
                <div className="font-bold justify-self-start">Olá, {usuario}!</div>
                <div className="justify-self-center">
                    <p className="font-bold">💵 Carteira: {carteira}</p>
                </div>
                <div className="justify-self-end flex items-center gap-3">
                    <NavLink to="/cadastro" className="bg-white text-[#242222] font-bold hover:bg-slate-200 cursor-pointer transition rounded p-1">Configurações</NavLink>
                    <button onClick={Logout} className="bg-orange-500 text-white font-bold hover:bg-orange-600 cursor-pointer transition rounded p-1">Logout</button>
                </div>
            </div>
        </div>
    );
}

export default Header;