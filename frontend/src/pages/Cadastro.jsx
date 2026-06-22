import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import cadastroSchema from "../schemas/cadastroSchema";
import { useCadastro } from "../hooks/useCadastro";
import { toast } from "react-toastify";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  
  const navigate = useNavigate();
  const { mutate, isPending } = useCadastro();

  async function handleCadastro(e) {
    e.preventDefault();

    if (senha !== confSenha) {
        toast.error('As senhas não conferem');
        return;
    }

    //Validação Zod
    const resultado = cadastroSchema.safeParse({ nome, usuario, email, senha });

    if (!resultado.success) {
      const erros = resultado.error.flatten().fieldErrors;
      toast.error(erros.nome?.[0] || erros.usuario?.[0] || erros.email?.[0] || erros.senha?.[0] || "Erro de validação");
      return;
    }

    mutate({ nome, usuario, email, senha }, {
      onSuccess: () => {
        navigate('/login');
      }
    })
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

          <button type="submit" disabled={isPending} className="w-full py-3 rounded-xl font-semibold text-white bg-orange-500 hover:bg-orange-600 transition shadow-md disabled:opacity-50">
            {isPending ? "Realizando cadastro..." : "Se tornar uma agente!"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Cadastro;
