import React from 'react'
import { urlFor } from '../lib/client'

const EspacosMenu = ({EspacosMenu}) => {
  return (
    <div class="droped" id="droped2">
            <div class="mega-menu" id="mega-menu2">
            {EspacosMenu?.map(espacos => (
                        <div class="contain-link">
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

