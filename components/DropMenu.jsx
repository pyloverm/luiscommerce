import React from 'react'

import { urlFor } from '../lib/client'

const DropMenu = ({DropMenu}) => {
  return (
    <div class="droped" id="droped">
                  <div class="mega-menu" id="mega-menu">
                      {DropMenu?.map(novidade => (
                        <div class="contain-link">
                            <a href='#'>
                                <div class='imageContainer'><img src={urlFor(novidade.image)}  class='zoom' alt=""/></div>
                                <p class="desc-img">{novidade.name}</p>
                            </a>
                        </div>
                      ))
                      }
                </div>
    </div>
  )
}
export default DropMenu

