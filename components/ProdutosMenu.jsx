import React from 'react'


const ProdutosMenu = ({Arbo}) => {

  function myScript(id) {
    var id_panel = id+'Panel'
    if(document.getElementsByClassName('active')[0]){
      document.getElementsByClassName('active')[0].classList.remove('active');
    }
    if(document.getElementsByClassName('clicked')[0]){
      document.getElementsByClassName('clicked')[0].classList.remove('clicked');
    }
    
    document.getElementById(id_panel).classList.add("active");
    document.getElementById(id).classList.add("clicked");
  }


  const data = Arbo['familias']
  const keys = Object.keys(data['familia']);
  
  return (
    <div class="droped" id="droped-product">
                <div class="menuprod" id="product-menu">
                    <div class="menu-link">
                            <ul class="familias">
                                {keys.map(familia => <li><a class='familia' id={familia.replace(/[.,\s/-]/g, '').toLowerCase()} onClick={() => myScript(familia.replace(/[.,\s/-]/g, '').toLowerCase())} >{familia}</a></li>)}
                            </ul>
                            <div class='more'>
                            {Object.keys(data['familia']).map(familia => 
                              <div class='panel' id={familia.replace(/[.,\s/-]/g, '').toLowerCase().concat('Panel')}>
                                    {
                                      Object.keys(data['familia'][familia]['subfamilia']).map(sub => 
                                        <div >
                                          <li class='SubFamilia'><a href={"/search?subfamilia="+sub}>{sub}</a></li>
                                          { Object.keys(data['familia'][familia]['subfamilia'][sub]['categoria']).map(cat =>
                                          <div>
                                            <li class='categoria'>{cat.replace("TIPO - ", "")}</li>
                                            { Object.keys(data['familia'][familia]['subfamilia'][sub]['categoria'][cat]['subcategoria']).map(sub => <li class='valor'><a href={"/search?subcategoria="+sub}>{sub}</a></li>)}
                                          </div>
                                          )}
                                        </div>
                                    )}
                              </div>
                            )}
                            </div>
                    </div>
                </div>
    </div>
  )
}


export default ProdutosMenu
