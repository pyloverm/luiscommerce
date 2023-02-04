import React from 'react'
import { useState } from 'react';
import { AiOutlineContacts, AiOutlineShopping ,AiOutlineShop } from 'react-icons/ai';

import { Cart } from './';
import { useStateContext} from '../context/StateContext';


const HerroBanner = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { showCart, setShowCart, totalQuantities } = useStateContext();
    
  return(
    <div className="fixed" id='fixed'>
        <div className="header" id='header'>
            <div className="search">
                <form  className= 'form-search' action="/search" autocomplete="off">
                    <input type="text" name="nome" className="searchbar" placeholder="Procuro um produto ..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} required/>
                    <button type="submit" className='search-btn'></button>
                </form>
            </div>

            <div className="logo">
                <a className="logotext" href='/'>ELECTROMOVEIS</a>
            </div>
            
            <div className="icons">
                <div className='row'>
                    <a href="/contactos" className="fa"><AiOutlineContacts size={150} /></a>
                    <a href="/contactos" className="name-icon">Contactos</a>
                </div>
                <div className='row'>
                    <a href="/lojas" className="fa"><AiOutlineShop size={150} /></a>
                    <a href="/lojas" className="name-icon">Lojas</a>
                </div>
                
                <button type="button" className="cart-icon"  onClick={() => setShowCart(true)}>
                    <AiOutlineShopping />
                    {totalQuantities > 0 &&(<span className="cart-item-qty">{totalQuantities}</span>)}
                </button>

                {showCart && <Cart/>}
                
            </div>
        </div>
        <div className="search-v2">
            <form className= 'form-search bar' action="/search"  autocomplete="off">
                    <input type="text" name="nome" className="searchbar" placeholder="Procuro um produto ..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} oninvalid="this.setCustomValidity(' ')" required/>
                    <button type="submit" className='search-btn'></button>
            </form>
        </div>
        <div className="drop-menus" id="navbar">
            <button className="drop-button" id="moveis">MOVEIS<img src='/static/arrow.svg' className='arrow' id='moveisarrow'></img></button>
            <button className="drop-button" id="elcetromoveis">ELECTROMOVEIS<img src='/static/arrow.svg' className='arrow' id='elctromoveisarrow'></img></button>
            <button className="drop-button special" id='espaços'>ESPAÇOS<img src='/static/arrow.svg' className='arrow' id='esprrow'></img></button>
        </div>
    </div>
  )
}

export default HerroBanner