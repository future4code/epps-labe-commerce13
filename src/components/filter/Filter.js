import React from 'react';
import './StyleFilter.css';

export default class Filter extends React.Component{
    render(){
        return <div className="Filter">
        <h1>Filtros</h1>
        <label>Valor Mínimo: </label>
        <input type="number" onChange={this.props.onChangeValueMin}/>
        <label>Valor Máximo: </label>
        <input type="number" onChange={this.props.onChangeValueMax}/>
        <label>Buscar Produto: </label>
        <input type="text" onChange={this.props.onChangeNomeProduto}/>
    </div>
    }
}