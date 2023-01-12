
import React from 'react'
import PocketBase from 'pocketbase';
import { Product } from '../components'
import { useState,useEffect } from 'react';


async function gather_products(query,pb){
    try {
        const resultList = await pb.collection('products').getList(1, 40, {
        filter: query,
        });
        return (JSON.parse(JSON.stringify(resultList)));
    } catch (error) {
        console.error(error);
        return (null);
    }
}


const search = ({ searched,query ,products,search}) => {
    const pb = new PocketBase('https://poor-camera.pockethost.io');
    // Use the useState hook to manage the page state variable
    const [page, setPage] = useState(1);
    const [product_list, setProduct_list] = useState(products);
    const [isLoading, setIsLoading] = useState(false);
    const [sort, setsort] = useState('')

    useEffect(() => {
      (
        async () =>{
            setPage(1);
            console.log('loading page '+(page+ 1))
            // Fetch more products from the API
            const resultList = await pb.collection('products').getList((1), 40, {
            filter: searched,
            sort:sort
            });

            // Append the new products to the existing list
            setProduct_list((prev) => ({
            ...prev,
            perPage: 40 , 
            items: [...resultList.items],
            }));
        }
      )()
    }, [sort])
    
    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("voile").classList.remove('voile');
        document.getElementsByTagName("html")[0].classList.remove('no-scroll');
    }
    
    function openNav() {
        document.getElementById("voile").addEventListener('click', closeNav, false);
        console.log('opening...')
        if(document.getElementsByTagName("html")[0].offsetWidth >  1200){
            document.getElementById("mySidenav").style.width = "500px";
        }else if(document.getElementsByTagName("html")[0].offsetWidth >  700){
            document.getElementById("mySidenav").style.width = "350px";
        }else{
            document.getElementById("mySidenav").style.width = "100%";
        }
        document.getElementById("voile").classList.add('voile');
        document.getElementsByTagName("html")[0].classList.add('no-scroll');
    }

    

    

    function sort_change(sort_query){
        setsort(sort_query);
    }

    async function loadMore() {
        setIsLoading(true);
        // Increment the page number
        setPage(page + 1);
        console.log('loading page '+(page+ 1))
        // Fetch more products from the API
        const resultList = await pb.collection('products').getList((page + 1), 40, {
        filter: searched,
        sort:sort
        });

        // Append the new products to the existing list
        setProduct_list((prev) => ({
        ...prev,
        perPage: prev.perPage + 40 , 
        items: [...prev.items, ...resultList.items],
        }));

        console.log(product_list)
        setIsLoading(false);
    }

    if(!products){
        products = {
            "page": 1,
            "perPage": 40,
            "totalItems": 0,
            "totalPages": 0,
            "items": []
        }
    }
    
  return (
    <>
      <div class="placehodling-content">

        <aside id="mySidenav" class="sidenav column">
            <div class='row title-settings'>
                <p class='filtrar-por'>Filtrar por</p>
                <a href="javascript:void(0)" class="closebtn" onClick={() => closeNav()}>&times;</a>
            </div>
            
            <div class='column'>
                <div class='row'>
                    <button class='bnt-open-filter'></button>
                </div>
            </div>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
            <button id="Add_cart" type="button" class="btn-resultados">Ver resultados</button>
        </aside>
        
        <div id='voile'></div>

        <button onClick={() => openNav()}>open</button>
        <h1 class="result-of-search">{search}</h1>
        <p>sort is to {sort}</p>
        <button onClick={() => sort_change('preco')}>price sort</button>
        <select name="sorting" id="sort" >
            <option value="select">Seleccionar</option>
            <option value="preco">Preco</option>
            <option value="nome">Nome</option>
        </select>
        <button onClick={() => sort_change('nome')}>nome sort</button>
        <div class='product-container'>
            {product_list && product_list.items.map(product => <Product data = {product}/>)}
        </div>
        {products.items.length < products.totalItems && (
            <div class='load-more'>
                <p>Já viu {Object.keys(product_list.items).length} produtos de {product_list.totalItems}</p>
                <button onClick={loadMore} className={isLoading ? 'button loading' : 'button'}>
                    Mais produtos
                    <div></div>
                </button>
            </div>
        )}
      </div>
      
    </>
  )
}


export async function getServerSideProps(context) {
    
    const pb = new PocketBase('https://poor-camera.pockethost.io');
    if (context.query.nome) { 
        let products = await gather_products('nome ~ "'+context.query.nome+'"',pb);
        
        console.log(context.query.nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(new RegExp(' ', 'g'),"%").replace(/[aeiouc]/gi, '%'))
        
        if(products.totalItems > 0){
            return {props: {searched:'nome ~ "'+context.query.nome+'"',query:context.query.nome, products, search:products.totalItems+' resultados para a sua pesquisa "'+context.query.nome+'"'}}
        }
        return {props: {searched:'nome ~ "'+context.query.nome+'"',query:context.query.nome, products, search:products.totalItems+' resultado para a sua pesquisa "'+context.query.nome+'"'}}
    }
    if (context.query.subfamilia) { 
        let products = await gather_products('subfamilia = "'+context.query.subfamilia+'"',pb);
        return {props: {searched:'subfamilia = "'+context.query.subfamilia+'"',query:context.query.subfamilia, products, search:context.query.subfamilia}}
    }
    if (context.query.subcategoria) { 
        let products = await gather_products('subcategoria = "'+context.query.subcategoria+'"',pb);
        return {props: {searched:'subcategoria = "'+context.query.subcategoria+'"',query:context.query.subcategoria, products, search:context.query.subcategoria}}
    }
    return {props: {query:null, products: null , search:'0 resultado'}}       
}
export default search