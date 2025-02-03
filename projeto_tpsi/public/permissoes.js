// // // Função que verifica e exibe os cards corretos
// // function verificarPermissoes() {
// //     fetch("/api/tipo-utilizador")
// //         .then(response => response.json())
// //         .then(data => {
// //             const tipoUtilizador = data.tipoUtilizador; // Número recebido da API

// //             console.log("Tipo de utilizador:", tipoUtilizador);

// //             // Oculta todos os cards inicialmente
// //             document.querySelectorAll(".card").forEach(card => {
// //                 card.style.display = "none";
// //             });

// //             if (tipoUtilizador === 1) {
// //                 // Se for ADMINISTRADOR, exibe TODOS os elementos
// //                 document.querySelectorAll(".card").forEach(card => {
// //                     card.style.display = "block";
// //                 });
// //             } else {
// //                 // 🔹 Define quais classes cada tipo de usuário pode ver
// //                 const permissoes = {
// //                     4: ["cordenador", "juri"], // Permissões para 4
// //                     3: ["orientador", "juri"], // Permissões para 3
// //                     7: ["gac"],
// //                     8: ["sa"],
// //                     6: ["juri"],
// //                     5: ["juri"],
// //                     2: ["aluno"]
// //                 };

// //                 // Pega as classes permitidas para esse tipo de usuário
// //                 const classesPermitidas = permissoes[tipoUtilizador] || [];
// //                 console.log("Classes permitidas:", classesPermitidas);

// //                 // Exibe apenas os elementos da classe correta
// //                 classesPermitidas.forEach(classe => {
// //                     document.querySelectorAll(`.${classe}`).forEach(card => {
// //                         card.style.display = "block";
// //                     });
// //                 });
// //             }

            
// //         })
// //         .catch(error => console.error("Erro ao buscar tipo de utilizador:", error));
// // }

// // // Executa automaticamente quando a página carrega
// // document.addEventListener("DOMContentLoaded", verificarPermissoes);

// // // Função que pode ser chamada logo após o login
// // function aoFazerLogin() {
// //     verificarPermissoes(); // Chama a função imediatamente após o login
// // }



// function verificarPermissoes() {
//     fetch("/api/tipo-utilizador")
//         .then(response => response.json())
//         .then(data => {
//             const tipoUtilizador = data.tipoUtilizador; // Número recebido da API

//             console.log("Tipo de utilizador:", tipoUtilizador);

//             // Oculta todos os cards inicialmente
//             document.querySelectorAll(".card").forEach(card => {
//                 card.style.display = "none";
//             });

//             // Oculta todas as divs inicialmente
//             document.getElementById("coordenador_section").style.display = "none";
//             document.getElementById("orientador_section").style.display = "none";

//             if (tipoUtilizador === 1) {
//                 // Se for ADMINISTRADOR, exibe TODOS os elementos (cards e divs)
//                 document.querySelectorAll(".card").forEach(card => {
//                     card.style.display = "block";
//                 });
//                 document.getElementById("coordenador_section").style.display = "block";
//                 document.getElementById("orientador_section").style.display = "block";
//             } else {
//                 // 🔹 Define quais classes cada tipo de usuário pode ver nos cards
//                 const permissoes = {
//                     4: ["cordenador", "juri"], // Coordenador
//                     3: ["orientador", "juri"], // Orientador
//                     7: ["gac"],
//                     8: ["sa"],
//                     6: ["juri"],
//                     5: ["juri"],
//                     2: ["aluno"]
//                 };

//                 // Pega as classes permitidas para esse tipo de usuário
//                 const classesPermitidas = permissoes[tipoUtilizador] || [];
//                 console.log("Classes permitidas:", classesPermitidas);

//                 // Exibe apenas os cards corretos
//                 classesPermitidas.forEach(classe => {
//                     document.querySelectorAll(`.${classe}`).forEach(card => {
//                         card.style.display = "block";
//                     });
//                 });

//                 // Exibe a div correspondente ao tipo de utilizador sem afetar os cards
//                 if (tipoUtilizador === 4) { // Coordenador
//                     document.getElementById("coordenador_section").style.display = "block";
//                 } else if (tipoUtilizador === 3) { // Orientador
//                     document.getElementById("orientador_section").style.display = "block";
//                 }
//             }
//         })
//         .catch(error => console.error("Erro ao buscar tipo de utilizador:", error));
// }


// document.addEventListener("DOMContentLoaded", verificarPermissoes);

// // Função que pode ser chamada logo após o login
// function aoFazerLogin() {
//     verificarPermissoes(); // Chama a função imediatamente após o login
// }


function verificarPermissoesCards() {
    fetch("/api/tipo-utilizador")
        .then(response => response.json())
        .then(data => {
            const tipoUtilizador = data.tipoUtilizador;

            console.log("Tipo de utilizador:", tipoUtilizador);

            // Oculta todos os cards inicialmente
            document.querySelectorAll(".card").forEach(card => {
                card.style.display = "none";
            });

            if (tipoUtilizador === 1) {
                // Se for ADMINISTRADOR, exibe TODOS os cards
                document.querySelectorAll(".card").forEach(card => {
                    card.style.display = "block";
                });
            } else {
                // Define quais classes cada tipo de usuário pode ver nos cards
                const permissoes = {
                    4: ["cordenador", "juri"], // Coordenador
                    3: ["orientador", "juri"], // Orientador
                    7: ["gac"],
                    8: ["sa"],
                    6: ["juri"],
                    5: ["juri"],
                    2: ["aluno"]
                };

                // Pega as classes permitidas para esse tipo de usuário
                const classesPermitidas = permissoes[tipoUtilizador] || [];
                console.log("Classes permitidas:", classesPermitidas);

                // Exibe apenas os cards das classes corretas
                classesPermitidas.forEach(classe => {
                    document.querySelectorAll(`.${classe}`).forEach(card => {
                        card.style.display = "block";
                    });
                });
            }

        })
        .catch(error => console.error("Erro ao buscar tipo de utilizador:", error));
}


// Função que pode ser chamada logo após o login
function aoFazerLoginCards() {
    verificarPermissoesCards(); // Chama a função imediatamente após o login
}

function verificarPermissoesDivs() {
    fetch("/api/tipo-utilizador")
        .then(response => response.json())
        .then(data => {
            const tipoUtilizador = data.tipoUtilizador;

            console.log("Tipo de utilizador:", tipoUtilizador);

            // Oculta todas as divs inicialmente
            document.getElementById("coordenador_section").style.display = "none";
            document.getElementById("orientador_section").style.display = "none";

            if (tipoUtilizador === 1) {
                // Se for ADMINISTRADOR, exibe TODOS os elementos (divs)
                document.getElementById("coordenador_section").style.display = "block";
                document.getElementById("orientador_section").style.display = "block";
            } else {
                // Exibe as divs de acordo com o tipo de utilizador
                if (tipoUtilizador === 4) { // Coordenador
                    document.getElementById("coordenador_section").style.display = "block";
                } else if (tipoUtilizador === 3) { // Orientador
                    document.getElementById("orientador_section").style.display = "block";
                }
            }
        })
        .catch(error => console.error("Erro ao buscar tipo de utilizador:", error));
}



// Função que pode ser chamada logo após o login
function aoFazerLoginDivs() {
    verificarPermissoesDivs(); // Chama a função imediatamente após o login
}

document.addEventListener("DOMContentLoaded", function() {
    verificarPermissoesCards();  // Para os cards
    verificarPermissoesDivs();   // Para as divs
});
