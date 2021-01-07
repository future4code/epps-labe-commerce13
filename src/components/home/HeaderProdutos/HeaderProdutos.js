import React from 'react';
import styled from 'styled-components'

const BoxProdutosHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f2f2f2;
    width: 90%;
    height: 10vh;
    margin-bottom: 15px;
    border-radius: 10px;
    padding: 10px;
`

const SelectProdutos = styled.select`
    height: 25px;
`

const PaddingItens = styled.div`
    padding: 10px;
`

export default class Produtos extends React.Component{

    

    render(){
        
        
        
        return (
            
            <BoxProdutosHeader>
                <PaddingItens>
                    <p>Quantidade de Produtos: {this.props.tamanhoLista.length}</p>
                </PaddingItens>
                

                <PaddingItens>
                    <SelectProdutos value={this.props.valorSelect} onChange={this.props.onChangeSelect}>
                        <option value="noFilter">Sem filtro</option>
                        <option value="crescente">Preço: Crescente</option>
                        <option value="decrescente">Preço: Decrescente</option>
                    </SelectProdutos>
                </PaddingItens>
                
            </BoxProdutosHeader>
        )
    }
}