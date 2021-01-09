import React from 'react';
import './App.css';
import Home from './components/home/Home';
import Filter from './components/filter/Filter';
import Carrinho from './components/carrinho/Carrinho';
import styled from 'styled-components';
import imgCarrinho from './imagens/carrinho.png'

const Container = styled.div`
display: flex;
 /*  display: grid;
  grid-template-columns: ${({ aparece }) => (aparece ? '1fr 3fr 1fr' : '1fr 3fr')}; */
  /* padding: 10px;
  gap: 20px; */
  /* border:solid red 1px; */
`;
const ImagemCarrinho = styled.img`
  opacity: 50%;
  width: 3vw;
  padding:20px;
`;
const DivCarrinho = styled.div`
  position:fixed;
  right: 1vw;
  bottom: 10vh;
  border: 1px solid black;
  border-radius:50%;
`;

const arrayProdutos = [
  {
    id: 1,
    img: 'https://picsum.photos/200/300?random=1',
    nome: 'Produto 1',
    valor: 170.00,
    contador: 0
  },

  {
    id: 2,
    img: 'https://picsum.photos/200/300?random=2',
    nome: 'Produto 2',
    valor: 50.00,
    contador: 0
  },

  {
    id: 3,
    img: 'https://picsum.photos/200/300?random=3',
    nome: 'Produto 3',
    valor: 399.00,
    contador: 0
  },

  {
    id: 4,
    img: 'https://picsum.photos/200/300?random=4',
    nome: 'Produto 4',
    valor: 300.00,
    contador: 0
  },

  {
    id: 5,
    img: 'https://picsum.photos/200/300?random=5',
    nome: 'Produto 5',
    valor: 250.00,
    contador: 0
  },

  {
    id: 6,
    img: 'https://picsum.photos/200/300?random=6',
    nome: 'Produto 6',
    valor: 250.00,
    contador: 0
  },

  {
    id: 7,
    img: 'https://picsum.photos/200/300?random=7',
    nome: 'Produto 7',
    valor: 120.00,
    contador: 0
  },

  {
    id: 8,
    img: 'https://picsum.photos/200/300?random=8',
    nome: 'Produto 8',
    valor: 150.00,
    contador: 0
  }
]

