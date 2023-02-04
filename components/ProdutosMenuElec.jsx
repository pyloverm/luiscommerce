import React from 'react'


const ProdutosMenuElec = ({Arbo}) => {

  function myScript(id) {
    var id_panel = id+'Panel'
    if(document.getElementById('product-menu').getElementsByClassName('active')[0]){
      document.getElementById('product-menu').getElementsByClassName('active')[0].classList.remove('active');
    }
    if(document.getElementById('product-menu').getElementsByClassName('clicked')[0]){
      document.getElementById('product-menu').getElementsByClassName('clicked')[0].classList.remove('clicked');
    }
    
    document.getElementById(id_panel).classList.add("active");
    document.getElementById(id).classList.add("clicked");
  }


  const data = Arbo['familias']
  const keys = Object.keys(data['familia']);
  
  return (
    <div className="droped" id="droped-product">
                <div className="menuprod" id="product-menu">
                    <div className="menu-link">
                    <ul key={'familias'} className="familias">
                                {keys.map(function (familia, index){
                                  return(
                                  <li key={familia}>
                                    <a className={index === 0 ? "familia clicked" : "familia"} id={familia.replace(/[.,\s/-]/g, '').toLowerCase()} onClick={() => myScript(familia.replace(/[.,\s/-]/g, '').toLowerCase())} >{familia}</a>
                                  </li>)
                                })}
                            </ul>
                            <div className='more'>
                            {Object.keys(data['familia']).map(function (familia, index){
                              return(
                                <div key={familia} className={index === 0 ? "panel active" : "panel"}  id={familia.replace(/[.,\s/-]/g, '').toLowerCase().concat('Panel')}>
                                      {
                                        Object.keys(data['familia'][familia]['subfamilia']).map(sub => 
                                          <div key={sub}>
                                            <li key={sub} className='SubFamilia'><a href={"/search?subfamilia="+sub}>{sub}</a></li>
                                            { Object.keys(data['familia'][familia]['subfamilia'][sub]['categoria']).map(cat =>
                                            <div key={cat}>
                                              <li key={cat} className='categoria'>{cat.replace("TIPO - ", "")}</li>
                                              { Object.keys(data['familia'][familia]['subfamilia'][sub]['categoria'][cat]['subcategoria']).map(sub => <li key={sub} className='valor'><a href={"/search?subcategoria="+sub}>{sub}</a></li>)}
                                            </div>
                                            )}
                                          </div>
                                      )}
                                </div>)
                            })}
                            </div>
                    </div>
                </div>
    </div>
  )
}


export default ProdutosMenuElec
