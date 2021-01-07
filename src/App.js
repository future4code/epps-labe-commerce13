import React from 'react';
import './App.css';
import Home from './components/home/Home';
import Filter from './components/filter/Filter';
import Carrinho from './components/carrinho/Carrinho';
import styled from 'styled-components';
import imgCarrinho from './imagens/carrinho.png'

const Container = styled.div`
  display: grid;
  grid-template-columns: ${({ aparece }) => (aparece ? '1fr 3fr 1fr' : '1fr 3fr 1fr')};
  padding: 10px;
  gap: 20px;
  /* border:solid red 1px; */
`;
const ImagemCarrinho = styled.img`
  opacity: 50%;
  width: 3vw;
  padding:20px;
`;
const DivCarrinho = styled.div`
  position:fixed;
  right: 5vw;
  bottom: 10vh;
  border: 1px solid lightgrey;
  border-radius:50%;
`;




export default class App extends React.Component {
  state = {
    carrinhoAparece: true,
    carrinhoTeste: [ //
      {
        id: 1,
        name: "Apollo 11",
        value: 200.0,
        imageUrl: "https://picsum.photos/200/200",
        contador: 1
      },
      {
        id: 2,
        name: "Foguete",
        value: 1.0,
        imageUrl: "https://picsum.photos/200/200",
        contador: 2
      },
      {
        id: 3,
        name: "carro",
        value: 10000.0,
        imageUrl: "https://picsum.photos/200/200",
        contador: 1
      }
    ],
    precoTotal: 0,
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
      somaPreco += produto.value * produto.contador
    })
    this.setState({ precoTotal: somaPreco })
  }

  AdicionarAoCarrinho = (id) => {
    console.log('Adicionar produto com id: ', id)
    // tem que adicionar ao objeto do produto o contador = 1 se o produto é novo, ou somar contador +1 se o produto é repetido.
  }

  deletarProduto = (id) => {
    this.state.carrinhoTeste.map(produto => {

      if (produto.id === id && produto.contador > 1) {
        this.deletarProdutoRepetido(produto)

      } else if (produto.id === id && produto.contador === 1) {
        const novoArrayProdutos = this.deletarProdutoUnicoDaLista(produto.id)
        this.setState({ carrinhoTeste: novoArrayProdutos })
        console.log(this.state.carrinhoTeste)
      }
    })
    this.somarPreco()
    console.log(this.state.carrinhoTeste)
  }

  deletarProdutoUnicoDaLista = (id) => {
    const novoArray = this.state.carrinhoTeste.filter(produto => {
      return produto.id !== id
    })
    return novoArray
  }

  deletarProdutoRepetido = (produto) => {
    //copia objeto que será apagado
    const copiaObjeto = {
      ...produto,
      contador: produto.contador - 1
    }

    // deleta objeto com esse id
    const novoArray = this.deletarProdutoUnicoDaLista(produto.id)

    //da um push do mesmo objeto copiado
    novoArray.push(copiaObjeto)
    this.setState({ carrinhoTeste: novoArray })
  }


  render() {
    return (
      <Container className="container">

 
        <Filter></Filter>
        <Home></Home>
        <Carrinho
          aparece={this.state.carrinhoAparece}
          precoTotal={this.state.precoTotal}
          carrinhoTeste={this.state.carrinhoTeste}
          deletarProduto={this.deletarProduto}
          contarIds={this.contarIds}
          somarPreco={this.somarPreco}
        >
        </Carrinho>
        <DivCarrinho >
          <ImagemCarrinho onClick={() => this.aparecerCarrinho()} src={imgCarrinho}></ImagemCarrinho>
        </DivCarrinho>


      </Container>)
  }
}
