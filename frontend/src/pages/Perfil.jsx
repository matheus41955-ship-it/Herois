import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import editarInfoSchema from "../schemas/editarInfoSchema";

import Header from "../assets/components/Header";

function Perfil() {
    // Dados pra mostrar
    const [fotoPerfil, setFotoPerfil] = useState('');
    const [nome, setNome] = useState('');
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');

    // Dados de edição
    const [nomeEdit, setNomeEdit] = useState('');
    const [usuarioEdit, setUsuarioEdit] = useState('');
    const [emailEdit, setEmailEdit] = useState('');
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confSenha, setConfSenha] = useState('');

    const [popup, setPopup] = useState(false);

    const [sucesso, setSucesso] =useState('');
    const [erro, setErro] =useState('');

    useEffect(() => {
        async function carregarDadosUsuario() {
            const { data } = await api.get('/usuarios/home');

            setFotoPerfil(data.foto_perfil);
            setNome(data.nome);
            setUsuario(data.usuario);
            setEmail(data.email);
        }

        carregarDadosUsuario();
    }, []);

    const navigate = useNavigate();

    function abrirPopup() {
        setNomeEdit(nome);
        setUsuarioEdit(usuario);
        setEmailEdit(email);

        setErro('');
        setSucesso('');

        setPopup(true);
    }

    async function atualizarInformacoes(e) {
        e.preventDefault();
        setErro('');

        // Validação
        const resultado = editarInfoSchema.safeParse({
            nome: nomeEdit,
            usuario: usuarioEdit,
            email: emailEdit,
            senhaAtual,
            novaSenha,
            confSenha
        });

        if (!resultado.success) {
            const erros = resultado.error.flatten().fieldErrors;

            const mensagem = erros.nome?.[0] || erros.usuario?.[0] || erros.email?.[0] || erros.senhaAtual?.[0] || erros.novaSenha?.[0] || erros.confSenha?.[0] ||
            "Erro de validação";

            setErro(mensagem);
            return;
        }

        if (novaSenha !== confSenha) {
            setErro("As senhas não conferem");
            return;
        }

        try {
            const dados = {
                nome: nomeEdit,
                usuario: usuarioEdit,
                email: emailEdit,
                senhaAtual
            };

            if (novaSenha) {
                dados.novaSenha = novaSenha;
            }

            const { data } = await api.put("/usuarios/perfil", dados);
            setNome(nomeEdit);
            setUsuario(usuarioEdit);
            setEmail(emailEdit);

            setSenhaAtual('');
            setNovaSenha('');
            setConfSenha('');

            setPopup(false);

            setSucesso(data.mensagem);
            setErro('');

        } catch (erro) {
            console.error(erro);
            setErro(erro.response?.data?.erro || "Erro ao atualizar perfil");
            setSucesso('');
        }
    }

    return (
        <div className="min-h-screen flex">
            <main className="bg-[#242222] text-white">
                <Header />

                <div className="min-w-screen p-10">

                    <div className="bg-white w-full rounded-3xl p-10 shadow-xl">

                        <div className="flex items-center gap-8">
                            <img src={fotoPerfil} alt="Foto de perfil" className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 mb-10" />
                            <div className="text-black">
                                <h1 className="text-3xl font-bold">{nome}</h1>
                                <p className="text-gray-600">@{usuario}</p>
                                <p className="text-gray-600">{email}</p>
                            </div>
                        </div>

                        <div className="text-black">
                            <div className="min-w-full grid grid-cols-3 items-center">
                                <div className="justify-self-start">
                                    <h2 className="text-2xl font-semibold mb-4">Informações da Conta</h2>
                                </div>
                                
                                <div className="justify-self-center"></div>

                                <div className="justify-self-end">
                                    <button className="bg-orange-500 text-white font-bold hover:bg-orange-600 cursor-pointer transition rounded p-1" onClick={abrirPopup}>Editar Perfil</button>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <p><strong>Nome:</strong> {nome}</p>
                                <p><strong>Usuário:</strong> {usuario}</p>
                                <p><strong>Email:</strong> {email}</p>
                            </div>
                        </div>

                    </div>

                </div>

                {popup && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-white p-8 rounded-2xl w-[500px]">
                            <h2 className="text-transparent font-bold text-3xl bg-linear-to-r from-orange-400 to-orange-500 bg-clip-text mb-10">Editar Perfil</h2>

                            {erro && (
                                <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg p-3 mb-4">
                                    {erro}
                                </div>
                            )}

                            {sucesso && (
                                <div className="bg-green-100 border border-green-300 text-green-700 rounded-lg p-3 mb-4">
                                    {sucesso}
                                </div>
                            )}

                            <h3 className="font-bold text-black text-xl mb-2">Alterar Informações</h3>
                            <label htmlFor="nome" className="block text-slate-700 mb-1">Nome:</label>
                            <input name="nome" value={nomeEdit} onChange={(e) => setNomeEdit(e.target.value)} className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition mb-5" />
                            
                            <label htmlFor="usuario" className="block text-slate-700 mb-1">Usuario:</label>
                            <input name="usuario" value={usuarioEdit} onChange={(e) => setUsuarioEdit(e.target.value)} className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition mb-5" />
                            
                            <label htmlFor="email" className="block text-slate-700 mb-1">E-mail:</label>
                            <input name="email" value={emailEdit} onChange={(e) => setEmailEdit(e.target.value)} className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition mb-5" />
                            
                            <h3 className="font-bold text-black text-xl mb-2">Mudar Senha</h3>
                            <label htmlFor="novaSenha" className="block text-slate-700 mb-1">Nova senha:</label>
                            <input name="novaSenha" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} type="password" placeholder="Nova senha" className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition mb-5" />
                            
                            <label htmlFor="confSenha" className="block text-slate-700 mb-1">Confirmar senha:</label>
                            <input name="confSenha" value={confSenha} onChange={(e) => setConfSenha(e.target.value)} type="password" placeholder="Nova senha" className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition mb-5" />

                            <h3 className="font-bold text-black text-xl mb-2">Validar senha</h3>
                            <label htmlFor="senha" className="block text-slate-700 mb-1">Senha Atual:</label>
                            <input name="senha" value={senhaAtual} onChange={(e) => setSenhaAtual(e.target.value)} type="password" placeholder="Nova senha" className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition mb-5" />

                            <div className="flex justify-center gap-3 mt-5">
                                <button className="bg-orange-500 text-white font-bold hover:bg-orange-600 cursor-pointer transition rounded p-1" onClick={atualizarInformacoes}>Salvar</button>
                                <button className="bg-orange-500 text-white font-bold hover:bg-orange-600 cursor-pointer transition rounded p-1" onClick={() => setPopup(false)}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}


            </main>
        </div>
    );
}

export default Perfil;