# Portfolio — Gabriel Medina

Site portfolio pessoal desenvolvido com HTML5, CSS3 e JavaScript puro, sem frameworks ou dependencias de build. Layout responsivo com tema claro/escuro, filtro de projetos, easter eggs e formulario de contato via `mailto`.

**Demo ao vivo:** [joseflangermann.github.io/portfolio](https://joseflangermann.github.io/portfolio)

---

## Funcionalidades

- **Tema claro/escuro** com preferencia salva no `localStorage`
- **Secao de projetos** com filtro por categoria (Design, Video, Desenvolvimento)
- **Barras de progresso animadas** nas competencias
- **Modal de zoom** para imagens dos projetos
- **Formulario de contato** que abre o cliente de email nativo com os dados preenchidos
- **Smooth scroll** customizado com easing cubico
- **Easter egg** na foto da secao "Sobre"
- **Botao WhatsApp** flutuante
- **Lazy loading** de imagens
- Totalmente **responsivo** (mobile-first)

---

## Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Estrutura | HTML5 semantico |
| Estilo | CSS3 com variaveis customizadas |
| Interatividade | JavaScript vanilla (ES6+) |
| Icones | Font Awesome 6.4 |
| Fontes | Google Fonts (Poppins + Fira Code) |
| Imagens | Cloudinary |

---

## Estrutura

```
portfolio/
├── index.html             # Estrutura e conteudo da pagina
├── portfolio.css          # Estilos e variaveis de tema
├── portfolio.js           # Logica e interatividade
├── atualizar_portfolio.bat  # Script de deploy rapido (Windows)
└── README.md
```

---

## Como rodar localmente

Nao precisa de instalacao. Basta clonar e abrir:

```bash
git clone https://github.com/JosefLangermann/portfolio.git
cd portfolio
```

Depois abra o `index.html` no navegador — ou use a extensao **Live Server** no VS Code para hot reload.

---

## Como publicar atualizacoes (Windows)

O repositorio inclui o script `atualizar_portfolio.bat` para facilitar o deploy. Ele faz automaticamente:

1. Entra na pasta do repositorio (`D:\portfolio`)
2. Adiciona todos os arquivos modificados (`git add .`)
3. Solicita a mensagem do commit
4. Faz `pull --rebase` para sincronizar com o remoto
5. Envia as alteracoes com `git push`

Para usar, basta dar dois cliques no arquivo `.bat` e digitar a mensagem do commit quando solicitado.

> O script esta configurado para o caminho `D:\portfolio`. Se voce mover a pasta, edite a linha `cd /d D:\portfolio` no arquivo.

---

## Contato

**Gabriel Medina**  
[protagonistacurriculo@gmail.com](mailto:protagonistacurriculo@gmail.com)  
[linkedin.com/in/gabriel-medina-a032272a4](https://www.linkedin.com/in/gabriel-medina-a032272a4) nao me chame aqui, eu avisei
[github.com/JosefLangermann](https://github.com/JosefLangermann)

---

Feito com HTML, CSS e JavaScript puro.

A minha vontade de viver fara a seguir.

Powered by Nature's Perversion
