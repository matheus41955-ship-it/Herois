import { useRef, useState } from "react";
import { useUploadFoto } from "../../hooks/useEditarUsuario";

function FotoPerfilModal({ foto }) {
  const refInput = useRef(null);

  const [aberto, setAberto] = useState(false);
  const [arquivo, setArquivo] = useState(null);
  const [previsualizacao, setPrevisualizacao] = useState(null);

  const { mutate, isPending } = useUploadFoto();

  function selecionarArquivo(e) {
    const arquivo = e.target.files[0];
    if (!arquivo) return;

    setArquivo(arquivo);
    setPrevisualizacao(URL.createObjectURL(arquivo));
  }

  function enviarFoto() {
    if (!arquivo) return;

    const formData = new FormData();
    formData.append('foto', arquivo);

    mutate(formData, {
        onSuccess: () => {
            setAberto(false);
            setArquivo(null);
            setPrevisualizacao(null);
        }
    });
  }

  return (
    <>
      <div className="relative w-32 h-32 group">
        <img src={foto} className="w-32 h-32 rounded-full object-cover border-4" />
        <div onClick={() => setAberto(true)} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full cursor-pointer transition">
          ✏️
        </div>
      </div> 

      {aberto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-xl w-100 text-center">

            <h2 className="text-transparent font-bold text-3xl bg-linear-to-r from-orange-400 to-orange-500 bg-clip-text mb-10">ALTERAR FOTO</h2>

            <img src={previsualizacao || foto} className="w-28 h-28 rounded-full mx-auto object-cover mb-4" />

            <input type="file" ref={refInput} onChange={selecionarArquivo} className="hidden" accept="image/*" />

            <button onClick={() => refInput.current.click()} className="bg-white border-2 border-orange-500 border-dotted text-[#242222] px-4 py-2 rounded w-full mb-3 font-bold cursor-pointer transition hover:bg-slate-100">
              ↑ Selecionar imagem
            </button>

            <div className="flex gap-2">
              <button onClick={() => setAberto(false)} className="bg-red-500 text-white w-full py-2 rounded cursor-pointer hover:bg-red-600">
                Cancelar
              </button>

              <button onClick={enviarFoto} disabled={!arquivo} className="bg-orange-500 text-white w-full py-2 rounded cursor-pointer hover:bg-orange-600 disabled:opacity-60">
                Salvar
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default FotoPerfilModal;