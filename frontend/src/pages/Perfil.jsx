import { useState } from "react";
import editarInfoSchema from "../schemas/editarInfoSchema";

import Header from "../assets/components/Header";
import FotoPerfilModal from "../assets/components/FotoPerfilModal";

import { useUsuario } from "../hooks/useUsuario";
import { useEditarUsuario } from "../hooks/useEditarUsuario";

import { useQueryClient } from "@tanstack/react-query";


function Perfil() {
    const { data, isLoading, isError } = useUsuario();
    const mutation = useEditarUsuario();
    const queryClient = useQueryClient();

    // Dados de edição
    const [nomeEdit, setNomeEdit] = useState('');
    const [usuarioEdit, setUsuarioEdit] = useState('');
    const [emailEdit, setEmailEdit] = useState('');
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confSenha, setConfSenha] = useState('');

    const [popup, setPopup] = useState(false);
    const [sucesso, setSucesso] = useState('');
    const [erro, setErro] = useState('');

    function abrirPopup() {
        setNomeEdit(data?.nome || "");
        setUsuarioEdit(data?.usuario || "");
        setEmailEdit(data?.email || "");

        setErro('');
        setSucesso('');
        setPopup(true);
    }

    function atualizarInformacoes(e) {
        e.preventDefault();
        setErro('');

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

            const mensagem =
                erros.nome?.[0] ||
                erros.usuario?.[0] ||
                erros.email?.[0] ||
                erros.senhaAtual?.[0] ||
                erros.novaSenha?.[0] ||
                erros.confSenha?.[0] ||
                "Erro de validação";

            setErro(mensagem);
            return;
        }

        if (novaSenha !== confSenha) {
            setErro("As senhas não conferem");
            return;
        }

        const dados = {
            nome: nomeEdit,
            usuario: usuarioEdit,
            email: emailEdit,
            senhaAtual
        };

        if (novaSenha) {
            dados.novaSenha = novaSenha;
        }

        mutation.mutate(dados, {
            onSuccess: (res) => {
                setSucesso(res.mensagem);

                setSenhaAtual('');
                setNovaSenha('');
                setConfSenha('');
                setPopup(false);

                setTimeout(() => setSucesso(''), 1500);
            },
            onError: (erro) => {
                setErro(erro.response?.data?.erro || "Erro ao atualizar perfil");
            }
        });
    }

    if (isLoading) return <p className="text-white">Carregando...</p>;
    if (isError) return <p className="text-white">Erro ao carregar usuário</p>;

    return (
        <div className="min-h-screen flex">
            <main className="bg-[#242222] text-white">
                <Header />

                <div className="min-w-screen p-10">

                    {sucesso && (
                        <div className="bg-green-100 border border-green-300 text-green-700 rounded-lg p-3 mb-4 text-center">
                            {sucesso}
                        </div>
                    )}

                    <div className="bg-white w-full rounded-3xl p-10 shadow-xl">

                        <div className="flex items-center gap-8">

                            <FotoPerfilModal foto={data?.foto_perfil}
                                onSave={(url) =>
                                    queryClient.setQueryData(["usuario"], (old) => ({
                                        ...old,
                                        foto_perfil: url
                                    }))
                                }
                            />

                            <div className="text-black">
                                <h1 className="text-3xl font-bold">{data?.nome}</h1>
                                <p className="text-gray-600">@{data?.usuario}</p>
                                <p className="text-gray-600">{data?.email}</p>
                            </div>
                        </div>

                        <div className="text-black mt-6">

                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold">
                                    Informações da Conta
                                </h2>

                                <button className="bg-orange-500 text-white font-bold hover:bg-orange-600 transition rounded p-2" onClick={abrirPopup}>
                                    Editar Perfil
                                </button>
                            </div>

                            <p><strong>Nome:</strong> {data?.nome}</p>
                            <p><strong>Usuário:</strong> {data?.usuario}</p>
                            <p><strong>Email:</strong> {data?.email}</p>
                        </div>
                    </div>
                </div>

                {popup && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-white p-8 rounded-2xl w-125">

                            <h2 className="text-transparent font-bold text-3xl bg-linear-to-r from-orange-400 to-orange-500 bg-clip-text mb-5">
                                Editar Perfil
                            </h2>

                            {erro && (
                                <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-center">
                                    {erro}
                                </div>
                            )}
                            

                            <h3 className="font-bold text-xl mb-2 text-black">Editar Informações Básicas</h3>
                            <label htmlFor="nome" className="text-black">Nome:</label>
                            <input name="nome" value={nomeEdit} onChange={(e) => setNomeEdit(e.target.value)} className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition mb-5" placeholder="Nome"/>

                            <label htmlFor="usuario" className="text-black">Nome de Usuário:</label>
                            <input name="usuario" value={usuarioEdit} onChange={(e) => setUsuarioEdit(e.target.value)} className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition mb-5" placeholder="Usuário"/>

                            <label htmlFor="email" className="text-black">E-mail:</label>
                            <input name="email" value={emailEdit} onChange={(e) => setEmailEdit(e.target.value)} className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition mb-5" placeholder="Email"/>


                            <h3 className="font-bold text-xl mb-2 text-black">Mudar Senha</h3>
                            <label htmlFor="novaSenha" className="text-black">Nova Senha:</label>
                            <input name="novaSenha" type="password" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition mb-5" placeholder="Nova senha"/>
                            
                            <label htmlFor="confSenha" className="text-black">Confirmar Senha:</label>
                            <input name="confSenha" type="password" value={confSenha} onChange={(e) => setConfSenha(e.target.value)} className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition mb-5" placeholder="Confirmar senha"/>
                            
                            <h3 className="font-bold text-xl mb-2 text-black">Validar Senha</h3>
                            <label htmlFor="senha" className="text-black">Senha Atual:</label>
                            <input name="senha" type="password" value={senhaAtual} onChange={(e) => setSenhaAtual(e.target.value)} className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition mb-5" placeholder="Senha atual"/>

                            <div className="flex justify-center gap-5 mt-5">
                                <button onClick={() => setPopup(false)} className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer transition font-bold hover:bg-red-600">Cancelar</button>
                                <button onClick={atualizarInformacoes} className="bg-orange-500 text-white px-4 py-2 rounded cursor-pointer transition font-bold hover:bg-orange-600">Salvar</button>
                            </div>

                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}

export default Perfil;