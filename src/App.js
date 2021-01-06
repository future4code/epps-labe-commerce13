import React from 'react';
import './App.css';
import Home from './components/home/Home';
import Filter from './components/filter/Filter';
import Carrinho from './components/carrinho/Carrinho';



export default class App extends React.Component{
  render(){
      return (
      <div>
        <Filter></Filter>
        <Home></Home>
        <Carrinho></Carrinho>
      </div>)
  }
}
