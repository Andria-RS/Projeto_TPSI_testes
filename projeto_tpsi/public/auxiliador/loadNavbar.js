function loadNavbar() {
    fetch('../components/navbar.html')  // Certifique-se de que o caminho está correto
      .then(response => response.text())  // Converter a resposta para texto
      .then(data => {
        // Inserir o conteúdo da navbar no elemento com id="navbar"
        document.getElementById('navbar').innerHTML = data;
      })
      .catch(error => console.error('Error loading the navbar:', error));
  }
  
  // Aguardar o carregamento completo do DOM e então chamar a função loadNavbar
  document.addEventListener('DOMContentLoaded', function () {
    loadNavbar();  // Chama a função para carregar a navbar
  });