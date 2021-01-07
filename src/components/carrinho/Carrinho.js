import React from 'react';
import styled from 'styled-components';
import ProdutoCarrinho from '../produtoCarrinho/ProdutoCarrinho';

const CarrinhoContainer = styled.div`
    border:solid 1px black;
    min-height: 90vh;
    display: ${({ aparece }) => (aparece ? '' : 'none')};
`;
const Titulo = styled.h2`
    padding-left: 5px;
    padding-top: 10px;
    margin: 0px;
    font-weight: normal;
    font-size: 1.2rem;
    margin-bottom:2vh;
`;
const Total = styled.p`
    padding-left: 5px;
    `;

export default class Carrinho extends React.Component {
    render() {
        return (
            <CarrinhoContainer
                aparece={this.props.aparece}
            >
                <Titulo>Carrinho:</Titulo>
                {this.props.carrinhoTeste.map(produto => {
                    return <ProdutoCarrinho 
                        name={produto.name}
                        preco={produto.value}
                        id={produto.id}
                        deletarProduto={this.props.deletarProduto}
                        contador={produto.contador}
                        somarPreco ={this.props.somarPreco}            
                    >
                    </ProdutoCarrinho>
                })}
                <Total>Total: <strong>R$ {this.props.precoTotal}</strong></Total>
            </CarrinhoContainer>
        )
    }
}