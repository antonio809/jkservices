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

  // Garante que o body tenha fundo cinza
  useEffect(() => {
    document.body.style.backgroundColor = "#f3f4f6";
    document.body.style.margin = "0";
  }, []);

  const avancar = (proxima, mensagem) => {
    setEtapa(proxima);
    setLog((prev) => [...prev, mensagem]);
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
        justifyContent: "center", // Centraliza verticalmente na tela
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
          color: "#fff", // branco
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
          alignItems: "center", // Linha adicionada para centralizar verticalmente
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
                color: "#374151", // cinza escuro
                fontSize: "1.2rem",
              }}
            >
              {s.nome}
            </h2>

            {/* Direção */}
            {s.id === "direcao" && etapa === "inicio" && (
              <button
                onClick={() =>
                  avancar(
                    "pedidoServicos",
                    "📌 Direção solicitou material de limpeza aos Serviços Gerais"
                  )
                }
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  backgroundColor: "#111", // preto
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Solicitar Material de Limpeza
              </button>
            )}

            {/* Serviços Gerais */}
            {s.id === "servicos" && etapa === "pedidoServicos" && (
              <button
                onClick={() =>
                  avancar(
                    "solicitacaoAlmox",
                    "🧹 Serviços Gerais enviou pedido ao Almoxarifado"
                  )
                }
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  backgroundColor: "#16a34a",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Enviar Pedido ao Almoxarifado
              </button>
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
              <button
                onClick={() =>
                  avancar(
                    "solicitacaoAlmox",
                    "📝 Setor Solicitante requisitou materiais ao Almoxarifado"
                  )
                }
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  backgroundColor: "#111", // preto
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Solicitar Materiais Diversos
              </button>
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
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <p style={{ fontWeight: "500", color: "#374151" }}>⚖️ Verificar estoque...</p>
                <button
                  onClick={() =>
                    avancar("recebeuMateriais", "📦 Almoxarifado entregou materiais")
                  }
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    backgroundColor: "#16a34a",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Materiais Disponíveis
                </button>
                <button
                  onClick={() =>
                    avancar("faltaMateriais", "⚠️ Almoxarifado informou falta de materiais")
                  }
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    backgroundColor: "#b91c1c",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Materiais Indisponíveis
                </button>
              </div>
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
        {log.length === 0 ? (
          <p style={{ color: "#6b7280" }}>Nenhuma ação registrada ainda.</p>
        ) : (
          <ul style={{ listStyleType: "disc", paddingLeft: "20px", textAlign: "left", gap: "5px" }}>
            {log.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
