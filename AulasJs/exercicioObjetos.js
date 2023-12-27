class carro{
    marca;
    cor;
    kmPorLitro;

    constructor(marca, cor, kmPorLitro){
        this.marca = marca;
        this.cor = cor;
        this.kmPorLitro = kmPorLitro;
    }

    calcularViagem(distancia, precoCombustivel) {
        return (distancia/this.kmPorLitro) * precoCombustivel;
    }
}

const uno = new carro('Fiat', 'Branco', 14);
const palio = new carro('Fiat', 'Prata', 11);

console.log(uno);
console.log(uno.calcularViagem(400, 5.39));

console.log(palio);
console.log(palio.calcularViagem(400, 5.39));