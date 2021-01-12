import React from 'react';
import styled from 'styled-components';
import Excluir from '../../imagens/excluir.jpg';
import './produtoCarrinho.css';


const ProdutoContainer = styled.li`
    border-bottom:dashed 1px black;
    padding: 0 5px;
    list-style:none;
    margin-left:0px;
    display:flex;
    justify-content: space-between;
    
`;
const Lista = styled.div`
    font-size:0.9rem;
    
`;


export default class ProdutoCarrinho extends React.Component {
    render() {
        return (
                <ProdutoContainer>
                    <Lista>
                        {this.props.produto.quantidade}x  {this.props.produto.produto.nome}
                    </Lista>
                    <div ><img onClick={() => this.props.deletarProduto(this.props.produto.produto.id)} src={Excluir} alt="img deletar produtos"></img></div>
                </ProdutoContainer>)
    }
}