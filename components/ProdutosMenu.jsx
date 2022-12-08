import React from 'react'

import { urlFor } from '../lib/client'

const ProdutosMenu = () => {
  return (
    <div class="droped" id="droped-product">
                <div class="menuprod" id="product-menu">
                    <div class="menu-link">
                            <ul class="familias">
                                <li class='familia'><a id='familia'>ELECTRÓNICA CONSUMO</a></li>
                                <li class='familia'><a id='familia'>LIVRE INSTALAÇÃO</a></li>
                                <li class='familia'><a id='familia'>ENCASTRE</a></li>
                                <li class='familia'><a id='familia'>PEQUENOS DOMÉSTICOS</a></li>
                                <li class='familia'><a id='familia'>CLIMATIZAÇÃO</a></li>
                                <li class='familia'><a id='familia'>AQUEC.ÁGUA/CENTRAL SOLAR</a></li>
                                <li class='familia'><a id='familia'>RECEPÇÃO INSTALAÇÃO TV-SAT</a></li>
                                <li class='familia'><a id='familia'>HOTEL,INDUSTRIA CONSTRUÇÃO</a></li>
                            </ul>
                            <div class='more'>
                                <div class='panel'>
                                  <ul class='list'>
                                    <ul class='sublist'>
                                      <li class='SubFamilia'><a href="">TV</a></li>
                                      <li class='valor'><a href="">LASER TV</a></li>
                                      <li class='valor'><a href="">LED</a></li>
                                      <li class='valor'><a href="">MONITORES</a></li>
                                      <li class='valor'><a href="">NANOCELL</a></li>
                                      <li class='valor'><a href="">OLED</a></li>
                                      <li class='valor'><a href="">QLED - PLANO</a></li>
                                      <li class='valor'><a href="">QNED</a></li>
                                      <li class='valor'><a href="">SUPORTES</a></li>
                                      <li class='valor'><a href="">ULED</a></li>
                                    </ul>
                                    <ul class='sublist'>
                                      <li class='SubFamilia'><a href="">AUDIO</a></li>
                                      <li class='valor'><a href="">AUSCULTADORES</a></li>
                                      <li class='valor'><a href="">COMPONENTES</a></li>
                                      <li class='valor'><a href="">HI-FI</a></li>
                                      <li class='valor'><a href="">HOME CINEMA</a></li>
                                      <li class='valor'><a href="">PORTATIL</a></li>
                                    </ul>
                                    <ul class='sublist'>
                                      <li class='SubFamilia'><a href="">VIDEO</a></li>
                                      <li class='valor'><a href="">LEITOR</a></li>
                                      <li class='valor'><a href="">ECRÃS</a></li>
                                      <li class='valor'><a href="">SUPORTES PROJ.</a></li>
                                      <li class='valor'><a href="">VIDEO</a></li>
                                    </ul>
                                    <ul class='sublist'>
                                      <li class='SubFamilia'><a href="">FILMAGEM</a></li>
                                      <li class='valor'><a href="">ACESSÓRIOS</a></li>
                                      <li class='valor'><a href="">CONSUMÍVEIS</a></li>
                                      <li>TIPO-CONSUMÍVEL</li>
                                      <li class='valor'><a href="">LÂMPADAS</a></li>
                                    </ul>
                                    <ul class='sublist'>
                                      <li class='SubFamilia'><a href="">FILMAGEM</a></li>
                                      <li class='valor'><a href="">ACESSÓRIOS</a></li>
                                      <li class='valor'><a href="">CONSUMÍVEIS</a></li>
                                      <li class='categoria'>TIPO-CONSUMÍVEL</li>
                                      <li class='valor'><a href="">LÂMPADAS</a></li>
                                    </ul>
                                  </ul>
                                </div>
                            </div>
                    </div>
                </div>
    </div>
  )
}
export default ProdutosMenu
