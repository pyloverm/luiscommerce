import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";
import PocketBase from 'pocketbase';
import { FiTrash2 ,FiLogOut } from 'react-icons/fi';
import {AiOutlineClose} from 'react-icons/ai';
import {GrAdd} from 'react-icons/gr';
import toast from "react-hot-toast";
import { blobToURL, fromBlob } from 'image-resize-compress';
import Router from "next/router";

function User({prods}){
    const pb = new PocketBase('https://poor-camera.pockethost.io');  
    const [images, setimages] = useState([])
    const [showNew, setShowNew] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    
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
        Router.reload()
    }
    const arbogen =async(event) =>{
        setisLoading(true)
        const record = await pb.collection('structura').getFirstListItem('intern=true');
        const products = await pb.collection('products').getFullList(200 /* batch size */, {
            sort: '-created',
            filter:'iternal_product = true'
        });
        var data = record.familias
        
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

                record.familia = data
                
            });
            const u = await pb.collection('structura').update(record.id, record);
            localStorage.setItem("last_update","0")
            Router.reload()
        }else{
            record.familias = {"familia":{}}
            console.log('update ')
            console.log(record)
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
        
        const ref = event.target.ref.value;
        const ean = event.target.ean.value;
        const nome = event.target.nome.value;
        const preco = event.target.preco.value;
        const marca = event.target.marca.value;
        const familia = event.target.familia.value;
        const subfamilia = event.target.subfamilia.value;
        const categoria = event.target.categoria.value;
        const subcategoria = event.target.subcategoria.value;
        const resumo = event.target.resumo.value;
        const descricao = event.target.descricao.value;
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
                console.log(filecomp)
                console.log(element[0])
                
                return filecomp
            });
            console.log(file)
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
        const obj = await pb.collection('products').create(formData)
        const objmin = await pb.collection('productsmin').create(formDatamin)
        console.log(record.familias)
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

    return (

    <>      
        <div className="row-head">
            <h1 className="nv-prod">Novo produto</h1>
            {showNew ?  <button type="button"  className="btnform" onClick={() => setShowNew(false)}> <AiOutlineClose></AiOutlineClose> </button> : <button type="button"  className="btnform" onClick={() => setShowNew(true)}> <GrAdd></GrAdd> </button> }
        </div>

        <form className={showNew ? 'prod-form' : 'hid'} onSubmit={handleSubmit} id='myForm'>
            <ul class="form-section">
                <div className="row-form">
                    <li>
                        <label>ref<span class="form-required">*</span></label>
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
                        <select id={element + 'select'}>
                            <option >seleccionar</option>
                            <option value='test'>test</option>
                            <option value='test'>test</option>
                            <option value='test'>test</option>
                            <option value='test'>test</option>
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

                <div class="image-upload" id='admin'>
                    <input type="file" name="" id="logo" onChange={(e) => fileValue(e.currentTarget)}/>
                    <label for="logo" class="upload-field" id="file-label">
                        <div class="file-thumbnail">
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
                            <div key={image[0]} class="file-thumbnail-cont">
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
                    <button  className="btn" type="submit">additionar</button>
                </div>
            </ul>
            <button onClick={() => setShowNew(false)} className="btnform"><AiOutlineClose></AiOutlineClose></button>
        </form>
        
        <div className="product-admin-container">
            
            <div class="table-wrapper">
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
                    <tr>
                        <th>{prod.ref}</th>
                        <th>{prod.nome}</th>
                        <th>{prod.preco}</th>
                        <th>{prod.peso}</th>
                        <th>{prod.familia}</th>
                        <th>{prod.subfamilia}</th>
                        <th>{prod.categoria}</th>
                        <th>{prod.subcategoria}</th>
                        <button onClick={(e) => deleteitem(e.currentTarget)} className="btn deleteitem"><FiTrash2></FiTrash2></button>
                    </tr>)}
                </tbody>
                </table>
                </div>
        </div>
        <div className="row-center">
            {!isLoading? <button onClick={() => arbogen()} className="btn">arbo</button> : <button className="btn loading">arbo<div></div></button>}
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


    const prods = JSON.stringify(prods_list)
    console.log(prods)
    return {
        props: {prods}
      }

}

export default User



