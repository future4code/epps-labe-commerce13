import React from 'react';
import './StyleFilter.css';

export default class Filter extends React.Component{
    render(){
        return <div className="Filter">
        <h1>Filtros</h1>
        <label>Valor Mínimo: </label>
        <input type="number"/>
        <label>Valor Máximo: </label>
        <input type="number"/>
        <label>Buscar Produto: </label>
        <input type="number"/>
    </div>
    }
}