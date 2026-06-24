import { useRef, useState } from "react";
import { useAddHeroi } from "../../hooks/useHerois";
import addHeroiSchema from "../../schemas/addHeroiSchema";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

function AddHeroi() {
  const refInput = useRef(null);

  const [aberto, setAberto] = useState(false);

  const [nome, setNome] = useState("");
  const [classe, setClasse] = useState("");
  const [poder, setPoder] = useState("");
  const [preco, setPreco] = useState("");

  const [arquivo, setArquivo] = useState(null);
  const [previsualizacao, setPrevisualizacao] = useState(null);

  const { mutate, isPending } = useAddHeroi();

  function selecionarArquivo(e) {
    const file = e.target.files[0];
    if (!file) return;

    setArquivo(file);
    setPrevisualizacao(URL.createObjectURL(file));
  }

  function fecharModal() {
    setAberto(false);
    
    setNome("");
    setClasse("");
    setPoder("");
    setPreco("");
    setPrevisualizacao(null);
  }

  function handleHeroi(e) {
    e.preventDefault();

    const resultado = addHeroiSchema.safeParse({
      nome,
      classe,
      poder,
      preco_compra: preco,
    });

    if (!resultado.success) {
      const erros = resultado.error.flatten().fieldErrors;

      toast.error(
        erros.nome?.[0] ||
        erros.classe?.[0] ||
        erros.poder?.[0] ||
        erros.preco_compra?.[0] ||
        "Erro ao validar"
      );

      return;
    }

    const formData = new FormData();

    formData.append("nome", nome);
    formData.append("classe", classe);
    formData.append("poder", resultado.data.poder);
    formData.append("preco_compra", resultado.data.preco_compra);
    formData.append("foto", arquivo);

    mutate(formData, {
      onSuccess: () => {
        setNome("");
        setClasse("");
        setPoder("");
        setPreco("");
        setArquivo(null);
        setPrevisualizacao(null);

        setAberto(false);
      },
    });
  }

  return (
    <>
        {/* BOTÃO NA PÁGINA INICIAL */}
        <div className="justify-self-end flex gap-3 items-center">
            <button onClick={() => setAberto(true)} className="font-bold cursor-pointer bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition">+ Adicionar Herói</button>
             <NavLink to="/time" className="bg-white text-[#242222] font-bold hover:bg-slate-200 transition rounded-lg p-2">Gerenciar Time</NavLink>
        </div>

      {/* MODAL */}
      {aberto && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-2xl p-6 relative">

            <button onClick={fecharModal} className="absolute top-3 right-3 text-gray-700 font-bold cursor-pointer">✕</button>

            <h2 className="text-2xl font-bold mb-4 text-orange-500">Criar Herói</h2>

            <form onSubmit={handleHeroi} className="space-y-3">
              <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"/>

              <select value={classe} onChange={(e) => setClasse(e.target.value)} className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition">
                <option value="">Selecione a classe</option>
                <option value="heroi">Herói</option>
                <option value="vilao">Vilão</option>
                <option value="anti-heroi">Anti-herói</option>
              </select>

              <input value={poder} onChange={(e) => setPoder(e.target.value)} type="number" placeholder="Poder" className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"/>

              <input value={preco} onChange={(e) => setPreco(e.target.value)} type="number" placeholder="Preço" className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"/>

              <input type="file" ref={refInput} onChange={selecionarArquivo} className="hidden"/>
              <button type="button" onClick={() => refInput.current.click()} className="bg-white border-2 border-orange-500 border-dotted text-[#242222] px-4 py-2 rounded w-full mb-3 font-bold cursor-pointer transition hover:bg-slate-100">Escolher imagem</button>

              {/* PREVIEW */}
              {previsualizacao && (
                <img src={previsualizacao} className="w-20 h-20 rounded-xl object-cover mx-auto"/>
              )}

              <button type="submit" disabled={isPending} className="w-full bg-orange-500 text-white py-2 rounded">
                {isPending ? "Criando..." : "Criar Herói"}
              </button>

            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddHeroi;