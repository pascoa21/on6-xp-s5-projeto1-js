console.log('--------------------------------------')
console.log('     Projeto Carrinho de Compras     ')
console.log('--------------------------------------')

const db = require('./database')
const readline = require('readline-sync')

/*- Listar no console uma tabela contendo os produtos em ordem crescente de preço (do menor ao maior). Utilize a lista contida no arquivo `database.js`
*/

const { produtos } = db
produtos.sort((a, b) => (a.preco - b.preco))

console.table(produtos)
/*- Receber via terminal as entradas de `id` e `quantidade` dos produtos a serem adquiridos.*/
const array = new Array()

let produtId, quantdId, cupomDesc, validandoId

const carrinho = () => {

    produtId = parseInt(readline.question("Quais itens deseja adquirir? Digite o id conforme consta na tabela. "))

    for (i = 0; i < 10; i++) {
        validandoId = produtos.find(item => item.id === produtId)

        if (validandoId) {
            break
        } else {
            produtId = parseInt(readline.question("Produto não cadastrado. Digite o id novamente: "))
        }
    }

    quantdId = parseInt(readline.question("Digite a quantidade que deseja: "))


    const itensCarrinho = { ...validandoId, quantidade: quantdId }
    array.push(itensCarrinho)

    //Perguntar se a cliente possue cupom de desconto. Caso a cliente digite 10, significa que terá 10% de desconto.
    const temCumpoDesc = readline.question("Você possui cumpom de desconto? Use S (sim) e N(não) ")

    if (temCumpoDesc === 'S') {
        cupomDesc = parseInt(readline.question("Digite o valor do seu cupom: "))

        if (0 < cupomDesc < 16) {
            cupomDesc = parseInt(readline.question("Cupom inválido. Digite novamente. "))
        }
    } else { cupomDesc = 0 }

}
//Receber via terminal as entradas de `id` e `quantidade` dos produtos a serem adquiridos.
carrinho()

class Pedido {
    constructor(array) {
        this.newProducts = array
        this.date = new Date()
        this.subtotal = 0
    }

    calcularSubtotal() {
        this.subtotal = this.newProducts.reduce((acumulador, item) => acumulador + (item.preco * item.quantidade), 0)
    }

    dataPedido() {
        const formato = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        this.date = this.date.toLocaleDateString('pt-BR', formato)
    }
}

//console.log(pedido.date)

const pedido = new Pedido(array)
console.table(pedido.newProducts)


// Calcular o valor do subtotal (sem considerar o desconto)
pedido.calcularSubtotal()
console.log(`O valor do pedido é R$ ${pedido.subtotal}`)

//Calcular o valor de desconto

const desconto = ((pedido.subtotal * cupomDesc) / 100)
console.log(`O valor do desconto é R$ ${desconto.toFixed(2)}`)


//Calcular o valor total (considerando o desconto do cupom)

const final = pedido.subtotal - desconto
console.log(`O valor final é R$ ${final.toFixed(2)}`)
