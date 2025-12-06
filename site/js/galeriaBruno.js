const galeriaContainer = document.getElementById('galeria-container');
let imagens = [];
class Imagens {
    constructor(imagem, ano, descricao, tags) {
        this.nome_imagem = `../imagens/${imagem}`;
        this.ano = ano;
        this.descricao = descricao;
        this.tags = tags;

        this.criarHTML();
        this.adicionarGaleria();
        imagens.push(this);
    }

    criarHTML() {
        this.html = `
        <div class="foto-card">
            <img src="${this.nome_imagem}" alt="">
            <h3 class="foto-ano">${this.ano}</h3>
            <p class="foto-desc">${this.descricao}</p>
        </div>
        `
    }

    adicionarGaleria() {
        galeriaContainer.innerHTML += this.html;
    }
}

//           Tags (Desfiles, Alunos, Infraestrutura, Eventos)
new Imagens(
    imagem = 'EAgrotecnica.jpg',
    ano = 1999, 
    descricao = 'Várias pessoas e uma bandeirona do Brasil',
    tags = ["Alunos", "Eventos"]
);
// Faz a mesma coisa que a de cima e de baixo, porem de outra forma, se quiser deixar assim é só copiar e colar desse 'template'
new Imagens('depenandoGalinha1969 (1).jpg', 1969, 'Crianças depenando galinhas', ["Alunos"]);

new Imagens(
    imagem = 'refeitório.jpg',
    ano = 1969, 
    descricao = 'Refeitório do IFC',
    tags = ["Infraestrutura"]
);

new Imagens(
    imagem = 'inauguraçãoCampo.jpg',
    ano = 1969, 
    descricao = 'Inauguração do Campo do IFC Concórdia',
    tags = ["Infraestrutura", "Evento"]
);

new Imagens(
    imagem = 'formaturaPrimeiraTurma (1).jpg',
    ano = 1969, 
    descricao = 'Primeiro turma a se formar no IFC Concórdia',
    tags = ["Alunos", "Evento"]
);
