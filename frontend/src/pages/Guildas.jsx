import { useState } from "react";
import TelaSemGuilda from "../assets/components/TelaSemGuilda";
import { useGuildas } from "../hooks/useGuildas";
import { useVenderHeroi } from "../hooks/useHerois";
import Header from "../assets/components/Header";
import ModalMissoes from "../assets/components/ModalMissoes"
import { NavLink } from "react-router-dom";

export default function Guildas() {
    const { mutate: venderHeroi, isPending } = useVenderHeroi();
    const { data, isLoading } = useGuildas();
    
    const [heroiParaMissoes, setHeroiParaMissoes] = useState(null);

    if (isLoading) return <p>Carregando...</p>;

    const guilda = data?.guilda;
    const herois = data?.herois || [];

    // SEM GUILDA
    if (!guilda) {
        return <TelaSemGuilda />;
    }

    function handleVenda(id_heroi) {
        const confirmacao = window.confirm("Tem certeza de que você quer vender esse herói?");
        if (!confirmacao) return;
        venderHeroi(id_heroi);
    }

    // COM GUILDA
    return (
      <div className="min-h-screen flex">
        <main className="bg-[#242222] text-white min-h-screen w-full flex flex-col">
          <Header />

          <div className="p-10 h-full">
            <div className="bg-white text-black rounded-3xl p-10 shadow-xl h-full">
              <div className="grid grid-cols-3 w-full mb-10">
                <div className="justify-self-start">
                  <NavLink to="/inicio" className="text-orange-600 font-bold hover:text-orange-700 transition">← Voltar</NavLink>
                </div>

                <div className="justify-self-center"></div>

                <div className="justify-self-end"></div>
              </div>

              <h1 className="text-3xl font-bold text-orange-500 mb-2">
                {guilda.nome}
              </h1>

              <p className="text-gray-600 mb-6">
                {guilda.descricao || "Sem descrição"}
              </p>

              <h2 className="text-xl font-bold mb-4">Heróis da guilda</h2>

              {herois.length === 0 ? (
                <p>Nenhum herói recrutado</p>
              ) : (
                <div className="grid grid-cols-5 gap-4 min-h-95">
                  {herois.map((h) => (
                    <div
                      key={h.id_heroi}
                      className="border-2 border-orange-400 shadow-md shadow-orange-500/30 p-4 rounded-xl flex flex-col justify-between h-full text-center bg-white hover:shadow-lg transition-shadow"
                    >
                      <div className="w-full h-40 mb-3 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={h.avatar}
                          alt={h.nome}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="grow flex flex-col justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-xl text-gray-800 mb-2">
                            {h.nome}
                          </h3>

                          <div className="text-sm text-gray-600 space-y-1">
                            <p>
                              <strong>Classe:</strong> {h.classe}
                            </p>
                            <p>
                              <strong>Poder:</strong>{" "}
                              <span className="text-orange-600 font-semibold">
                                {h.poder}
                              </span>
                            </p>
                            <p>
                              <strong>Nível:</strong> {h.nivel}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm font-semibold text-amber-600 mt-3 pt-2 border-t border-gray-100">
                          Preço de venda: {h.preco_venda} moedas
                        </p>
                      </div>

                      <div className="w-full flex gap-2">
                        <button onClick={() => handleVenda(h.id_heroi)} className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded-lg font-bold text-xs cursor-pointer transition-colors">
                          VENDER
                        </button>
                        <button onClick={() => setHeroiParaMissoes(h)} className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded-lg font-bold text-xs cursor-pointer disabled:opacity-50 transition-colors">
                          MISSÕES
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {heroiParaMissoes && (
            <ModalMissoes heroi={heroiParaMissoes} onClose={() => setHeroiParaMissoes(null)} />
          )}
        </main>
      </div>
    );
}