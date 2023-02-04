import React from 'react'

const EspacosMenu = ({EspacosMenu}) => {

  return (
    <div className="droped" id="droped2">
            <div className="mega-menu" id="mega-menu2">
            {EspacosMenu?.map(espacos => (
                        <div className="contain-link" key={espacos}>
                            <a href='#'>
                                <div className='imageContainer'><img src={espacos.imagem}  className='zoom' alt=""/></div>
                                <p className="desc-img">{espacos.nome}</p>
                            </a>
                        </div>
                      ))
            }
            </div>
    </div>
  )
}
export default EspacosMenu

