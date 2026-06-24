import { useState } from "react";
import { useGuildas } from "../../hooks/useGuildas";
import guildasSchema from "../../schemas/guildasSchema";
import { toast } from "react-toastify";
import Header from "./Header";

function TelaSemGuilda() {
    const { criarGuilda, isCreating } = useGuildas();

    const [aberto, setAberto] = useState(false);
    const [nomeGuilda, setNomeGuilda] = useState("");
    const [descricao, setDescricao] = useState("");

    function handleCriarGuilda(e) {
        e.preventDefault();

        const resultado = guildasSchema.safeParse({
            nome: nomeGuilda,
            descricao: descricao
        });

        if (!resultado.success) {
            const erros = resultado.error.flatten().fieldErrors;
            toast.error(erros.nome?.[0] || erros.descricao?.[0] || "Erro ao validar");
            return;
        }

        criarGuilda(
            { nome: nomeGuilda, descricao },
            {
                onSuccess: () => {
                    setAberto(false);
                    setNomeGuilda("");
                    setDescricao("");
                }
            }
        );
    }

    return (
        <div className="min-h-screen flex">
            <main className="bg-[#242222] text-white min-h-screen w-full flex flex-col">
                <Header />

                <div className="p-10">
                    <div className="bg-white w-full rounded-3xl p-10 shadow-xl">
                        <h2 className="text-4xl font-bold text-orange-500 mb-5">
                            TIME NÃO ENCONTRADO
                        </h2>

                        <p className="text-gray-600 mb-5">
                            Você ainda não tem um time. Crie um clicando no botão abaixo
                        </p>

                        <button onClick={() => setAberto(true)} className="bg-orange-500 text-white px-4 py-2 rounded">
                            Criar guilda
                        </button>
                    </div>
                </div>

                {aberto && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-white p-8 rounded-2xl w-125">
                            <h2 className="text-2xl font-bold mb-5 text-orange-500">
                                Criar Time
                            </h2>

                            <input value={nomeGuilda} onChange={(e) => setNomeGuilda(e.target.value)} placeholder="Nome do time" className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition mb-4" />

                            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição opcional (Máx 500 Caract.)" className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition mb-6" />

                            <div className="flex gap-2">
                                <button onClick={() => setAberto(false)} className="px-5 py-2 rounded-lg font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition cursor-pointer">
                                    Cancelar
                                </button>

                                <button onClick={handleCriarGuilda} disabled={isCreating} className="px-5 py-2 rounded-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 transition shadow-md disabled:opacity-50 cursor-pointer">
                                    {isCreating ? "Criando..." : "Salvar"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default TelaSemGuilda;