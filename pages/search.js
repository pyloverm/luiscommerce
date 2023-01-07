import React from 'react'
import PocketBase from 'pocketbase';
import { Product } from '../components'
import { useState } from 'react';

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
    // ...

    async function loadMore() {
        
        // Increment the page number
        setPage(page + 1);

        // Fetch more products from the API
        const resultList = await pb.collection('products').getList(page + 1, 40, {
        filter: searched,
        });

        // Append the new products to the existing list
        setProduct_list((prev) => ({
        ...prev,
        items: [...prev.items, ...resultList.items],
        }));
        console.log(products)
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
        <h1 class="result-of-search">{search}</h1>
        <div class='product-container'>
            {product_list.items.map(product => <Product data = {product}/>)}
        </div>
        {products.items.length < products.totalItems && (
            <div class='load-more'>
                <p>Já viu {Object.keys(product_list.items).length} produtos de {product_list.totalItems}</p>
                <button onClick={loadMore}>
                    Mais produtos
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