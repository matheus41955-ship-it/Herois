import Header from "../assets/components/Header";
import AddHeroi from "../assets/components/AddHeroi";
import { useHerois } from "../hooks/useHerois";
import { useState } from "react";

function Inicio() {
    const { data: herois = [], isLoading } = useHerois();
    const [index, setIndex] = useState(0);

    const [filtroTime, setFiltroTime] = useState("todos");
    const [ordemPoder, setOrdemPoder] = useState("normal");

    const cardsVisiveis = 5;
    const maxIndex = Math.max(herois.length - cardsVisiveis, 0);

    const proximo = () => { // Botoes do carrossel
        setIndex((prev) => Math.min(prev + 1, maxIndex));
    };
    const ultimo = () => {
        setIndex((prev) => Math.max(prev - 1, 0));
    };

    const podeComprar = (heroi) => { // Verifica se o heroi esta disponivel pra venda
        return heroi.id_time === null;
    }

    /* Filtros */
    const filtro = [...herois].filter((heroi) => {
        if (filtroTime === "semTime") return heroi.id_time === null;
        return true;
    }).sort((a, b) => {
        if (ordemPoder === "desc") {
            return b.poder - a.poder;
        }
        if (ordemPoder === "asc") {
            return a.poder - b.poder;
        }
        return 0;
    })

    return (
        <div className="min-h-screen flex">
            <main className="bg-[#242222] text-white min-h-screen w-full flex flex-col">
                <Header />

                <div className="p-10 flex-1 flex flex-col">
                    <div className="w-full grid grid-cols-3">
                        <div className="justify-self-start">
                            <h1 className="text-transparent font-bold text-4xl bg-linear-to-r from-orange-300 to-orange-400 bg-clip-text mb-10">
                            PÁGINA DOS HERÓIS:
                            </h1>
                        </div>
                        <div className="justify-self-center"></div>
                        <div className="justify-self-end flex gap-3">
                            <AddHeroi />
                        </div>
                        
                    </div>

                    <div className="flex gap-3 w-full justify-center">
                        <button onClick={() => setFiltroTime("todos")} className={`rounded p-2 ${filtroTime === 'todos' ? 'bg-orange-600' : 'bg-gray-700'}`}>Todos os heróis</button>
                        <button onClick={() => setFiltroTime("semTime")} className={`rounded p-2 ${filtroTime === 'semTime' ? 'bg-orange-600' : 'bg-gray-700'}`}>Heróis sem time</button>
                        <button onClick={() => setOrdemPoder("desc")} className={`rounded p-2 ${ordemPoder === 'desc' ? 'bg-orange-600' : 'bg-gray-700'}`}>Mais Fortes</button>
                        <button onClick={() => setOrdemPoder("asc")} className={`rounded p-2 ${ordemPoder === 'asc' ? 'bg-orange-600' : 'bg-gray-700'}`}>Mais Fracos</button>
                    </div>

                    {isLoading ? ( // Td dentro do operador pra caso n carregar na hr poder aparecer q ta carregando
                        <p>Carregando...</p>
                    ) : (
                        <div className="mt-10 flex items-center gap-4 w-full flex-1">

                            <button onClick={ultimo} disabled={index === 0} className="text-2xl px-3 py-2 bg-slate-900 transition hover:bg-slate-950 rounded-4xl shrink-0 disabled:opacity-40">🡸</button>

                            <div className="overflow-hidden h-full w-full flex-1 flex items-center">
                                <div className="flex gap-6 transition-transform duration-500 w-max" style={{transform: `translateX(-${index * 240}px)`}}>

                                    {filtro.map((heroi) => (
                                        <div key={heroi.id_heroi} className="w-55 h-full bg-white rounded-xl p-4 shrink-0 flex flex-col transition-transform duration-300 hover:scale-[1.06] hover:shadow-2xl hover:shadow-orange-500/60 hover:z-10 overflow-hidden">
                                            <img src={heroi.avatar} alt={heroi.nome} className="w-full h-40 object-cover rounded-xl"/>

                                            <h3 className="mt-3 font-bold text-2xl text-gray-900">{heroi.nome}</h3>
                                            <p className="text-sm text-gray-800"><strong>Nível:</strong> {heroi.nivel}</p>
                                            <p className="text-sm text-gray-800"><strong>Poder:</strong> {heroi.poder}</p>
                                            <p className="text-sm text-gray-800"><strong>Classe:</strong> {heroi.classe}</p>
                                            <p className="text-sm text-gray-800 mb-4"><strong>Time:</strong> {heroi.time}</p>
                                            <p className="text-sm text-gray-800 text-center mb-1"><strong>Preço:</strong> {heroi.preco_compra}</p>

                                            <button disabled={!podeComprar(heroi)} className={`rounded-4xl font-bold transition w-full ${podeComprar(heroi)? "bg-orange-500 hover:bg-orange-600 cursor-pointer text-white" : "bg-gray-400 text-gray-200"}`}>{podeComprar(heroi) ? "COMPRAR" : "RECRUTADO"}</button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button onClick={proximo} disabled={index === maxIndex} className="text-2xl px-3 py-2 bg-slate-900 transition hover:bg-slate-950 rounded-4xl shrink-0 disabled:opacity-40">➔</button>

                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Inicio;