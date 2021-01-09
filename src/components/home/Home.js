import React from 'react';
import styled from 'styled-components'
import Produtos from './produtos/Produtos'
import HeaderProdutos from './HeaderProdutos/HeaderProdutos'

const ContainerHome = styled.div`
    /* background-color: aqua; */
    width: 100%;
    
` 

const BoxHome = styled.div`
    /* background-color: aqua; */
    display: flex;
    flex-direction: column;
    /* justify-content: space-around; */
    align-items: center;
    /* margin: 0 auto; */
    width: 100%;
`

/* const arrayProdutos = [
    {
        id: 1,
        img: 'https://picsum.photos/200/300?random=1',
        nome: 'Produto 1',
        valor: 170.00,
    },

    {
        id: 2,
        img: 'https://picsum.photos/200/300?random=2',
        nome: 'Produto 2',
        valor: 50.00, 
    },

    {
        id: 3,
        img: 'https://picsum.photos/200/300?random=3',
        nome: 'Produto 3',
        valor: 399.00, 
    },

    {
        id: 4,
        img: 'https://picsum.photos/200/300?random=4',
        nome: 'Produto 4',
        valor: 300.00, 
    },

    {
        id: 5,
        img: 'https://picsum.photos/200/300?random=5',
        nome: 'Produto 5',
        valor: 250.00, 
    },

    {
        id: 6,
        img: 'https://picsum.photos/200/300?random=6',
        nome: 'Produto 6',
        valor: 250.00, 
    },

    {
        id: 7,
        img: 'https://picsum.photos/200/300?random=7',
        nome: 'Produto 7',
        valor: 120.00, 
    },

    {
        id: 8,
        img: 'https://picsum.photos/200/300?random=8',
        nome: 'Produto 8',
        valor: 150.00, 
    }
] */

export default class Home extends React.Component{

    

    state = {
        listaProdutos: this.props.listaProdutos,
        valorSelect: ''
    }

    onChangeFiltroSelect = (e) => {
        
        const choice = e.target.value
        /* console.log('valor do select', choice) */
        this.setState({valorSelect: choice})
        
        /* console.log(this.state.valorSelect) */
    }
    

    compararProdutos = () =>{

        let listaProdutosCopia = [...this.props.listaProdutos]

        if(this.state.valorSelect === "decrescente"){
            listaProdutosCopia.sort(function(a,b){
                //return parseFloat(a.valor) < parseFloat(b.valor) ? -1 : parseFloat(a.valor) > parseFloat(b.valor) ? 1 : 0
                /* console.log('Valor a', a.valor, 'Valor b', b.valor) */
                return b.valor - a.valor

            })  
            /* console.log('Lista da função comparar produtos decrescente', listaProdutosCopia) */
        }else if(this.state.valorSelect === "crescente"){
            listaProdutosCopia.sort(function(a,b){
            //return parseFloat(a.valor) < parseFloat(b.valor) ? 1 : parseFloat(a.valor) > parseFloat(b.valor) ? -1 : 0
            /* console.log('Valor a', b.valor, 'Valor b', a.valor) */
            return a.valor - b.valor
            })
            /* console.log('Lista da função comparar produtos crescente', listaProdutosCopia) */
        } else{
            listaProdutosCopia=[...this.props.listaProdutos]
        } 
        /* console.log(listaProdutosCopia) */
        /* this.setState({order: true}) */
        return listaProdutosCopia
        
    }


    

    render(){
        /* console.log('Props', this.props.listaProdutos) */
        /* const listaProdutosAtualizada = this.compararProdutos()
        console.log('Lista produtos atualizada', listaProdutosAtualizada) */
        return (
            <ContainerHome>
                <BoxHome>

                    <HeaderProdutos
                        tamanhoLista={this.props.listaProdutos} 
                        /* listaProdutos={listaProdutosAtualizada} */ 
                        /* compararProdutos={this.compararProdutos} */
                        onChangeSelect={this.onChangeFiltroSelect}
                        valorSelect={this.state.valorSelect}
                    />
                    
                    <Produtos 
                        compararProdutos={this.compararProdutos} 
                        adicionarAoCarrinho={this.props.adicionarAoCarrinho}
                    />
                   
                </BoxHome>
                
            </ContainerHome>
        )
        
    }
}