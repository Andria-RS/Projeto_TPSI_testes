



let usuarios = []; // Declaração global da variável

// Função para buscar os usuários do backend
function getsUsers() {
    console.log("Iniciando busca dos usuários...");
    fetch("/api/getInfoToCordenador")
        .then(response => response.json()) // Convertendo a resposta para JSON
        .then(data => {
            console.log("Dados recebidos:", data);
            usuarios = data.data || data || []; // Atualiza a variável global com os dados recebidos
            popularTabela(usuarios); // Renderiza a tabela com os dados
        })
        .catch(error => {
            console.error("Erro ao buscar os dados dos utilizadores:", error);
            alert("Não foi possível carregar os dados. Tente novamente mais tarde.");
        });
}

// Função para popular a tabela
function popularTabela(usuariosParaMostrar) {
    const tbody = document.getElementById("tabela_Search");

    if (!tbody) {
        console.error('Elemento com ID "tabela_Search" não encontrado no DOM.');
        return;
    }

    tbody.innerHTML = ""; // Limpa o conteúdo existente da tabela

    usuariosParaMostrar.forEach(usuario => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td scope="col">${usuario.id_user || "N/A"}</td>
          <td>${usuario.nome || "N/A"}</td>
          <td>${usuario.tema || "Sem Tema"}</td>
          <td>${usuario.nome_orientador || "Sem Orientador"}</td>
          <td>${usuario.estado_tese || "Sem Estado"}</td>
          <td>${usuario.data_defesa || "Sem Data"}</td>
          
        `;
        tbody.appendChild(tr);
    });

    console.log("Tabela preenchida com os usuários:", usuariosParaMostrar);
}

// Função para inicializar
document.addEventListener("DOMContentLoaded", () => {
    getsUsers(); // Chama a função que obtém os dados dos usuários
});

// Função para gerar o PDF
function gerarPDF() {
    const tabela = document.getElementById('tabela_Search');
    const rows = [];

    // Capturar os dados da tabela
    for (const row of tabela.rows) {
        const cells = row.cells;
        rows.push({
            id_user: cells[0].innerText,
            nome: cells[1].innerText,
            tema: cells[2].innerText,
            nome_orientador: cells[3].innerText,
            estado_tese: cells[4].innerText,
            data_defesa: cells[5].innerText,
        });
    }

    // Enviar os dados ao servidor
    fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rows }),
    })
        .then((response) => response.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'tabela-usuarios.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
        .catch((error) => {
            console.error('Erro ao gerar o PDF:', error);
        });
}
