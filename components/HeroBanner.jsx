import React from 'react'
import { useState } from 'react';
import { AiOutlineContacts, AiOutlineShopping ,AiOutlineShop } from 'react-icons/ai';

import { Cart } from './';
import { useStateContext} from '../context/StateContext';


const HerroBanner = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { showCart, setShowCart, totalQuantities } = useStateContext();
    
  return(
    <div class="fixed" id='fixed'>
        <div class="header" id='header'>
            <div class="search">
                <form  class= 'form-search' action="/search" autocomplete="off">
                    <input type="text" name="nome" class="searchbar" placeholder="Procuro um produto ..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} required/>
                    <button type="submit" class='search-btn'></button>
                </form>
            </div>

            <div class="logo">
                <a class="logotext" href='/'>ELECTROMOVEIS</a>
            </div>
            
            <div class="icons">
                <div class='row'>
                    <a href="/contactos" class="fa"><AiOutlineContacts size={150} /></a>
                    <a href="/contactos" class="name-icon">Contactos</a>
                </div>
                <div class='row'>
                    <a href="/lojas" class="fa"><AiOutlineShop size={150} /></a>
                    <a href="/lojas" class="name-icon">Lojas</a>
                </div>
                
                <button type="button" className="cart-icon"  onClick={() => setShowCart(true)}>
                    <AiOutlineShopping />
                    {totalQuantities > 0 &&(<span className="cart-item-qty">{totalQuantities}</span>)}
                </button>

                {showCart && <Cart/>}
                
            </div>
        </div>
        <div class="search-v2">
            <form class= 'form-search bar' action="/search"  autocomplete="off">
                    <input type="text" name="nome" class="searchbar" placeholder="Procuro um produto ..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} oninvalid="this.setCustomValidity(' ')" required/>
                    <button type="submit" class='search-btn'></button>
            </form>
        </div>
        <div class="drop-menus" id="navbar">
            <button class="drop-button" id="novidades">NOVIDADES <img src='/static/arrow.svg' class='arrow' id='noviarrow'></img></button>
            <button class="drop-button" id="produtos">PRODUTOS <img src='/static/arrow.svg' class='arrow' id='prodarrow'></img></button>
            <button class="drop-button special" id='espaços'>ESPAÇOS <img src='/static/arrow.svg' class='arrow' id='esprrow'></img></button>
        </div>
    </div>
  )
}

export default HerroBanner