export default class App extends React.Component {
  state = {
    listaProdutos: [...arrayProdutos],
    listaId: [],
    carrinhoAparece: false,
    carrinhoTeste: [],
    precoTotal: 0,
    valueMin: 0,
    valueMax: Infinity,
    valueNomeProduto: '',
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.carrinhoTeste !== this.state.carrinhoTeste) {
      this.somarPreco()
    }

  }

  componentDidMount() {
    this.somarPreco()
  };

  aparecerCarrinho = () => {
    this.setState({ carrinhoAparece: !this.state.carrinhoAparece })
  }

  somarPreco = () => {
    let somaPreco = 0
    this.state.carrinhoTeste.map(produto => {
      somaPreco += produto.quantidade * produto.produto.valor
    })
    this.setState({ precoTotal: somaPreco })
  }

  verificarPeloValor = (valorMin= this.state.valueMin, valorMax= this.state.valorMax, valorNomeProduto=this.state.valueNomeProduto) => {
    const listaFiltrada = arrayProdutos.filter((produto) => {

      return produto.valor > valorMin
     
    }).filter((produto) => {

      return produto.valor < valorMax

    }).filter((produto) => {
      const nomeProduto = produto.nome.toLowerCase()
      return nomeProduto.includes(valorNomeProduto.toLowerCase())
        
    })
    
    this.setState({listaProdutos: listaFiltrada})
    console.log('Lista valor: ', listaFiltrada)
    console.log('Lista produtos', this.state.listaProdutos)
    return listaFiltrada
    
  }
   
  

  /* verificarPeloMax = (valor) => {
    const lista = this.state.listaProdutos.filter((produto) => {
      if (produto.valor < valor) {
        return true
      } else {
        return false
      }
    })
    console.log('Lista valor máximo', lista)
  } */



  onChangeValueMin = (e) => {
    this.setState({
      valueMin: e.target.value
    })
    this.verificarPeloValor(e.target.value, Infinity, this.state.valueNomeProduto)
  }

  onChangeValueMax = (e) => {
    if(e.target.value){
      this.setState({
        valueMax: e.target.value
      })
      this.verificarPeloValor(this.state.valueMin, e.target.value, this.state.valueNomeProduto)
    } else {
      this.setState({
        valueMax: Infinity
      })
      this.verificarPeloValor(this.state.valueMin, Infinity, this.state.valueNomeProduto)
    }
    
    
  }

  onChangeNomeProduto = (e) => {
    this.setState({
      valueNomeProduto: e.target.value
    })
    this.verificarPeloValor(this.state.valueMin, this.state.valueMax, e.target.value)
  }

  adicionarAoCarrinho = (produto) => {
    const novoCarro = this.state.carrinhoTeste
    //pegando o índice do produto
    const indiceDoProduto = this.state.carrinhoTeste.findIndex((item) => item.produto.id === produto.id)
    //verificando se indice do produto é maior que -1
    if (indiceDoProduto > -1) {
      //aqui a quantidade do item do array é somada
      novoCarro[indiceDoProduto].quantidade += 1
    } else {
      //aqui eles tão dando push e criando um array que tem product e uma variável quantity e setando como 1.
      novoCarro.push({ produto: produto, quantidade: 1 })
    }
    this.somarPreco()
  }


  deletarProduto = (id) => {

    this.state.carrinhoTeste.map(produto => {

      /* if (produto.produto.id === id && produto.quantidade > 1) {
        this.deletarProdutoRepetido(produto)

      } else if (produto.produto.id === id && produto.quantidade === 1)
       { */
      const novoArrayProdutos = this.deletarProdutoUnicoDaLista(/* produto.produto. */id)
      this.setState({ carrinhoTeste: novoArrayProdutos })
      /* } */
    })
    this.somarPreco()
  }

  deletarProdutoUnicoDaLista = (id) => {
    const novoArray = this.state.carrinhoTeste.filter(produto => {
      return produto.produto.id !== id
    })
    return novoArray
  }

  deletarProdutoRepetido = (produto) => {
    //copia objeto que será apagado
    const copiaObjeto = {
      ...produto,
      quantidade: produto.quantidade - 1
    }

    // deleta objeto com esse id
    const novoArray = this.deletarProdutoUnicoDaLista(produto.produto.id)

    //da um push do mesmo objeto copiado
    novoArray.push(copiaObjeto)
    this.setState({ carrinhoTeste: novoArray })
  }


  render() {
    console.log('valor mínimo: ', this.state.valueMin)
    console.log('Valor máximo: ', this.state.valueMax)
    console.log('Nome do produto: ', this.state.valueNomeProduto)
    
    

    return (
      <Container className="container">


        <Filter
          onChangeValueMax={this.onChangeValueMax}
          onChangeValueMin={this.onChangeValueMin}
          onChangeNomeProduto={this.onChangeNomeProduto}
        />
          
        <Home
          listaProdutos={this.state.listaProdutos}
          adicionarAoCarrinho={this.adicionarAoCarrinho}
          verificarPeloValor={this.verificarPeloValor}
        />

        {this.state.carrinhoAparece && <Carrinho
          aparece={this.state.carrinhoAparece}
          precoTotal={this.state.precoTotal}
          carrinhoTeste={this.state.carrinhoTeste}
          deletarProduto={this.deletarProduto}
          contarIds={this.contarIds}
          somarPreco={this.somarPreco}
        >
        </Carrinho>}

        <DivCarrinho >
          <ImagemCarrinho onClick={() => this.aparecerCarrinho()} src={imgCarrinho} alt="img btn carrinho"></ImagemCarrinho>
        </DivCarrinho>


      </Container>)
  }
}
