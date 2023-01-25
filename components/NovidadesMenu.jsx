import React from 'react'

const NovidadesMenu = ({NovidadesMenu}) => {
  return (
    <div class="droped" id="droped">
                  <div class="mega-menu" id="mega-menu">
                      {NovidadesMenu?.map(novidade => (
                        <div class="contain-link" key={novidade.id}>
                            <a href='#'>
                                <div class='imageContainer'><img src={novidade.imagem}  class='zoom' alt=""/></div>
                                <p class="desc-img">{novidade.nome}</p>
                            </a>
                        </div>
                      ))
                      }
                </div>
    </div>
  )
}
export default NovidadesMenu

