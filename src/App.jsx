import { useState, useEffect } from "react";
import "./App.css";

const setores = [
  { id: "servicos", nome: "Serviços Gerais" },
  { id: "solicitante", nome: "Setor Solicitante" },
  { id: "almox", nome: "Almoxarifado JK" },
  { id: "direcao", nome: "Direção" },
];

const opcoesMateriais = {
  limpeza: [
    "Detergente e Papel Toalha",
    "Álcool em Gel e Desinfetante",
    "Sabonete Líquido e Pano de Chão",
  ],
  eletronico: [
    "Bateria e Cabo HDMI",
    "Fonte de Energia e Carregador",
    "Pendrive e Adaptador USB",
  ],
  equipamento: [
    "Monitor e Teclado",
    "Impressora e Scanner",
    "Projetor e Caixa de Som",
  ],
  uniforme: [
    "Jalecos e Botas de Segurança",
    "Camisas e Calças Padronizadas",
    "Luvas e Toucas Descartáveis",
  ],
};

export default function App() {
  const [etapa, setEtapa] = useState("inicioEscolha");
  const [log, setLog] = useState([]);
  const [tipoSelecionado, setTipoSelecionado] = useState(null);
  const [relatorioRecebido, setRelatorioRecebido] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "transparent";
    document.body.style.margin = "0";
  }, []);

  const avancar = (proxima, mensagem) => {
    setEtapa(proxima);
    if (mensagem) setLog((prev) => [...prev, mensagem]);
  };

  const resetarFluxo = () => {
    const confirmar = window.confirm(
      "Tem certeza que deseja resetar o fluxo? Todo o histórico será apagado."
    );
    if (confirmar) {
      setEtapa("inicioEscolha");
      setLog([]);
      setTipoSelecionado(null);
      setRelatorioRecebido(false);
    }
  };

  const voltarInicio = () => {
    const confirmar = window.confirm(
      "Tem certeza que deseja voltar à tela inicial? O fluxo atual será interrompido."
    );
    if (confirmar) setEtapa("inicioEscolha");
  };

  // Determina qual setor está ativo em cada etapa
  const setorAtivo = (() => {
    if (["pedidoLimpeza"].includes(etapa)) return "servicos";
    if (
      ["inicio", "escolhendoLimpeza", "escolhendoEletronico", "escolhendoEquipamento", "escolhendoUniforme"].includes(etapa)
    )
      return "solicitante";
    if (
      ["solicitacaoAlmox", "aguardandoEntrega", "recebeuMateriais", "faltaMateriais"].includes(etapa)
    )
      return "almox";
    if (["direcaoRelatorio"].includes(etapa)) return "direcao";
    return null;
  })();

  /* ==== Tela inicial ==== */
  if (etapa === "inicioEscolha") {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "url('/22f6e30f1b9f1ae190791fef079aaabe.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          overflow: "hidden",
          margin: 0,
          padding: "20px",
          boxSizing: "border-box",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            marginBottom: "30px",
            fontWeight: "bold",
            color: "#fff",
            textShadow: "0 2px 6px rgba(0,0,0,0.6)",
          }}
        >
          Escolha o ponto de início do fluxo:
        </h1>

        <div
          style={{
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* CARD 1 - Serviços Gerais */}
          <div style={cardEstilo("#2563eb")}>
            <h2>🧽 Serviços Gerais</h2>
            <p style={{ marginBottom: "15px" }}>
              Iniciar o fluxo com solicitação de materiais de limpeza.
            </p>
            <button
              style={botaoEstilo("#2563eb")}
              onClick={() =>
                avancar("pedidoLimpeza", "▶ Fluxo iniciado pelo setor de Serviços Gerais")
              }
            >
              Iniciar
            </button>
          </div>

          {/* CARD 2 - Setor Solicitante */}
          <div style={cardEstilo("#9333ea")}>
            <h2>🏢 Setor Solicitante</h2>
            <p style={{ marginBottom: "15px" }}>
              Iniciar o fluxo com solicitação dos quatro tipos de materiais.
            </p>
            <button
              style={botaoEstilo("#9333ea")}
              onClick={() =>
                avancar("inicio", "▶ Fluxo iniciado pelo Setor Solicitante")
              }
            >
              Iniciar
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ==== Fluxo normal ==== */
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
          marginBottom: "10px",
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        Simulação do Fluxo de Suprimento de Materiais
      </h1>

      <button
        onClick={voltarInicio}
        style={{
          ...botaoEstilo("#374151"),
          marginBottom: "20px",
          backgroundColor: "#1f2937",
        }}
      >
        ⬅️ Voltar à Tela Inicial
      </button>

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
          const ativo = s.id === setorAtivo;

          return (
            <div
              key={s.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: ativo
                  ? "0 0 12px rgba(156,163,175,0.7)"
                  : "0 4px 8px rgba(0,0,0,0.1)",
                minWidth: "220px",
                maxWidth: "300px",
                flex: "1 1 240px",
                textAlign: "center",
                position: "relative",
                border: ativo ? "2px solid #9ca3af" : "2px solid transparent",
                transition: "all 0.3s ease",
              }}
            >
              {/* Seta só aparece sobre o setor ativo */}
              {ativo && (
                <div
                  style={{
                    position: "absolute",
                    top: "-25px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: "24px",
                    color: "#6b7280",
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
                  fontSize: "1.1rem",
                }}
              >
                {s.nome}
              </h2>

              {/* Fluxo de cada setor */}
              {s.id === "servicos" && etapa === "pedidoLimpeza" && (
                <select
                  defaultValue=""
                  onChange={(e) => {
                    const item = e.target.value;
                    if (item)
                      avancar(
                        "solicitacaoAlmox",
                        `🧴 Serviços Gerais solicitou ${item} ao Almoxarifado`
                      );
                  }}
                  style={selectStyle}
                >
                  <option value="" disabled>
                    Escolha o material de limpeza
                  </option>
                  {opcoesMateriais.limpeza.map((op, i) => (
                    <option key={i} value={op}>
                      {op}
                    </option>
                  ))}
                </select>
              )}

              {s.id === "solicitante" && etapa === "inicio" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <button onClick={() => { setTipoSelecionado("limpeza"); setEtapa("escolhendoLimpeza"); }} style={botaoEstilo("#3b82f6")}>🧴 Materiais de Limpeza</button>
                  <button onClick={() => { setTipoSelecionado("eletronico"); setEtapa("escolhendoEletronico"); }} style={botaoEstilo("#9333ea")}>💻 Materiais Eletrônicos</button>
                  <button onClick={() => { setTipoSelecionado("equipamento"); setEtapa("escolhendoEquipamento"); }} style={botaoEstilo("#10b981")}>⚙️ Equipamentos Eletrônicos</button>
                  <button onClick={() => { setTipoSelecionado("uniforme"); setEtapa("escolhendoUniforme"); }} style={botaoEstilo("#f59e0b")}>👕 Uniformes</button>
                </div>
              )}

              {["escolhendoLimpeza", "escolhendoEletronico", "escolhendoEquipamento", "escolhendoUniforme"].includes(etapa) &&
                s.id === "solicitante" && (
                  <select
                    defaultValue=""
                    onChange={(e) => {
                      const item = e.target.value;
                      if (item) {
                        const tipo = tipoSelecionado;
                        const nomeTipo =
                          tipo === "limpeza"
                            ? "Materiais de Limpeza"
                            : tipo === "eletronico"
                            ? "Materiais Eletrônicos"
                            : tipo === "equipamento"
                            ? "Equipamentos Eletrônicos"
                            : "Uniformes";
                        avancar(
                          "solicitacaoAlmox",
                          `📦 Setor Solicitante solicitou ${item} (${nomeTipo}) ao Almoxarifado`
                        );
                      }
                    }}
                    style={selectStyle}
                  >
                    <option value="" disabled>
                      Escolha o item de {tipoSelecionado}
                    </option>
                    {opcoesMateriais[tipoSelecionado].map((op, i) => (
                      <option key={i} value={op}>
                        {op}
                      </option>
                    ))}
                  </select>
                )}

              {/* Almoxarifado */}
              {s.id === "almox" && etapa === "solicitacaoAlmox" && (
                <select
                  defaultValue=""
                  onChange={(e) => {
                    const status = e.target.value;
                    if (status === "disponivel")
                      avancar("recebeuMateriais", "📦 Almoxarifado: Materiais disponíveis e entregues");
                    else if (status === "indisponivel")
                      avancar("faltaMateriais", "⚠️ Almoxarifado: Materiais indisponíveis");
                    else if (status === "aguardando")
                      avancar("aguardandoEntrega", "⏳ Almoxarifado: Materiais aguardando entrega");
                  }}
                  style={selectStyle}
                >
                  <option value="" disabled>
                    Verificar estoque
                  </option>
                  <option value="disponivel">Materiais Disponíveis</option>
                  <option value="indisponivel">Materiais Indisponíveis</option>
                  <option value="aguardando">Aguardando Entrega</option>
                </select>
              )}

              {s.id === "almox" && etapa === "aguardandoEntrega" && (
                <button
                  onClick={() =>
                    avancar("recebeuMateriais", "✅ Almoxarifado finalizou a entrega")
                  }
                  style={botaoEstilo("#16a34a")}
                >
                  Finalizar Entrega
                </button>
              )}

              {s.id === "almox" &&
                ["recebeuMateriais", "faltaMateriais"].includes(etapa) && (
                  <button
                    onClick={() => {
                      const confirmar = window.confirm("Enviar relatório à Direção?");
                      if (confirmar)
                        avancar(
                          "direcaoRelatorio",
                          "📋 Almoxarifado enviou relatório do SISMAT à Direção"
                        );
                    }}
                    style={botaoEstilo("#0ea5a0")}
                  >
                    Enviar Relatório à Direção
                  </button>
                )}

              {/* Direção */}
              {s.id === "direcao" && etapa === "direcaoRelatorio" && (
                <div>
                  {!relatorioRecebido ? (
                    <button
                      onClick={() => {
                        const confirmar = window.confirm("Confirmar recebimento do relatório?");
                        if (confirmar) {
                          setRelatorioRecebido(true);
                          setLog((prev) => [
                            ...prev,
                            "✅ Direção confirmou recebimento do relatório do SISMAT",
                          ]);
                        }
                      }}
                      style={botaoEstilo("#111")}
                    >
                      Confirmar Recebimento
                    </button>
                  ) : (
                    <>
                      <p style={{ color: "#0f172a", fontWeight: "bold", marginBottom: "10px" }}>
                        ✅ Direção recebeu relatório do SISMAT
                      </p>
                      <button onClick={resetarFluxo} style={botaoEstilo("#111")}>
                        Reiniciar Fluxo
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Histórico */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "1200px",
          textAlign: "left",
        }}
      >
        <h3 style={{ fontWeight: "bold", marginBottom: "10px" }}>📜 Histórico do Fluxo:</h3>

        <button onClick={resetarFluxo} style={{ ...botaoEstilo("#111"), marginBottom: "10px" }}>
          Resetar Fluxo
        </button>

        {log.length === 0 ? (
          <p style={{ color: "#6b7280", marginTop: "6px" }}>Nenhuma ação registrada nesta execução.</p>
        ) : (
          <ol style={{ listStyleType: "decimal", paddingLeft: "20px", textAlign: "left" }}>
            {log.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

/* ==== Estilos ==== */
const cardEstilo = (cor) => ({
  backgroundColor: "#fff",
  color: "#111",
  borderRadius: "12px",
  padding: "30px",
  width: "280px",
  boxShadow: `0 0 15px ${cor}55`,
  textAlign: "center",
});

const botaoEstilo = (cor) => ({
  padding: "10px 18px",
  borderRadius: "8px",
  backgroundColor: cor,
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "1rem",
});

const selectStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  cursor: "pointer",
};
