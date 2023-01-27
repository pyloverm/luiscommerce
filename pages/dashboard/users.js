import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";
import PocketBase from 'pocketbase';
import { FiTrash2 } from 'react-icons/fi';
import {AiOutlineClose} from 'react-icons/ai';
import {GrAdd} from 'react-icons/gr';
import toast from "react-hot-toast";

export default function User({prod}){
    console.log(JSON.parse(prod).imagems[0])
    const pb = new PocketBase('https://poor-camera.pockethost.io');  
    const [images, setimages] = useState([])
    const [showNew, setShowNew] = useState(false)

    const router = useRouter();
    const handleLogOut = async () => {
        const user = await axios.get("/api/auth/logout");
        router.push('/admin');
    };
    const lines = ['marca','familia','subfamilia','categoria','subcategoria']

    const handleSubmit = (event) => {
        setShowNew(false)
        event.preventDefault();
        document.getElementById("myForm").reset()
        setimages([])
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
        
        const imagem = event.target.logo.value;

        const obj = {'ref' : ref ,'ean' : ean ,'nome' : nome ,
        'preco' : preco ,'marca' : marca ,'familia' : familia ,
        'subfamilia' : subfamilia ,'categoria' : categoria ,
        'subcategoria' : subcategoria ,'resumo' : resumo ,
         'descricao' : descricao , 'peso' : peso , 'imagems' : images }
        console.log(obj);
        console.log(marcaselect)
        event.target.reset();
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
                        <label> seleccionar uma {element} existente </label>
                        <select id={element + 'select'}>
                            <option >Veuillez sélectionner</option>
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

                <div className="row-form-unique">
                    <label>imagem</label>
                    <input type="file" multiple id='imagem' accept="image/png, image/jpg, image/gif, image/jpeg"/>
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
        <button onClick={() => handleLogOut()} className="btn">Sair</button>
    </>
    
    )
}

export async function getServerSideProps() {
    const pb = new PocketBase('https://poor-camera.pockethost.io'); 
    var prod = await pb.collection('products').getFirstListItem('nome = "testimage"') 
    console.log(prod)
    prod = JSON.stringify(prod)
    return {props:{prod}}
}






