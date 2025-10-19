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
      {/* Título */}
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

      {/* Swimlanes */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {setores.map((s) => (
          <div
            key={s.id}
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              minWidth: "180px",
              maxWidth: "220px",
              flex: "1 1 220px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontWeight: "bold",
                marginBottom: "15px",
                color: "#374151",
                fontSize: "1.2rem",
              }}
            >
              {s.nome}
            </h2>

            {/* Direção */}
            {s.id === "direcao" && etapa === "inicio" && (
              <select
                onChange={(e) => {
                  const escolha = e.target.value;
                  if (escolha) {
                    avancar(
                      "pedidoServicos",
                      `📌 Direção solicitou ${escolha} aos Serviços Gerais`
                    );
                  }
                }}
                defaultValue=""
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
              >
                <option value="" disabled>
                  Escolha um tipo de material
                </option>
                <option value="material de limpeza">Material de Limpeza</option>
                <option value="material de escritório">Material de Escritório</option>
                <option value="equipamento eletrônico">Equipamento Eletrônico</option>
                <option value="uniformes">Uniformes</option>
              </select>
            )}

            {/* Serviços Gerais */}
            {s.id === "servicos" && etapa === "pedidoServicos" && (
              <select
                onChange={(e) => {
                  const escolha = e.target.value;
                  if (escolha) {
                    avancar(
                      "solicitacaoAlmox",
                      `🧹 Serviços Gerais ${escolha} ao Almoxarifado`
                    );
                  }
                }}
                defaultValue=""
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
              >
                <option value="" disabled>
                  Escolha uma ação
                </option>
                <option value="enviou pedido">Enviou Pedido</option>
                <option value="solicitou reposição de estoque">
                  Solicitou Reposição de Estoque
                </option>
                <option value="informou necessidade de compra">
                  Informou Necessidade de Compra
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

            {/* Setor Solicitante */}
            {s.id === "solicitante" && etapa === "inicio" && (
              <select
                onChange={(e) => {
                  const pedido = e.target.value;
                  if (pedido) {
                    avancar(
                      "solicitacaoAlmox",
                      `📝 Setor Solicitante requisitou ${pedido} ao Almoxarifado`
                    );
                  }
                }}
                defaultValue=""
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
              >
                <option value="" disabled>
                  Selecione uma opção
                </option>
                <option value="materiais de limpeza">Materiais de Limpeza</option>
                <option value="papel A4 e canetas">Papel A4 e Canetas</option>
                <option value="cartucho de impressora">Cartucho de Impressora</option>
                <option value="álcool e desinfetante">Álcool e Desinfetante</option>
              </select>
            )}
            {s.id === "solicitante" && etapa === "recebeuMateriais" && (
              <p style={{ color: "#15803d", fontWeight: "bold" }}>
                📦 Recebeu materiais solicitados
              </p>
            )}
            {s.id === "solicitante" && etapa === "faltaMateriais" && (
              <p style={{ color: "#b91c1c", fontWeight: "bold" }}>
                ❌ Recebeu aviso de falta de materiais
              </p>
            )}

            {/* Almoxarifado */}
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
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
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
              <p style={{ color: "#eab308", fontWeight: "bold" }}>
                ⏳ Aguardando Entrega dos Materiais
              </p>
            )}

            {/* Relatório SISMAT */}
            {s.id === "almox" &&
              (etapa === "recebeuMateriais" || etapa === "faltaMateriais") && (
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
        ))}
      </div>

      {/* Histórico */}
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
            marginBottom: "20px",
            padding: "8px 16px",
            borderRadius: "8px",
            backgroundColor: "#111",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Resetar Fluxo
        </button>

        {/* Histórico Atual */}
        {log.length === 0 ? (
          <p style={{ color: "#6b7280" }}>Nenhuma ação registrada nesta execução.</p>
        ) : (
          <ol style={{ listStyleType: "decimal", paddingLeft: "20px", textAlign: "left" }}>
            {log.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        )}

        {/* Histórico Anterior */}
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
