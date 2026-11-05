import { useState } from "react";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState("5 segundos");
  const [ratio, setRatio] = useState("9:16 — vertical");
  const [reference, setReference] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function handleImage(file?: File) {
    if (!file) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setReference(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Modelos IA início"><span className="brand-mark">M</span> Modelos<span className="brand-muted">.IA</span></a>
        <span className="status-pill"><span className="status-dot" /> Projeto inicial</span>
      </header>

      <section className="intro">
        <p className="eyebrow">CRIADOR DE VÍDEOS</p>
        <h1>Crie seu vídeo</h1>
        <p className="intro-copy">Descreva a cena e escolha as opções básicas.</p>
      </section>

      <section className="workspace">
        <div className="form-panel">
          <label className="field-label" htmlFor="prompt">Descrição do vídeo</label>
          <textarea id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Descreva o movimento, cenário, iluminação e estilo..." rows={5} />
          <p className="hint">Dica: descreva uma ação simples e específica.</p>

          <div className="upload-area">
            <input id="reference" type="file" accept="image/*" onChange={(e) => handleImage(e.target.files?.[0])} hidden />
            <label htmlFor="reference" className="upload-content">
              {previewUrl ? <img className="reference-preview" src={previewUrl} alt="Imagem de referência" /> : <span className="upload-icon">＋</span>}
              <span className="upload-title">{reference ? reference.name : "Adicionar imagem de referência"}</span>
              <span className="upload-subtitle">Opcional · JPG, PNG ou WEBP</span>
            </label>
            {reference && <button className="remove-image" type="button" onClick={() => { setReference(null); if (previewUrl) URL.revokeObjectURL(previewUrl); setPreviewUrl(null); }}>Remover imagem</button>}
          </div>

          <div className="options-grid">
            <div>
              <label className="field-label" htmlFor="duration">Duração</label>
              <select id="duration" value={duration} onChange={(e) => setDuration(e.target.value)}>
                <option>5 segundos</option><option>10 segundos</option><option>15 segundos</option>
              </select>
            </div>
            <div>
              <label className="field-label" htmlFor="ratio">Formato</label>
              <select id="ratio" value={ratio} onChange={(e) => setRatio(e.target.value)}>
                <option>9:16 — vertical</option><option>16:9 — horizontal</option><option>1:1 — quadrado</option>
              </select>
            </div>
          </div>

          <button className="create-button" type="button" onClick={() => alert("A interface está pronta. A geração de vídeo será conectada na próxima etapa.")}>
            Criar vídeo <span>→</span>
          </button>
          <p className="button-note">A geração ainda não está conectada a um serviço de IA.</p>
        </div>

        <aside className="preview-panel">
          <div className="preview-header"><span>PRÉ-VISUALIZAÇÃO</span><span className="preview-badge">Em breve</span></div>
          <div className="preview-frame">
            {previewUrl ? <img src={previewUrl} alt="Referência selecionada" /> : <div className="preview-empty"><span className="preview-symbol">▶</span><p>Seu vídeo aparecerá aqui</p><small>Adicione uma imagem ou escreva uma descrição</small></div>}
          </div>
          <div className="preview-details"><span>Formato <b>{ratio.split(" ")[0]}</b></span><span>Duração <b>{duration}</b></span></div>
        </aside>
      </section>

      <section className="recent-section">
        <div className="section-heading"><div><p className="eyebrow">BIBLIOTECA</p><h2>Vídeos recentes</h2></div><span className="empty-count">0 vídeos</span></div>
        <div className="empty-library"><span className="library-icon">▧</span><p>Nenhum vídeo criado ainda</p><small>Quando você gerar um vídeo, ele aparecerá aqui.</small></div>
      </section>
      <footer>Modelos-IA <span>·</span> versão inicial</footer>
    </main>
  );
}
