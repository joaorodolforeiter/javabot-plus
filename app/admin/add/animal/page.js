"use client";

export default function page() {
  function handleSubmit(event) {
    event.preventDefault();
    const data = event.target.elements;

    console.log(data);

    fetch("/api/add/animal", {
      method: "POST",
      body: { name: "data.nome.value" },
    });
  }

  return (
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-md w-full p-6 bg-slate-200 rounded-lg shadow-lg gap-1"
      >
        <div className="flex">
          <div className="space-y-2">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              name="nome"
              id="nome"
              placeholder="Nome do animal..."
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="especie">Especie</label>
            <input
              type="text"
              name="especie"
              id="especie"
              placeholder="Especie do animal..."
            />
          </div>
        </div>

        <label className="mt-2" htmlFor="idade">
          Idade
        </label>
        <input
          type="number"
          name="idade"
          id="idade"
          placeholder="Idade do animal..."
        />
        <label className="mt-2" htmlFor="descricao">
          Descricao
        </label>
        <textarea
          className="resize-none"
          rows={4}
          type="text"
          name="descricao"
          id="descricao"
          placeholder="Descrição do animal..."
        ></textarea>
        <label className="mt-2" htmlFor="imagemURL">
          URL da Imagem
        </label>
        <input
          type="text"
          name="imagemURL"
          id="imagemURL"
          placeholder="Url da Imagem..."
        />
        <button
          className="mt-3 w-full bg-slate-300 p-3 rounded-lg shadow-md"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
