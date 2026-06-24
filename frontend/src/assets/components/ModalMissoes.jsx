import { useState } from "react";
import { useBuscarMissoes, useCriarMissao, useCompletarMissao } from "../../hooks/useMissoes";

export default function ModalMissoes({ heroi, onClose }) {
  const [aba, setAba] = useState("lista");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const { data: respostaMissoes = [], isLoading } = useBuscarMissoes(heroi.id_heroi);
  const missoes = Array.isArray(respostaMissoes[0]) ? respostaMissoes[0] : respostaMissoes;
  
  const criarMutation = useCriarMissao(heroi.id_heroi, () => setAba("lista"));
  const completarMutation = useCompletarMissao(heroi.id_heroi);

  const handleCriar = (e) => {
    e.preventDefault();
    if (!nome.trim()) return;
    criarMutation.mutate({
      nome,
      descricao: descricao.trim() ? descricao : "Nenhuma descrição.",
    });
    setNome("");
    setDescricao("");
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white text-black p-6 rounded-2xl w-full max-w-md shadow-2xl flex flex-col max-h-[85vh] border border-orange-100">
        
        <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
          <div className="text-left w-full pr-4">
            <h2 className="text-xl font-black text-gray-800 leading-tight">
              Quadro de <span className="text-orange-500">Missões</span>
            </h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">{heroi.nome}</p>
            
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-red-500 transition-colors text-2xl">✕</button>
        </div>

        <div className="flex gap-2 mb-6">
          <button onClick={() => setAba("lista")} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${aba === 'lista' ? 'bg-orange-500 text-white shadow-md shadow-orange-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>MISSÕES ATIVAS</button>
          <button onClick={() => setAba("criar")} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${aba === 'criar' ? 'bg-orange-500 text-white shadow-md shadow-orange-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>+ NOVA MISSÃO</button>
        </div>

        <div className="overflow-y-auto grow pr-1 custom-scrollbar">
          {isLoading ? (
            <div className="flex justify-center py-10 text-orange-500 animate-pulse font-bold">Carregando quadro...</div>
          ) : aba === "lista" ? (
            <div className="space-y-3">
              {missoes.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-400 text-sm italic">Nenhuma missão no mural deste herói.</p>
                </div>
              ) : (
                missoes.map((m, index) => (
                  <div key={`${m.id_missao}-${index}`} className="group border border-gray-100 p-4 rounded-xl flex justify-between items-center bg-gray-50 hover:bg-white hover:border-orange-200 transition-all">
                    <div className="text-left max-w-[60%]">
                      <p className="font-bold text-gray-800 text-sm truncate">{m.nome}</p>
                      <p className="text-[11px] text-gray-400 line-clamp-2 leading-tight">{m.descricao}</p>
                    </div>
                    <button disabled={completarMutation.isPending} onClick={() => window.confirm(`Confirmar conclusão: ${m.nome}?`) && completarMutation.mutate(m.id_missao)} className="bg-green-500 hover:bg-green-600 text-white font-black py-2 px-3 rounded-lg text-[10px] tracking-tighter transition-all disabled:opacity-50 active:scale-95">
                      {completarMutation.isPending ? "..." : "COMPLETAR"}
                    </button>
                  </div>
                ))
              )}
            </div>
          ) : (
            <form onSubmit={handleCriar} className="space-y-4 text-left p-1">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Título da Missão</label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full border-2 border-gray-100 rounded-xl p-3 text-sm focus:border-orange-500 outline-none transition-colors" placeholder="Ex: Eliminar Goblins das redondezas" required />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Descrição dos Detalhes</label>
                <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} className="w-full border-2 border-gray-100 rounded-xl p-3 text-sm focus:border-orange-500 outline-none resize-none h-28 transition-colors" placeholder="Conte o que o herói deve fazer exatamente..." />
              </div>
              <button type="submit" disabled={criarMutation.isPending} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-sm shadow-lg shadow-orange-200 transition-all disabled:opacity-50 active:scale-[0.98]">
                {criarMutation.isPending ? "PUBLICANDO..." : "PUBLICAR NO QUADRO"}
              </button>
            </form>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-50 text-center">
            <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">Recompensas e XP são geradas automaticamente ao completar</p>
        </div>
      </div>
    </div>
  );
}