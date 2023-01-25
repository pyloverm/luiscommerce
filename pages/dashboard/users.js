import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";
import PocketBase from 'pocketbase';

export default function User({prod}){
    console.log(JSON.parse(prod).imagems[0])
    const pb = new PocketBase('https://poor-camera.pockethost.io');  
    const router = useRouter();
    const handleLogOut = async () => {
        const user = await axios.get("/api/auth/logout");
        router.push('/admin');
    };

    return (

    <>
        <img src={'https://poor-camera.pockethost.io/api/files/0k1ihssnl74gqqt/3x79ptn1kl6xi7b/'+ JSON.parse(prod).imagems[0]}></img>
        <div class="overlay-panel-section panel-header">
            <div class="overlay-close"><i class="ri-close-line"></i></div>
            <h4>New <strong>products</strong> record</h4>
        </div>
        <div class="overlay-panel-section panel-content">
            <div class="tabs-content">
                <form id="record_H330L" class="tab-item active">
                    <div class="form-field"><label for="field_9dARkDq"><i class="ri-text"></i> <span class="txt">ref</span></label> <textarea id="field_9dARkDq" class="svelte-1x1pbts" ></textarea> </div>
                    <div class="form-field"><label for="field_DTHvXqc"><i class="ri-calendar-line svelte-11df51y"></i> <span class="txt">date (UTC)</span></label>  <input id="field_DTHvXqc" type="text" class="flatpickr-input"/> </div>
                    <div class="form-field"><label for="field_fNE6xa0"><i class="ri-text"></i> <span class="txt">ean</span></label> <textarea id="field_fNE6xa0" class="svelte-1x1pbts" ></textarea> </div>
                    <div class="form-field"><label for="field_xg9GKam"><i class="ri-text"></i> <span class="txt">nome</span></label> <textarea id="field_xg9GKam" class="svelte-1x1pbts" ></textarea> </div>
                    <div class="form-field"><label for="field_booPunZ"><i class="ri-text"></i> <span class="txt">marca</span></label> <textarea id="field_booPunZ" class="svelte-1x1pbts" ></textarea> </div>
                    <div class="form-field"><label for="field_ZSWtEzz"><i class="ri-text"></i> <span class="txt">resumo</span></label> <textarea id="field_ZSWtEzz" class="svelte-1x1pbts" ></textarea> </div>
                    <div class="form-field"><label for="field_lxtC0Wu"><i class="ri-text"></i> <span class="txt">descricao</span></label> <textarea id="field_lxtC0Wu" class="svelte-1x1pbts" ></textarea> </div>
                    <div class="form-field"><label for="field_hf6Yz5r"><i class="ri-text"></i> <span class="txt">familia</span></label> <textarea id="field_hf6Yz5r" class="svelte-1x1pbts" ></textarea> </div>
                    <div class="form-field"><label for="field_pU1SckB"><i class="ri-text"></i> <span class="txt">subfamilia</span></label> <textarea id="field_pU1SckB" class="svelte-1x1pbts" ></textarea> </div>
                    <div class="form-field"><label for="field_DDLdAZx"><i class="ri-link"></i> <span class="txt">imagem</span></label> <input type="url" id="field_DDLdAZx"/> </div>
                    <div class="form-field"><label for="field_JGH5NCS"><i class="ri-text"></i> <span class="txt">categoria</span></label> <textarea id="field_JGH5NCS" class="svelte-1x1pbts" ></textarea> </div>
                    <div class="form-field"><label for="field_0Ln7Gre"><i class="ri-text"></i> <span class="txt">subcategoria</span></label> <textarea id="field_0Ln7Gre" class="svelte-1x1pbts" ></textarea> </div>
                    <div class="form-field form-field-toggle"><input type="checkbox" id="field_SiGpCUK"/> <label for="field_SiGpCUK">iternal_product</label> </div>
                    <div class="form-field"><label for="field_Czm0ZBb"><i class="ri-hashtag"></i> <span class="txt">preco</span></label> <input type="number" id="field_Czm0ZBb" step="any"/> </div>
                    <div class="form-field form-field-file">
                    <label for="field_TntrRtf"><i class="ri-image-line"></i> <span class="txt">imagems</span></label> 
                    <div class="files-list">
                        <div class="list-item btn-list-item"><input type="file" class="hidden" multiple=""/> <button type="button" class="btn btn-secondary btn-sm btn-block"><i class="ri-upload-cloud-line"></i> 
                            <span class="txt">Upload new file</span></button>
                        </div>
                    </div>
                    </div>
                </form>
            </div>
        </div>
        
        <div class="overlay-panel-section panel-footer">
            <button type="button" class="btn btn-secondary">
                <span class="txt">Cancel</span>
            </button>
            <button type="submit" form="record_H330L" class="btn btn-expanded">
                <span class="txt">Create</span>
            </button>
        </div>
        <button onClick={() => handleLogOut()} className="btn"> Sair </button>
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