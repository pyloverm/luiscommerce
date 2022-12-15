import React from 'react'
import { urlFor } from '../lib/client'

const EspacosMenu = ({EspacosMenu}) => {
  console.log(EspacosMenu)

  return (
    <div class="droped" id="droped2">
            <div class="mega-menu" id="mega-menu2">
            {EspacosMenu?.map(espacos => (
                        <div class="contain-link" key={espacos}>
                            <a href='#'>
                                <div class='imageContainer'><img src={urlFor(espacos.image)}  class='zoom' alt=""/></div>
                                <p class="desc-img">{espacos.name}</p>
                            </a>
                        </div>
                      ))
            }
            </div>
    </div>
  )
}
export default EspacosMenu

