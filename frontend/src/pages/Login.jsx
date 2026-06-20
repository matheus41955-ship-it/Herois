import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { loginSchema } from "../schemas/loginSchema";
import { useLogin } from "../hooks/useCadastro";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();
  const { mutate, isPending } = useLogin();

  async function handleLogin(e) {
    e.preventDefault();

    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      return
    }

    //Validação Zod
    const resultado = loginSchema.safeParse({ email, senha });

    if (!resultado.success) {
      const erros = resultado.error.flatten().fieldErrors;
      toast.error(erros.email?.[0] || erros.senha?.[0] || "Erro ao validar, tente novamente mais tarde");
      return;
    }

    mutate({ email, senha }, {
      onSuccess: () => {
        navigate("/inicio");
      }
    });
  }

  return (
    <div className="min-h-screen bg-[#242222] flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-white border border-orange-200 rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-500">
            SALA DOS HERÓIS
          </h1>
          <p className="text-slate-500 mt-2">
            Realize seu cadastro
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-slate-700 mb-2">E-mail:</label>
            <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="batman@gotham.com" className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"/>
          </div>

          <div>
            <label htmlFor="senha" className="block text-slate-700 mb-2">Senha:</label>
            <input id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} type="password" className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"/>
          </div>
          
          <div className="text-center">
            <NavLink to="/cadastro" className="text-orange-400 hover:text-orange-500 cursor-pointer transition">Não possui cadastro? <strong>Fazer Cadastro</strong></NavLink>
          </div>

          <button type="submit" disabled={isPending} className="w-full py-3 rounded-xl font-semibold text-white bg-orange-500 hover:bg-orange-600 transition shadow-md disabled:opacity-50">
            {isPending ? "Realizando login..." : "Realizar login"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;
