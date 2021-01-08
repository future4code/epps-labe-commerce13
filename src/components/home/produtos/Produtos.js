import React from 'react';
import styled from 'styled-components'

const ContainerProdutos = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 5px;
    background-color: #f2f2f2;
    width: 90%;
    padding: 10px;
    border-radius: 10px;
    border: none;
`

const BoxProdutos = styled.div`
    text-align: center;
    border: solid 1px black;
    display: flex;
    flex-direction: column;
`

const ImgProduto = styled.img`
    width: 100%;
`

export default class Produtos extends React.Component{

    render(){
        const retornoFuncao = this.props.compararProdutos()
        
        /* console.log('Comparar produtos', this.props.compararProdutos()) */
        return (
            <ContainerProdutos>{retornoFuncao.map(produtos => {
                return (
                    <BoxProdutos>
                        <ImgProduto src={produtos.img} alt="img do produto"/>
                        <p>{produtos.nome}</p>
                        <p>R$ {parseFloat(produtos.valor).toFixed(2)}</p>
                        <button onClick={() => this.props.adicionarAoCarrinho(produtos.id)}>Adicionar ao Carrinho</button>
                    </BoxProdutos>
                ) 
                })}
            </ContainerProdutos>
        )
    }
}