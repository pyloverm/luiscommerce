import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";
import PocketBase from 'pocketbase';
import { FiTrash2 ,FiLogOut } from 'react-icons/fi';
import {AiOutlineClose , AiOutlineEdit} from 'react-icons/ai';
import {TfiReload} from 'react-icons/tfi';
import {GrAdd} from 'react-icons/gr';
import toast from "react-hot-toast";
import { blobToURL, fromBlob } from 'image-resize-compress';
import Router from "next/router";

function User({prods , arbo}){

    const pb = new PocketBase('https://poor-camera.pockethost.io');  
    const [images, setimages] = useState([])
    const [showNew, setShowNew] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [isEditing, setisEditing] = useState(false)
    const [editItemId, setEditItemId] = useState('')
    arbo = JSON.parse(arbo)
    const all_familias = []
    const all_subfamilias = []
    const all_categorias = []
    const all_subcategorias = []

    Object.keys(arbo.familias.familia).forEach(familia => {
        if(familia != '' && !(familia in all_familias)){all_familias.push(familia)}
        Object.keys(arbo.familias.familia[familia].subfamilia).forEach(subfamilia => {
            if(subfamilia != '' && !(subfamilia in all_subfamilias)){all_subfamilias.push(subfamilia)}
            Object.keys(arbo.familias.familia[familia].subfamilia[subfamilia].categoria).forEach(categoria => {
                if(categoria != '' && !(categoria in all_categorias)){all_categorias.push(categoria)}
                Object.keys(arbo.familias.familia[familia].subfamilia[subfamilia].categoria[categoria].subcategoria).forEach(subcategoria => {
                    if(subcategoria != ''  && !(subcategoria in all_subcategorias)){all_subcategorias.push(subcategoria)}
                });
            });
        });
    });

    prods = JSON.parse(prods)
    const router = useRouter();
    const handleLogOut = async () => {
        const user = await axios.get("/api/auth/logout");
        router.push('/admin');
    };

    const lines = ['marca','familia','subfamilia','categoria','subcategoria']
    const deleteitem =async(event) =>{
        const name_del = event.parentNode.getElementsByTagName("th")[1].innerHTML
        
        const record = await pb.collection('products').getFirstListItem('nome="'+name_del+'"');
        const recordmin = await pb.collection('productsmin').getFirstListItem('nome="'+name_del+'"');

        await pb.collection('products').delete(record.id)
        await pb.collection('productsmin').delete(recordmin.id)
        localStorage.setItem("last_update","0")
        Router.reload()
    }

    const edititem =async(event) =>{
        setisLoading(true)
        const name_del = event.parentNode.getElementsByTagName("th")[1].innerHTML
        const record = await pb.collection('products').getFirstListItem('nome="'+name_del+'"');
        setEditItemId(record.id)
        const input_list = ['ref','ean','nome','preco','marca','familia','subfamilia','categoria','subcategoria','resumo','descricao','peso']
        input_list.forEach(element => {
            document.getElementById(element).value = record[element]
        });

        var new_images = []
        
        await record.imagems.forEach( async(element) => {
            var image_url = 'https://poor-camera.pockethost.io/api/files/'+record.collectionId + '/' + record.id + '/' + element
            let response = await fetch(image_url);
            let data = await response.blob();
            let metadata = {
                type: 'image/webp'
            };
            let item = new File([data], element, metadata);
            new_images = [...new_images, [item,element,element]]
            setimages(new_images)
        });

        setisEditing(true)
        setShowNew(true)
        setisLoading(false)
        document.getElementById('toppage').scrollIntoView();
    }

    const arbogen =async(event) =>{
        setisLoading(true)
        const record = await pb.collection('structura').getFirstListItem('intern=true');
        const products = await pb.collection('products').getFullList(200 /* batch size */, {
            sort: '-created',
            filter:'iternal_product = true'
        });
        var data =  {"familia":{}}

        if (products.length > 0){
            products.forEach(element => {
                // If the familia is not in the data dictionary, add it as a key and create a new object as its value
                if (!data.familia.hasOwnProperty(element.familia)) {
                    data.familia[element.familia] = {subfamilia: {}}
                }

                // If the subfamilia is not in the object corresponding to the familia, add it as a key and create a new object as its value
                if (!data.familia[element.familia].subfamilia.hasOwnProperty(element.subfamilia)) {
                    data.familia[element.familia].subfamilia[element.subfamilia] = {categoria: {}}
                }

                // If the categoria is not in the object corresponding to the subfamilia, add it as a key and create a new object as its value
                if (!data.familia[element.familia].subfamilia[element.subfamilia].categoria.hasOwnProperty(element.categoria)) {
                    data.familia[element.familia].subfamilia[element.subfamilia].categoria[element.categoria] = {subcategoria: {}}
                }

                if (!data.familia[element.familia].subfamilia[element.subfamilia].categoria[element.categoria].subcategoria.hasOwnProperty(element.subcategoria)) {
                    data.familia[element.familia].subfamilia[element.subfamilia].categoria[element.categoria].subcategoria[element.subcategoria] = {}
                }

                record.familias = data
                
            });
            const u = await pb.collection('structura').update(record.id, record);
            localStorage.setItem("last_update","0")
            Router.reload()
        }else{
            record.familias = {"familia":{}}
            const  u = await pb.collection('structura').update(record.id, record);
            localStorage.setItem("last_update","0")
            Router.reload()
        }
        setisLoading(false)
    }
    const handleSubmit = async (event) => {
        setShowNew(false)
        setisLoading(true)
        event.preventDefault();
        
        const ref = event.target.ref.value.trim();
        const ean = event.target.ean.value.trim();
        const nome = event.target.nome.value.trim();
        const preco = event.target.preco.value;
        const marca = event.target.marca.value.trim();
        const familia = event.target.familia.value.trim();
        const subfamilia = event.target.subfamilia.value.trim();
        const categoria = event.target.categoria.value.trim();
        const subcategoria = event.target.subcategoria.value.trim();
        const resumo = event.target.resumo.value.trim();
        const descricao = event.target.descricao.value.trim();
        const peso = event.target.peso.value;

        const formData = new FormData();
        const formDatamin = new FormData();
        event.target.reset();
        var files = []

        await Promise.all(images.map(async (element) => {
            const quality = 80;
            const width = 0;
            const height = 0;
            const format = 'webp';
            var file = await fromBlob(element[0], quality, width, height, format).then((blob) => {
                var filecomp = new File([blob], element[1]+'.webp',{type: "image/webp"});
                return filecomp
            });
            
            formData.append('imagems', file)
        }));

        formData.append("ref", ref);
        formData.append("date", "2022-01-01 10:00:00.123Z");
        formData.append("ean", ean);
        formData.append("nome", nome);
        formData.append("marca", marca);
        formData.append("resumo", resumo);
        formData.append("descricao", descricao);
        formData.append("familia", familia);
        formData.append("subfamilia", subfamilia);
        formData.append("categoria", categoria);
        formData.append("subcategoria", subcategoria);
        formData.append("iternal_product", true);
        formData.append("preco", Number(preco));
        formData.append("peso", Number(peso));

        formDatamin.append("nome", nome);
        formDatamin.append("marca", marca);
        formDatamin.append("familia", familia);
        formDatamin.append("subfamilia", subfamilia);
        formDatamin.append("categoria", categoria);
        formDatamin.append("subcategoria", subcategoria);
        formDatamin.append("iternal_product", true);
        formDatamin.append("preco", Number(preco));

        const record = await pb.collection('structura').getFirstListItem('intern=true');



        
        const objectToCheck =  {
            "familia": familia,
            "subfamilia": subfamilia,
            "categoria": categoria,
            "subcategoria": subcategoria
        }
        
        var data = record.familias
                // If the familia is not in the data dictionary, add it as a key and create a new object as its value
        if (!data.familia.hasOwnProperty(familia)) {
            data.familia[familia] = {subfamilia: {}}
        }

        // If the subfamilia is not in the object corresponding to the familia, add it as a key and create a new object as its value
        if (!data.familia[familia].subfamilia.hasOwnProperty(subfamilia)) {
            data.familia[familia].subfamilia[subfamilia] = {categoria: {}}
        }

        // If the categoria is not in the object corresponding to the subfamilia, add it as a key and create a new object as its value
        if (!data.familia[familia].subfamilia[subfamilia].categoria.hasOwnProperty(categoria)) {
            data.familia[familia].subfamilia[subfamilia].categoria[categoria] = {subcategoria: {}}
        }

        if (!data.familia[familia].subfamilia[subfamilia].categoria[categoria].subcategoria.hasOwnProperty(subcategoria)) {
            data.familia[familia].subfamilia[subfamilia].categoria[categoria].subcategoria[subcategoria] = {}
        }

        record.familia = data
        
        document.getElementById("myForm").reset()
        setimages([])
        const u = await pb.collection('structura').update(record.id, record);

        if(editItemId != '' ) {
            const record = await pb.collection('products').getOne(editItemId)
            const ckeck2 = await pb.collection('productsmin').getFirstListItem('nome="'+record.nome+'"');

            await pb.collection('products').update(record.id, {
                'imagems': null,
            });

            await pb.collection('products').update(record.id,formData)
            
            
            await pb.collection('productsmin').update(ckeck2.id,formDatamin)
            setisEditing(false)
            setEditItemId('')

        } else {
            await pb.collection('products').create(formData)
            
            await pb.collection('productsmin').create(formDatamin)
        }

        localStorage.setItem("last_update","0")
        Router.reload()
        setisLoading(false)
        
        
      };

    function removeImgupload(item) {
        const newImages = images.filter((img) => img !== item);
        setimages(newImages)
    }
    

    function fileValue(item) {
        if(images.length > 9){
            toast.error("mais de 10 imagems !")
        }else{
            var path = item.value;
            var extenstion = path.split('.').pop();
            if(extenstion == "jpg" || extenstion == "svg" || extenstion == "jpeg" || extenstion == "png"|| extenstion == "gif"){

                var filename = path.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.');
                console.log(images.includes([item.files[0],filename,path]))
                var ine = false
                images.forEach(element => {
                    if(element[2] == path){
                        ine = true
                    }
                });
                if(!ine){
                    setimages([...images, [item.files[0],filename,path]])
                }else{
                    toast.error("ja importo esta imagem")
                }
                
            }else{
                toast.error("File nao e uma imagem.")
            }
        }
    }

    function myFunction(e) {
        document.getElementById(e.id.replace(/select/g,'')).value = e.value
    }


    return (

    <>      
        <div className="row-head" id="toppage">
            <h1 className="nv-prod">{isEditing ? 'Editar produto':'Novo produto'}</h1>
            {showNew ?  <button type="button"  className="btnform" onClick={() => setShowNew(false) & setisEditing(false)}> <AiOutlineClose></AiOutlineClose> </button> : <button type="button"  className="btnform" onClick={() => setShowNew(true)}> <GrAdd></GrAdd> </button> }
        </div>

        <form className={showNew ? 'prod-form' : 'hid'} onSubmit={handleSubmit} id='myForm'>
            <ul className="form-section">
                <div className="row-form">
                    <li>
                        <label>ref<span className="form-required">*</span></label>
                        <input type="text" id='ref' />
                    </li>
                    <li >
                        <label>ean</label>
                        <input type="text" id='ean'/>
                    </li>
                </div>
                
                <div className="row-form">
                    <li>
                        <label>nome</label>
                        <input type="text" id='nome'/>
                    </li>
                    <li>
                        <label>preço</label>
                        <input type="number"  id='preco'/>
                    </li>
                </div>
                

                {lines.map(element => <div key={element} className="row-form">
                    <li >
                        <label>{element}</label>
                        <input type="text" id={element}/>
                    </li>
                    <div className="column-form">
                        <label>{element} existente</label>
                        <select id={element + 'select'} onChange={e => myFunction(e.target)}>
                            <option >seleccionar</option>
                            {element === 'familia' && (all_familias.map( fam =>
                                <option key={fam} value={fam}>{fam}</option>
                            ))}
                             {element === 'subfamilia' && (all_subfamilias.map( subfam =>
                                <option key={subfam} value={subfam}>{subfam}</option>
                            ))}
                             {element === 'categoria' && (all_categorias.map( cat =>
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                             {element === 'subcategoria' && (all_subcategorias.map( subcat =>
                                <option key={subcat} value={subcat}>{subcat}</option>
                            ))}
                        </select>
                    </div>
                </div>)}

                <div className="row-form-unique">
                    <label>resumo</label>
                    <input type="text" id='resumo'/>
                </div>
                <div className="row-form-unique">
                    <label>descrição</label>
                    <input type="text" id='descricao'/>
                </div>

                <div className="image-upload" id='admin'>
                    <input type="file" name="" id="logo" onChange={(e) => fileValue(e.currentTarget)}/>
                    <label for="logo" className="upload-field" id="file-label">
                        <div className="file-thumbnail">
                            <img id="image-preview" src="https://www.btklsby.go.id/images/placeholder/basic.png" alt=""/>
                            <h3 id="filename">
                                Drag and Drop
                            </h3>
                            <p >Supports JPG, PNG, SVG</p>
                        </div>
                    </label>
                </div>

                <div className="images-container" id="">
                    {images.length > 0 && images.map( image =>
                            <div key={image[0]} className="file-thumbnail-cont">
                                <img id="image-preview" className="up-images" src={window.URL.createObjectURL(image[0])} alt=""/>
                                <button  type="button" className="remove-bt" onClick={() => removeImgupload(image)}><FiTrash2></FiTrash2></button>
                            </div>
                            )
                    }
                </div>
                <div className="row-form-unique">
                    <label>peso</label>
                    <input type="number" id='peso'/>
                </div>

                <div className="form-footer">
                    <button  className="btn" type="submit">{isEditing?'salvar alterações':'additionar'}</button>
                    <button type="button" onClick={() => setShowNew(false) & setisEditing(false)} className="btn">anular</button>
                </div>
            </ul>
            
        </form>
        
        <div className="product-admin-container">
            
            <div className="table-wrapper">
                <table>
                <thead>
                    <tr>
                    <th>ref</th>
                    <th>nome</th>
                    <th>preco</th>
                    <th>peso</th>
                    <th>familia</th>
                    <th>subfamilia</th>
                    <th>categoria</th>
                    <th>subcategoria</th>
                    <th className="deletesection"></th>
                    </tr>
                </thead>
                <tbody>
                    {prods.items && prods.items.map((prod) =>
                    <tr key={prod.id}>
                        <th>{prod.ref}</th>
                        <th>{prod.nome}</th>
                        <th>{prod.preco}</th>
                        <th>{prod.peso}</th>
                        <th>{prod.familia}</th>
                        <th>{prod.subfamilia}</th>
                        <th>{prod.categoria}</th>
                        <th>{prod.subcategoria}</th>
                        <button onClick={(e) => deleteitem(e.currentTarget)} className="btn deleteitem"><FiTrash2></FiTrash2></button>
                        <button onClick={(e) => edititem(e.currentTarget)} className="btn deleteitem"><AiOutlineEdit></AiOutlineEdit></button>
                    </tr>)}
                </tbody>
                </table>
                </div>
        </div>
        <div className="row-center">
            {!isLoading? <button onClick={() => arbogen()} className="btn"><TfiReload></TfiReload></button> : <button className="btn loading"><div></div></button>}
        </div>
        <button onClick={() => handleLogOut()} className="btn-logout"><FiLogOut></FiLogOut></button>
    </>
    
    )
}


export async function getServerSideProps(context) {
    
    const pb = new PocketBase('https://poor-camera.pockethost.io');
    const prods_list = await pb.collection('products').getList(1, 50,{
        sort: '-created',
        filter:'iternal_product = true'
    });

    const arbo_list = await pb.collection('structura').getFirstListItem('intern = true');

    const prods = JSON.stringify(prods_list)
    const arbo = JSON.stringify(arbo_list)

    return {
        props: {prods , arbo}
      }

}

export default User



