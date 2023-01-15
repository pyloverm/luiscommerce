
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

function gather_prods_infos(fullpdts){
    var marcas_dispo = []
    var familia_dispo = []
    var subfamilia_dispo = []
    var categoria_dispo = []
    var subcategoria_dispo = []
    var minpreco = 1000000
    var maxpreco = 0

    if(fullpdts){
    fullpdts.forEach(element => {
        if(minpreco > parseFloat(element.preco)){
            minpreco = parseFloat(element.preco);
        }else if (maxpreco <  parseFloat(element.preco)){
            maxpreco = parseFloat(element.preco);
        }
        if(!marcas_dispo.includes(element.marca)){
            marcas_dispo.push(element.marca);
        }
        if(!familia_dispo.includes(element.familia)){
            familia_dispo.push(element.familia);
        }
        if(!subfamilia_dispo.includes(element.subfamilia)){
            subfamilia_dispo.push(element.subfamilia);
        }
        if(!categoria_dispo.includes(element.categoria)){
            categoria_dispo.push(element.categoria);
        }
        if(!subcategoria_dispo.includes(element.subcategoria)){
            subcategoria_dispo.push(element.subcategoria);
        }
    });}
    return ([minpreco,maxpreco,marcas_dispo,familia_dispo,subfamilia_dispo,categoria_dispo,subcategoria_dispo])
}

