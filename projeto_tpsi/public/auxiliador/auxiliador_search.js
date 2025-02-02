

let usuariosCordenador = []; // Dados da tabela de Coordenador

// Função para buscar os usuários da API de Coordenador
function getUsersCordenador() {
    console.log("Buscando usuários para a tabela de Coordenador...");
    fetch("/api/getInfoToCordenador")
        .then(response => response.json())
        .then(data => {
            console.log("Dados recebidos para Coordenador:", data);
            usuariosCordenador = data.data || data || [];
            popularTabelaCordenador(usuariosCordenador);
        })
        .catch(error => {
            console.error("Erro ao buscar os dados para Coordenador:", error);
            alert("Não foi possível carregar os dados da tabela de Coordenador.");
        });
}

// Função para preencher a tabela de Coordenador
function popularTabelaCordenador(usuarios) {
    const tbody = document.getElementById("tabela_Search");

    if (!tbody) {
        console.error(`Tabela de Coordenador não encontrada.`);
        return;
    }

    tbody.innerHTML = "";

    usuarios.forEach(usuario => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${usuario.id_user || "N/A"}</td>
          <td>${usuario.nome || "N/A"}</td>
          <td>${usuario.tema || "Sem Tema"}</td>
        <td>${usuario.nome_orientador || "Sem Orientador"}</td> 
          <td>${usuario.estado_tese || "Sem Estado"}</td>
          <td>${usuario.data_defesa || "Sem Data"}</td>
        `;
        tbody.appendChild(tr);
    });

    console.log("Tabela de Coordenador preenchida com sucesso!");
}

// Função para gerar o PDF da tabela de Coordenador
function gerarPDFCordenador() {
    const tabela = document.getElementById("tabela_Search");
    const rows = [];

    if (!tabela) {
        console.error(`Tabela de Coordenador não encontrada.`);
        return;
    }

    for (const row of tabela.rows) {
        const cells = row.cells;
        rows.push({
            id_user: cells[0].innerText,
            nome: cells[1].innerText,
            tema: cells[2].innerText,
            nome_orientador: cells[3].innerText,
            estado_tese: cells[4].innerText,
            data_defesa: cells[5].innerText
        });
    }

    fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows }),
    })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "relatorio_coordenador.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
        .catch(error => {
            console.error("Erro ao gerar PDF de Coordenador:", error);
        });
}

// Inicializa a busca de usuários da tabela de Coordenador
document.addEventListener("DOMContentLoaded", getUsersCordenador);

let usuariosOrientador = []; // Dados da tabela de Orientador

// Função para buscar os usuários da API de Orientador
function getUsersOrientador() {
    console.log("Buscando usuários para a tabela de Orientador...");
    fetch("/api/getInfoToOrientador")
        .then(response => response.json())
        .then(data => {
            console.log("Dados recebidos para Orientador:", data);
            usuariosOrientador = data.data || data || [];
            popularTabelaOrientador(usuariosOrientador);
        })
        .catch(error => {
            console.error("Erro ao buscar os dados para Orientador:", error);
            alert("Não foi possível carregar os dados da tabela de Orientador.");
        });
}

// Função para preencher a tabela de Orientador
function popularTabelaOrientador(usuarios) {
    const tbody = document.getElementById("tabela_Search_orientador");

    if (!tbody) {
        console.error(`Tabela de Orientador não encontrada.`);
        return;
    }

    tbody.innerHTML = "";

    usuarios.forEach(usuario => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${usuario.id_user || "N/A"}</td>
          <td>${usuario.nome || "N/A"}</td>
          <td>${usuario.tema || "Sem Tema"}</td>
          <td>${usuario.nome_curso || "Sem Curso"}</td>
          <td>${usuario.estado_tese || "Sem Estado"}</td>
          <td>${usuario.data_defesa || "Sem Data"}</td>
        `;
        tbody.appendChild(tr);
    });

    console.log("Tabela de Orientador preenchida com sucesso!");
}

// Função para gerar o PDF da tabela de Orientador
function gerarPDFOrientador() {
    const tabela = document.getElementById("tabela_Search_orientador");
    const rows = [];

    if (!tabela) {
        console.error(`Tabela de Orientador não encontrada.`);
        return;
    }

    for (const row of tabela.rows) {
        const cells = row.cells;
        rows.push({
            id_user: cells[0].innerText,
            nome: cells[1].innerText,
            tema: cells[2].innerText,
            nome_curso: cells[3].innerText,
            estado_tese: cells[4].innerText,
            data_defesa: cells[5].innerText
        });
    }

    fetch("/api/generate-pdf-orientador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows }),
    })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "relatorio_orientador.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
        .catch(error => {
            console.error("Erro ao gerar PDF de Orientador:", error);
        });
}

// Inicializa a busca de usuários da tabela de Orientador
document.addEventListener("DOMContentLoaded", getUsersOrientador);


