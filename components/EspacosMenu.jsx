import React from 'react'

const EspacosMenu = ({EspacosMenu}) => {

  return (
    <div class="droped" id="droped2">
            <div class="mega-menu" id="mega-menu2">
            {EspacosMenu?.map(espacos => (
                        <div class="contain-link" key={espacos}>
                            <a href='#'>
                                <div class='imageContainer'><img src={espacos.imagem}  class='zoom' alt=""/></div>
                                <p class="desc-img">{espacos.nome}</p>
                            </a>
                        </div>
                      ))
            }
            </div>
    </div>
  )
}
export default EspacosMenu