const search = ({searched,query ,products,search,prods_infos}) => {
    const pb = new PocketBase('https://poor-camera.pockethost.io');
    // Use the useState hook to manage the page state variable
    const [page, setPage] = useState(1);
    const [product_list, setProduct_list] = useState(products);
    const [isLoading, setIsLoading] = useState(false);
    const [sort, setsort] = useState('')
    const [filtering, setfiltering] = useState(searched)
    const [new_prods_infos, setnew_prods_infos] = useState(prods_infos)
    const [firstrender, setfirstrender] = useState(true)
    const [filter, setfilter] = useState('')
    var marcas_dispo = new_prods_infos[2]
    var familia_dispo = new_prods_infos[3]
    var subfamilia_dispo = new_prods_infos[4]
    var categoria_dispo = new_prods_infos[5]
    var subcategoria_dispo = new_prods_infos[6]
    var minpreco = new_prods_infos[0]
    var maxpreco = new_prods_infos[1]

    function gather_prods_infos(fullpdts){
        var marcas_dispo = []
        var familia_dispo = []
        var subfamilia_dispo = []
        var categoria_dispo = []
        var subcategoria_dispo = []
        var minpreco = 1000000
        var maxpreco = 0
    
        if(fullpdts){
        fullpdts.forEach(element => {
            if(minpreco > parseFloat(element.preco)){
                minpreco = parseFloat(element.preco);
            }else if (maxpreco <  parseFloat(element.preco)){
                maxpreco = parseFloat(element.preco);
            }
            if(!marcas_dispo.includes(element.marca)){
                marcas_dispo.push(element.marca);
            }
            if(!familia_dispo.includes(element.familia)){
                familia_dispo.push(element.familia);
            }
            if(!subfamilia_dispo.includes(element.subfamilia)){
                subfamilia_dispo.push(element.subfamilia);
            }
            if(!categoria_dispo.includes(element.categoria)){
                categoria_dispo.push(element.categoria);
            }
            if(!subcategoria_dispo.includes(element.subcategoria)){
                subcategoria_dispo.push(element.subcategoria);
            }
        });}
        return ([minpreco,maxpreco,marcas_dispo,familia_dispo,subfamilia_dispo,categoria_dispo,subcategoria_dispo])
    }

    
    useEffect(() => {(
        async()=>{
            console.log('1st')
            setPage(1);
            console.log('loading page '+(page+ 1))
            // Fetch more products from the API
            
            
            if(!firstrender){
                const resultList = await pb.collection('products').getList(1, 40, {
                        filter: searched+filter,
                        sort:sort
                        });
                setProduct_list((prev) => ({
                    ...prev,
                    perPage: 40 , 
                    items: [...resultList.items],
                    }));
            }

        } 
    )()
            
            // Append the new products to the existing list
        
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

    function openSub(t) {
        const pageBottom = document.getElementById('bottom')

        console.log(document.getElementById(t).style.maxHeight)
        if(document.getElementById(t).style.maxHeight == ''){
            document.getElementById(t+'-btn').innerHTML = '-'
            document.getElementById(t).style.maxHeight = '100%';
            pageBottom.scrollIntoView({ block: 'end',  behavior: 'smooth' });
        }else{
            document.getElementById(t+'-btn').innerHTML = '+'
            console.log(document.getElementById(t).style.maxHeight)
            document.getElementById(t).style.maxHeight = '';
        };
    }
    
    async function result_filter(){
        console.log('printing results !')

        const preco_min= document.getElementById('input-preco2').value;
        const preco_max= document.getElementById('input-preco').value;
        var filter = ''
        const preco_condi = 'preco >= '+preco_min+ '&& preco <= '+ preco_max
        const marcas = document.getElementById('marca').children;
        const familias = document.getElementById('familia').children;
        const subfamilias = document.getElementById('subfamilia').children;
        const categorias = document.getElementById('categoria').children;
        const subcategorias = document.getElementById('subcategoria').children;
        var how_much_marcas = 0
        var params_num = 0
        for (let i = 0; i < marcas.length; i++) {
            if(marcas[i].children[0].checked){
                how_much_marcas += 1
                filter = filter +'('+preco_condi + '&& marca  = "'+marcas[i].children[1].innerHTML+ '" '
                for (let i = 0; i < familias.length; i++) {
                    if(familias[i].children[0].checked){
                        params_num ++ 
                        filter = filter + '&& familia  = "'+ familias[i].children[1].innerHTML+ '" '
                    };
                }
                for (let i = 0; i < subfamilias.length; i++) {
                    if(subfamilias[i].children[0].checked){
                        params_num ++ 
                        filter = filter + '&& subfamilia  = "'+ subfamilias[i].children[1].innerHTML+ '" '
                    };
                }
                for (let i = 0; i < categorias.length; i++) {
                    if(categorias[i].children[0].checked){
                        params_num ++ 
                        filter = filter + '&& categoria  = "'+ categorias[i].children[1].innerHTML+ '" '
                    };
                }
                for (let i = 0; i < subcategorias.length; i++) {
                    if(subcategorias[i].children[0].checked){
                        params_num ++ 
                        filter = filter + '&& subcategoria  = "'+ subcategorias[i].children[1].innerHTML+ '" '
                    };
                }
                filter = filter + ') || '
            };
            
        }
        if(how_much_marcas == 0 && params_num != 0 ){

            filter = filter + preco_condi
            for (let i = 0; i < familias.length; i++) {
                if(familias[i].children[0].checked){
                    filter = filter + '&& familia  = "'+ familias[i].children[1].innerHTML+ '" '
                };
            }
            for (let i = 0; i < subfamilias.length; i++) {
                if(subfamilias[i].children[0].checked){
                    filter = filter + '&& subfamilia  = "'+ subfamilias[i].children[1].innerHTML+ '" '
                };
            }
            for (let i = 0; i < categorias.length; i++) {
                if(categorias[i].children[0].checked){
                    filter = filter + '&& categoria  = "'+ categorias[i].children[1].innerHTML+ '" '
                };
            }
            for (let i = 0; i < subcategorias.length; i++) {
                if(subcategorias[i].children[0].checked){
                    filter = filter + '&& subcategoria  = "'+ subcategorias[i].children[1].innerHTML+ '" '
                };
            }
            filter += 'oui'
            
        }
        
        if (searched +'&& ('+filter.slice(0,-3)+')' != searched + '&& ()'){
            setIsLoading(true);
            setfilter('&& ('+filter.slice(0,-3)+')')
            
            const filt = searched +'&& ('+filter.slice(0,-3)+')'
            setfiltering(filt);
            setPage(1);
            console.log('loading page '+(page)+' whith filter')
            console.log('filter:')
            console.log(filt)
            // Fetch more products from the API
            var resultList =  pb.collection('products').getList(1, 40, {
            filter: filt,
            sort:sort
            });
            const items = []
            var full_list_infos = await pb.collection('productsmin').getList(1,40, {filter: filt,sort:sort});
            full_list_infos.items.forEach(element => {
                items.push(element)                
            });

            var pages = [];
            
            for (let i = 2; i <= full_list_infos.totalPages; i++) {
                pages.push(i)
            }

            let promises = pages.map(page =>  pb.collection('productsmin').getList(page,40, {filter: filt,sort:sort,'$autoCancel':false}));
            
            await Promise.all([resultList,promises]).then(values => {
                console.log("end")
                resultList = values[0]
                values[1].forEach(element => {
                    element.then(values => {values.items.forEach(elem => {items.push(elem)
                        
                    });})
                });
            })

            console.log(full_list_infos)
            console.log("tt les items")
            console.log(items)
            full_list_infos.items = items
            console.log(full_list_infos)
            const infos = gather_prods_infos(JSON.parse(JSON.stringify(items)))
            
            setnew_prods_infos(infos)
            // Append the new products to the existing list
            setProduct_list((prev) => ({
            ...prev,
            totalItems:resultList.totalItems,
            perPage: 40 , 
            items: [...resultList.items],
            }));
            setIsLoading(false);
            
        }
        closeNav();
    }

    function sort_change(){
        const select = document.getElementById('sort');
        var sort_query = select.value;
        setfirstrender(false);
        setsort(sort_query);
    }


    async function loadMore() {
        setIsLoading(true);
        // Increment the page number
        setPage(page + 1);
        console.log('loading page '+(page+ 1))
        // Fetch more products from the API

        if(filtering == ''){
            var resultList = await pb.collection('products').getList((page + 1), 40, {
                filter: searched,
                sort:sort
                });
        }else{
            var resultList = await pb.collection('products').getList((page + 1), 40, {
                filter: filtering,
                sort:sort
                });
        }

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

            {marcas_dispo.length && (
                <div class='column filter-col'>
                    <div class='row r-no-margin'>
                        <button class='bnt-open-filter'   onClick={() => openSub('marca')}>
                            <p>Marca</p>
                            <p href="javascript:void(0)" id='marca-btn' class="closebtn">+</p>
                        </button>
                    </div>
                    <div class='column filter-close' id='marca'>
                        {marcas_dispo.length  && marcas_dispo.map(marca => <div class='row row-marca'>
                            <input type="checkbox"  class='check-box'id={marca} name={marca} value={marca}/>
                            <p>{marca}</p>
                        </div>)}
                    </div>
                </div>
            )}
            {familia_dispo.length && (
                <div class='column filter-col'>
                    <div class='row r-no-margin'>
                        <button class='bnt-open-filter' onClick={() => openSub('familia')}>
                            <p>Familias</p>
                            <p href="javascript:void(0)" id='familia-btn' class="closebtn">+</p>
                        </button>
                    </div>
                    <div class='column filter-close' id='familia'>
                        {familia_dispo.length  && familia_dispo.map(familia => <div class='row row-marca'>
                            <input type="checkbox"  class='check-box'id={familia} name={familia} value={familia}/>
                            <p>{familia}</p>
                        </div>)}
                    </div>
                </div>
            )}
            {subfamilia_dispo.length && (
                <div class='column filter-col'>
                    <div class='row r-no-margin'>
                        <button class='bnt-open-filter' onClick={() => openSub('subfamilia')}>
                            <p>Subfamilia</p>
                            <p href="javascript:void(0)" id='subfamilia-btn'  class="closebtn">+</p>
                        </button>
                    </div>
                    <div class='column filter-close' id='subfamilia'>
                        {subfamilia_dispo.length  && subfamilia_dispo.map(subfamilia => <div class='row row-marca'>
                            <input type="checkbox"  class='check-box'id={subfamilia} name={subfamilia} value={subfamilia}/>
                            <p>{subfamilia}</p>
                        </div>)}
                    </div>
                </div>
            )}
            {categoria_dispo.length && (
                <div class='column filter-col'>
                    <div class='row r-no-margin'>
                        <button class='bnt-open-filter'  onClick={() => openSub('categoria')}>
                            <p>Categoria</p>
                            <p href="javascript:void(0)" id='categoria-btn' class="closebtn">+</p>
                        </button>
                    </div>
                    <div class='column filter-close' id='categoria'>
                        {categoria_dispo.length  && categoria_dispo.map(categoria => <div class='row row-marca'>
                            <input type="checkbox"  class='check-box'id={categoria} name={categoria} value={categoria}/>
                            <p>{categoria}</p>
                        </div>)}
                    </div>
                </div>
            )}
            {subcategoria_dispo.length && (
                <div class='column filter-col'>
                    <div class='row r-no-margin'>
                        <button class='bnt-open-filter'   onClick={() => openSub('subcategoria')}>
                            <p>Subcategoria</p>
                            <p href="javascript:void(0)" id='subcategoria-btn' class="closebtn">+</p>
                        </button>
                    </div>
                    <div class='column filter-close' id='subcategoria'>
                        {subcategoria_dispo.length  && subcategoria_dispo.map(subcategoria => <div class='row row-marca'>
                            <input type="checkbox"  class='check-box'id={subcategoria} name={subcategoria} value={subcategoria}/>
                            <p>{subcategoria}</p>
                        </div>)}
                    </div>
                </div>
            )}

            <div class='column filter-col'>
                <div class='row r-no-margin'>
                    <button class='bnt-open-filter' onClick={() => openSub('Preco')}>
                        <p>PRECO</p>
                        <p href="javascript:void(0)" id='Preco-btn' class="closebtn">+</p>
                    </button>
                </div>
                <div class='column filter-close' id='Preco'>
                    <div class='colmn row-marca range-slider'>
                        <input class="" type="range" min={minpreco} max={maxpreco}  defaultValue={minpreco} step="1" id='range-preco2'/>
                        <input class="" type="range" min={minpreco} max={maxpreco}  defaultValue={maxpreco} step="1" id='range-preco'/>
                    </div>
                    <div class='row row-marca input-row'>
                        <div class='after-input'>
                            <input min={minpreco} max={maxpreco} name="min"   defaultValue={minpreco} type="number" class="input-preco-txt"  id='input-preco2'/>
                            <span>€</span>
                        </div>
                        <div class='after-input'>
                            <input min={minpreco} max={maxpreco} name="max"  defaultValue={maxpreco} type="number" class="input-preco-txt" id='input-preco'/>
                            <span>€</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class='div-btn-resultado' id="bottom">
                <button  type="button" className={isLoading ? 'btn-resultados loading' : 'btn-resultados'} onClick={() => result_filter()}>
                    Ver resultados
                    <div></div>
                </button>
            </div>
            
        </aside>
        
        <div id='voile'></div>

        

        <h1 class="result-of-search">{search}</h1>
        {product_list.totalItems > 1 && (
            <div class='row space'>
                <select name="sorting" class='sorting' onChange={sort_change} id="sort" >
                    <option value="select">Ordenar</option>
                    <option value="preco">Preco</option>
                    <option value="nome">Nome</option>
                </select>
                <button class='btn-filters' onClick={() => openNav()}>Filtrar</button>
            </div>
        )}
        
        
        <p>sort is to {sort}</p>
        <div class='product-container'>
            {product_list && product_list.items.map(product => <Product data = {product}/>)}
        </div>
        {product_list.items.length < product_list.totalItems && (
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
        
        let products =  gather_products('nome ~ "'+context.query.nome+'"',pb);
        const items = []
        var full_list_infos = await pb.collection('productsmin').getList(1,40, {filter: 'nome ~ "'+context.query.nome+'"','$autoCancel':false});
        full_list_infos.items.forEach(element => {
            items.push(element)                
        });

        var pages = [];
        
        for (let i = 2; i <= full_list_infos.totalPages; i++) {
            pages.push(i)
        }

        let promises = pages.map(page =>  pb.collection('productsmin').getList(page,40, {filter: 'nome ~ "'+context.query.nome+'"','$autoCancel':false}));
        var subPromise;
        await Promise.all([products,promises]).then(values => {
            products = values[0]
            subPromise = values[1]
            values[1].forEach( element => {
                element.then(values => { 
                values.items.forEach(elem => {items.push(elem)});})});
        })
        await Promise.all(subPromise)

        let fullpdts = JSON.parse(JSON.stringify(items))
        let prods_infos =  gather_prods_infos(fullpdts)
        return {props: {searched:'nome ~ "'+context.query.nome+'"',query:context.query.nome, products, search:products.totalItems+' resultados para a sua pesquisa "'+context.query.nome+'"', prods_infos}}
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