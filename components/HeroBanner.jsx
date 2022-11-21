import React from 'react'
import Link from 'next/Link'

const HerroBanner = () => {
  return (
    <div class="fixed">
        <div class="header">
            <div class="search">
                <form>
                    <input type="text" class="searchbar" placeholder="Procuro um produto ..."/>
                </form>
            </div>

            <div class="logo">
                <a href="#" class="logotext">ELECTROMOVEIS</a>
            </div>
            
            <div class="icons">
                <a href="#" class="fa fa-address-card"></a>
                <p class="name-icon">Contactos</p>
                <a href="#" class="fa fa-map-marker "></a>
                <p class="name-icon">Lojas</p>
                <a href="#" class="fa fa-shopping-cart "></a>
            </div>
        </div>
        <div class="search-v2">
            <form>
                <input type="text" class="searchbar" placeholder="Procuro um produto ..."/>
            </form>
        </div>
        <div class="drop-menus" id="navbar">
            <button class="drop-button" id="novidades">NOVIDADES</button>
            <button class="drop-button">PRODUTOS</button>
            <button class="drop-button">ESPAÇOS</button>
            <button class="drop-button special">INSPIRAÇÕES</button>
        </div>
    </div>
  )
}

export default HerroBanner