import React from 'react';
import './App.css';
import Home from './components/home/Home';
import Filter from './components/filter/Filter';
import Carrinho from './components/carrinho/Carrinho';
import styled from 'styled-components';
import imgCarrinho from './imagens/carrinho.png'

const Container = styled.div`
 /*  display: grid;
  grid-template-columns: ${({ aparece }) => (aparece ? '1fr 3fr 1fr' : '1fr 3fr')}; */
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
    carrinhoAparece: false,
    carrinhoTeste: [],
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
      somaPreco += produto.valor 
    })
    this.setState({ precoTotal: somaPreco })
  }

  adicionarAoCarrinho = (id) => {
    
    const arrayTesteCarrinho = [...this.state.carrinhoTeste]
    // tem que adicionar ao objeto do produto o contador = 1 se o produto é novo, ou somar contador +1 se o produto é repetido.
    this.state.listaProdutos.map((produto) => {
      console.log('Produtos', produto)
      if(produto.id === id && produto.contador === 0){
        const contadorTeste = produto.contador + 1
        console.log('contador teste', contadorTeste)
        const objetoTeste = {
          id: produto.id,
          nome: produto.nome,
          valor: produto.valor,
          contador: contadorTeste 
        }
        arrayTesteCarrinho.push(objetoTeste)

        console.log('arrayTesteCarrinho', arrayTesteCarrinho) 
      } else if(produto.id === id && produto.contador > 0){
        /* arrayTesteCarrinho = this.deletarProdutoUnicoDaLista(produto.id)
        const objetoTeste = {
          id: produto.id,
          nome: produto.nome,
          valor: produto.valor,
          contador: produto.contador + 1
        }
        console.log('Obejeto teste',objetoTeste)
        arrayTesteCarrinho.push() */
        console.log('Entrei no eslse')
      }
    })
    this.setState({carrinhoTeste: arrayTesteCarrinho})
    console.log('Carrinho teste',this.state.carrinhoTeste)
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

    console.log('Lista produtos app', this.state.listaProdutos)
    console.log('Preço total', this.state.precoTotal) 
   
    return (
      <Container className="container">

 
        <Filter></Filter>
        <Home
          listaProdutos={this.state.listaProdutos}
          adicionarAoCarrinho={this.adicionarAoCarrinho}
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
