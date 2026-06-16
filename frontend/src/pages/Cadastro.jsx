import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import api from "../api/api";
import cadastroSchema from "../schemas/cadastroSchema";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  
  const [erro, setErro] = useState("")
  const [sucesso, setSucesso] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      return
    }
  }, []);

  async function handleCadastro(e) {
    e.preventDefault();
    setErro(""); // Limpar o erro antes de validar

    if (senha !== confSenha) {
        setErro('As senhas não conferem');
        return;
    }

    //Validação Zod
    const resultado = cadastroSchema.safeParse({ nome, usuario, email, senha });

    if (!resultado.success) {
      const erros = resultado.error.flatten().fieldErrors;

      const mensagem = erros.nome?.[0] || erros.usuario?.[0] || erros.email?.[0] || erros.senha?.[0] || "Erro de validação";

      setErro(mensagem);
      return;
    }

    try {
      const resposta = await api.post("/usuarios/cadastro", {
        nome,
        usuario,
        email,
        senha,
      });

      setErro("");
      setSucesso(resposta.data.mensagem);

      setTimeout(() => {
        navigate('/login');
      }, 1500)

    } catch (erro) {
      const mensagem = erro.response?.data?.erro || "Erro no cadastro";

      setErro(mensagem);
      setSucesso(""); // limpa sucesso
    }
  }

  return (
    <div className="min-h-screen bg-[#242222] flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-white border border-orange-200 rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-500">
            SALA DOS HERÓIS
          </h1>
          <p className="text-slate-500 mt-2">
            Forme seu time e caminhe para a vitória!
          </p>
        </div>

        {erro && (<p className="text-red-500 text-sm mb-4 text-center">{erro}</p>)}
        {sucesso && (<p className="text-green-600 text-sm mb-4 text-center">{sucesso}</p>)}

        <form className="space-y-5" onSubmit={handleCadastro}>

          <div>
            <label htmlFor="nome" className="block text-slate-700 mb-2">Nome Completo:</label>

            <input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} type="text" placeholder="Bruce Wayne" className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"/>
          </div>

          <div>
            <label htmlFor="usuario" className="block text-slate-700 mb-2">Usuário:</label>
            <input id="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} type="text" placeholder="Batman" className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"/>
          </div>

          <div>
            <label htmlFor="email" className="block text-slate-700 mb-2">E-mail:</label>
            <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="batman@gotham.com" className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"/>
          </div>

          <div>
            <label htmlFor="senha" className="block text-slate-700 mb-2">Senha:</label>
            <input id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} type="password" className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"/>
          </div>

          <div>
            <label htmlFor="confSenha" className="block text-slate-700 mb-2">Confirmar Senha:</label>
            <input id="confSenha" value={confSenha} onChange={(e) => setConfSenha(e.target.value)} type="password" className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"/>
          </div>

          <div className="text-center">
            <NavLink to="/login" className="text-orange-400 hover:text-orange-500 cursor-pointer transition">Já possui cadastro? <strong>Fazer Login</strong></NavLink>
          </div>

          <button type="submit" className="w-full py-3 rounded-xl font-semibold text-white bg-orange-500 hover:bg-orange-600 transition shadow-md">
            SE TORNAR UM AGENTE
          </button>

        </form>
      </div>
    </div>
  );
}

export default Cadastro;
