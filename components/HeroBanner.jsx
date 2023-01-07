import React from 'react'
import { useState } from 'react';
import Router from 'next/router';

const HerroBanner = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchSubmit = (event) => {
        event.preventDefault();
    
        // Redirect to the search page with the query parameter
        Router.push({
          pathname: '/search',
          query: { nome: searchQuery },
        });
    };
  return(
    <div class="fixed" id='fixed'>
        <div class="header" id='header'>
            <div class="search">
                <form class= 'form-search' onSubmit={handleSearchSubmit} >
                    <input type="text" class="searchbar" placeholder="Procuro um produto ..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/>
                    <button type="submit" class='search-btn'></button>
                </form>
            </div>

            <div class="logo">
                <a class="logotext" href='/'>ELECTROMOVEIS</a>
            </div>
            
            <div class="icons">
                <a href="/contactos" class="fa"><svg viewBox="0 0 576 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 256h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm96-96c0 35.3-28.7 64-64 64s-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64zm128-32H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg></a>
                <a href="/contactos" class="name-icon">Contactos</a>
                <a href="/lojas" class="fa"><svg viewBox="0 0 576 512"><path d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40s17.9 40 40 40z"/></svg></a>
                <a href="/lojas" class="name-icon">Lojas</a>
                <a href="#" class="fa-cart"><svg viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg></a>
            </div>
        </div>
        <div class="search-v2">
            <form class= 'form-search bar'>
                    <input type="text" class="searchbar" placeholder="Procuro um produto ..."/>
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