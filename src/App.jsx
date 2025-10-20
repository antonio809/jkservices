import { useState, useEffect } from "react";

const setores = [
  { id: "direcao", nome: "Direção" },
  { id: "servicos", nome: "Serviços Gerais" },
  { id: "solicitante", nome: "Setor Solicitante" },
  { id: "almox", nome: "Almoxarifado JK" },
];

export default function App() {
  const [etapa, setEtapa] = useState("inicio");
  const [log, setLog] = useState([]);
  const [historicoAnterior, setHistoricoAnterior] = useState([]);

  useEffect(() => {
    document.body.style.backgroundColor = "#000";
    document.body.style.margin = "0";

    // Animação da seta
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes pulse {
        from { transform: translateX(-50%) scale(1); }
        to { transform: translateX(-50%) scale(1.2); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const avancar = (proxima, mensagem) => {
    setEtapa(proxima);
    setLog((prev) => [...prev, mensagem]);
  };

  const resetarFluxo = () => {
    if (log.length > 0) {
      setHistoricoAnterior(log);
    }
    setEtapa("inicio");
    setLog([]);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/22f6e30f1b9f1ae190791fef079aaabe.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: "30px",
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        Simulação do Fluxo de Suprimento de Materiais
      </h1>

      {/* SWIMLANES */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        {setores.map((s) => {
          // 🔧 Lógica corrigida: apenas UM setor ativo por vez
          const ativo =
            (s.id === "direcao" &&
              ["inicio", "limpeza", "eletronico", "equipamento", "uniforme"].includes(etapa)) ||
            (s.id === "servicos" && etapa === "pedidoServicos") ||
            (s.id === "almox" &&
              ["solicitacaoAlmox", "aguardandoEntrega", "recebeuMateriais", "faltaMateriais"].includes(etapa));

          return (
            <div
              key={s.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: ativo
                  ? "0 0 12px rgba(156,163,175,0.7)" // sombra cinza suave
                  : "0 4px 8px rgba(0,0,0,0.1)",
                minWidth: "220px",
                maxWidth: "250px",
                flex: "1 1 220px",
                textAlign: "center",
                position: "relative",
                border: ativo ? "2px solid #9ca3af" : "2px solid transparent",
                transition: "all 0.3s ease",
              }}
            >
              {/* SETA CINZA 🔽 */}
              {ativo && (
                <div
                  style={{
                    position: "absolute",
                    top: "-25px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: "24px",
                    color: "#6b7280", // cinza
                    animation: "pulse 1s infinite alternate",
                  }}
                >
                  🔽
                </div>
              )}

              <h2
                style={{
                  fontWeight: "bold",
                  marginBottom: "15px",
                  color: ativo ? "#4b5563" : "#374151",
                  fontSize: "1.2rem",
                }}
              >
                {s.nome}
              </h2>

              {/* DIREÇÃO */}
              {s.id === "direcao" && etapa === "inicio" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <button onClick={() => setEtapa("limpeza")} style={botaoEstilo("#3b82f6")}>
                    🧴 Material de Limpeza
                  </button>
                  <button onClick={() => setEtapa("eletronico")} style={botaoEstilo("#9333ea")}>
                    💻 Material Eletrônico
                  </button>
                  <button onClick={() => setEtapa("equipamento")} style={botaoEstilo("#10b981")}>
                    ⚙️ Equipamento Eletrônico
                  </button>
                  <button onClick={() => setEtapa("uniforme")} style={botaoEstilo("#f59e0b")}>
                    👕 Uniformes
                  </button>
                </div>
              )}

              {s.id === "direcao" && etapa === "limpeza" &&
                selectEtapa(
                  "Escolha o item de limpeza",
                  [
                    "Detergente e Papel Toalha",
                    "Álcool em Gel e Desinfetante",
                    "Sabonete Líquido e Pano de Chão",
                  ],
                  (item) =>
                    avancar(
                      "pedidoServicos",
                      `📌 Direção solicitou ${item} (Material de Limpeza) aos Serviços Gerais`
                    )
                )}

              {s.id === "direcao" && etapa === "eletronico" &&
                selectEtapa(
                  "Escolha o material eletrônico",
                  [
                    "Bateria e Cabo HDMI",
                    "Fonte de Energia e Carregador",
                    "Pendrive e Adaptador USB",
                  ],
                  (item) =>
                    avancar(
                      "pedidoServicos",
                      `📌 Direção solicitou ${item} (Material Eletrônico) aos Serviços Gerais`
                    )
                )}

              {s.id === "direcao" && etapa === "equipamento" &&
                selectEtapa(
                  "Escolha o equipamento eletrônico",
                  ["Monitor e Teclado", "Impressora e Scanner", "Projetor e Caixa de Som"],
                  (item) =>
                    avancar(
                      "pedidoServicos",
                      `📌 Direção solicitou ${item} (Equipamento Eletrônico) aos Serviços Gerais`
                    )
                )}

              {s.id === "direcao" && etapa === "uniforme" &&
                selectEtapa(
                  "Escolha o uniforme",
                  [
                    "Jalecos e Botas de Segurança",
                    "Camisas e Calças Padronizadas",
                    "Luvas e Toucas Descartáveis",
                  ],
                  (item) =>
                    avancar(
                      "pedidoServicos",
                      `📌 Direção solicitou ${item} (Uniformes) aos Serviços Gerais`
                    )
                )}

              {/* SERVIÇOS GERAIS */}
              {s.id === "servicos" && etapa === "pedidoServicos" && (
                <select
                  onChange={(e) => {
                    const escolha = e.target.value;
                    if (escolha) {
                      avancar("solicitacaoAlmox", `🧹 Serviços Gerais ${escolha} ao Almoxarifado`);
                    }
                  }}
                  defaultValue=""
                  style={selectStyle}
                >
                  <option value="" disabled>
                    Escolha uma ação
                  </option>
                  <option value="enviou pedido de materiais de limpeza">
                    Enviou Pedido de Materiais de Limpeza
                  </option>
                  <option value="solicitou reposição de equipamentos eletrônicos">
                    Solicitou Reposição de Equipamentos Eletrônicos
                  </option>
                  <option value="informou necessidade de compra de uniformes">
                    Informou Necessidade de Compra de Uniformes
                  </option>
                </select>
              )}

              {s.id === "servicos" && etapa === "recebeuMateriais" && (
                <p style={{ color: "#15803d", fontWeight: "bold" }}>
                  ✅ Recebeu materiais do Almoxarifado
                </p>
              )}
              {s.id === "servicos" && etapa === "faltaMateriais" && (
                <p style={{ color: "#b91c1c", fontWeight: "bold" }}>
                  ❌ Recebeu aviso de falta de materiais
                </p>
              )}

              {/* ALMOXARIFADO */}
              {s.id === "almox" && etapa === "solicitacaoAlmox" && (
                <select
                  onChange={(e) => {
                    const status = e.target.value;
                    if (status === "disponivel") {
                      avancar("recebeuMateriais", "📦 Almoxarifado entregou materiais");
                    } else if (status === "indisponivel") {
                      avancar("faltaMateriais", "⚠️ Almoxarifado informou falta de materiais");
                    } else if (status === "aguardando entrega") {
                      avancar(
                        "aguardandoEntrega",
                        "⏳ Almoxarifado informou que os materiais estão aguardando entrega"
                      );
                    }
                  }}
                  defaultValue=""
                  style={selectStyle}
                >
                  <option value="" disabled>
                    Verificar estoque
                  </option>
                  <option value="disponivel">Materiais Disponíveis</option>
                  <option value="indisponivel">Materiais Indisponíveis</option>
                  <option value="aguardando entrega">Aguardando Entrega</option>
                </select>
              )}

              {s.id === "almox" && etapa === "aguardandoEntrega" && (
                <div>
                  <p style={{ color: "#eab308", fontWeight: "bold", marginBottom: "12px" }}>
                    ⏳ Aguardando Entrega dos Materiais
                  </p>
                  <button
                    onClick={() =>
                      avancar("recebeuMateriais", "✅ Almoxarifado finalizou a entrega dos materiais")
                    }
                    style={botaoEstilo("#16a34a")}
                  >
                    Finalizar Entrega
                  </button>
                </div>
              )}

              {s.id === "almox" && (etapa === "recebeuMateriais" || etapa === "faltaMateriais") && (
                <div
                  style={{
                    marginTop: "15px",
                    paddingTop: "10px",
                    borderTop: "1px solid #d1d5db",
                    fontSize: "0.9rem",
                    color: "#4b5563",
                  }}
                >
                  🗂 Relatório atualizado no SISMAT
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* HISTÓRICO */}
      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <h3 style={{ fontWeight: "bold", marginBottom: "10px" }}>📜 Histórico do Fluxo:</h3>

        <button
          onClick={resetarFluxo}
          style={{
            ...botaoEstilo("#111"),
            marginBottom: "10px",
          }}
        >
          Resetar Fluxo
        </button>

        {log.length === 0 ? (
          <p style={{ color: "#6b7280", marginTop: "6px" }}>
            Nenhuma ação registrada nesta execução.
          </p>
        ) : (
          <ol style={{ listStyleType: "decimal", paddingLeft: "20px", textAlign: "left" }}>
            {log.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        )}

        {historicoAnterior.length > 0 && (
          <div style={{ marginTop: "25px", borderTop: "1px solid #ccc", paddingTop: "15px" }}>
            <h4 style={{ fontWeight: "bold", marginBottom: "8px" }}>📦 Último Fluxo Registrado:</h4>
            <ol style={{ listStyleType: "decimal", paddingLeft: "20px", textAlign: "left" }}>
              {historicoAnterior.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

/* ==== Funções auxiliares ==== */
const botaoEstilo = (cor) => ({
  padding: "8px 14px",
  borderRadius: "8px",
  backgroundColor: cor,
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
});

const selectStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  cursor: "pointer",
};

const selectEtapa = (placeholder, opcoes, onSelect) => (
  <select
    onChange={(e) => {
      const item = e.target.value;
      if (item) onSelect(item);
    }}
    defaultValue=""
    style={selectStyle}
  >
    <option value="" disabled>
      {placeholder}
    </option>
    {opcoes.map((op, i) => (
      <option key={i} value={op}>
        {op}
      </option>
    ))}
  </select>
);
