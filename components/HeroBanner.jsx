import React from 'react'
import Link from 'next/Link'

const HerroBanner = () => {
  return (
    <div class="fixed" id='fixed'>
        <div class="header" id='header'>
            <div class="search">
                <form>
                    <input type="text" class="searchbar" placeholder="Procuro um produto ..."/>
                </form>
            </div>

            <div class="logo">
                <a class="logotext" href='/'>ELECTROMOVEIS</a>
            </div>
            
            <div class="icons">
                <a href="/contactos" class="fa fa-address-card"></a>
                <a href="/contactos" class="name-icon">Contactos</a>
                <a href="/lojas" class="fa fa-map-marker "></a>
                <a href="/lojas" class="name-icon">Lojas</a>
                <a href="#" class="fa fa-shopping-cart "></a>
            </div>
        </div>
        <div class="search-v2">
            <form>
                <input type="text" class="searchbar" placeholder="Procuro um produto ..."/>
            </form>
        </div>
        <div class="drop-menus" id="navbar">
            <button class="drop-button" id="novidades">NOVIDADES <img src='/static/arrow.svg' class='arrow' id='noviarrow'></img></button>
            <button class="drop-button" id="produtos">PRODUTOS <img src='/static/arrow.svg' class='arrow' id='prodarrow'></img></button>
            <button class="drop-button" id='espaços'>ESPAÇOS <img src='/static/arrow.svg' class='arrow' id='esprrow'></img></button>
            <button class="drop-button special">INSPIRAÇÕES <img src='/static/arrow.svg' class='arrow' id='inspiarrow'></img></button>
        </div>
    </div>
  )
}

export default HerroBanner