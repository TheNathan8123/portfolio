// Funcao trocar pagina
    function mostrarSecao(secaoId) {
      document.querySelectorAll('main > section').forEach(sec => {
        if (sec.id === secaoId) {
          sec.classList.add('ativa');
        } else {
          sec.classList.remove('ativa');
        }
      });
    }

//Funcao Zoom
    document.addEventListener("DOMContentLoaded", () => {
      const modal = document.createElement("div");
      modal.classList.add("img-modal");
      document.body.appendChild(modal);

      const img = document.createElement("img");
      modal.appendChild(img);

      // Abrir imagem
      document.querySelectorAll(".zoom-img").forEach((thumb) => {
        thumb.addEventListener("click", () => {
          img.src = thumb.src;
          modal.classList.add("active");
        });
      });

      // Fechar modal ao clicar fora
      modal.addEventListener("click", () => {
        modal.classList.remove("active");
        img.src = "";
      });
    });