import { useState } from "react";
import { useGuilda } from "../hooks/useHerois";
import Header from "../assets/components/Header";

function Guildas() {
    const [guilda, setGuilda] = useState(null);
    const [herois, setHerois] = useState([]);

    const { data, isLoading } = useGuilda();

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    setGuilda(data?.guilda);
    setHerois(data?.herois || []);

    if (!guilda) {
        const [nomeGuilda, setNomeGuilda] = useState("");
        const [descricao, setDescricao] = useState("");
        const [aberto, setAberto] = useState(false);

        function criarGuilda(e) {
            e.preventDefault();

            const resultado = guildaSchema.safeParse({
                nome: nomeGuilda,
                descricao
            });

            if(!resultado.success) {
                const erros = resultado.error.flatten().fieldErrors;
                toast.error(erros.nome?.[0] || "Erro ao validar");
                return
            }

            mutate({ nome, descricao }, {
                onSuccess: () => {
                    
                }
            })
        }

        return (
            <div className="min-h-screen flex">
                <main className="bg-[#242222] text-white min-h-screen w-full flex flex-col">
                    <Header />

                    <div className="min-w-screen p-10">
                        <div className="bg-white w-full rounded-3xl p-10 shadow-xl">
                            
                            <div className="grid grid-cols-3 w-full mb-10">
                                <div className="justify-self-start">
                                    <NavLink to="/inicio" className="text-orange-600 font-bold hover:text-orange-700 transition">← Voltar</NavLink>
                                </div>
                                <div className="justify-self-center"></div>
                                <div className="justify-self-end"></div>
                            </div>

                            <div className="flex items-center gap-8">
                                <h2 className="font-boldtext-transparent font-bold text-4xl bg-linear-to-r from-orange-300 to-orange-400 bg-clip-text mb-10">GUILDA NÃO ENCONTRADA</h2>
                                <p className="text-gray-600">Parece que você não tem um time, clique no botão abaixo para criar um!</p>
                                <button type="button" onClick={() => setAberto(true)} className="bg-orange-500 text-white font-bold hover:bg-orange-600 cursor-pointer transition rounded p-1">Crie uma guilda</button>
                            </div>

                        </div>
                    </div>

                    {aberto && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                            <div className="bg-white p-8 rounded-2xl w-125">

                                <h2 className="text-transparent font-bold text-3xl bg-linear-to-r from-orange-400 to-orange-500 bg-clip-text mb-5">
                                    Criar Time
                                </h2>
                            
                                <label htmlFor="nome" className="text-black">Nome:</label>
                                <input name="nome" value={nomeGuilda} onChange={(e) => setNomeGuilda(e.target.value)} className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition mb-5" placeholder="Nome"/>

                                <label htmlFor="descricao" className="text-black">Descrição:</label>
                                <textarea name="descricao" id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Opcional (Máx 500 caract.)" className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition mb-5 resize-none"></textarea>

                                <div className="flex justify-center gap-5 mt-5">
                                    <button onClick={() => setAberto(false)} className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer transition font-bold hover:bg-red-600">Cancelar</button>
                                    <button onClick={} className="bg-orange-500 text-white px-4 py-2 rounded cursor-pointer transition font-bold hover:bg-orange-600 disabled:opacity-50">{isPending ? "Carregando..." : "Salvar"}</button>
                                </div>

                            </div>
                        </div>
                    )}

                </main>
            </div>
        );
    }
}

export default Guildas;