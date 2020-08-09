import React from 'react'
import './EmptySpaceAnimation.css'

export const EmptySpaceAnimation = () => {
    return(
        <div id="EmptySpaceAnimation">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" >
              <defs>
                  <path 
                    id="circlePath" 
                    d=" m 150, 150 
                        m -100, 0 
                        a 100,100 0 0,1 200,0
                        a 100,100 0 0,1 -200,0
                        z"/>
              </defs>
               <text>
                      <textPath xlinkHref="#circlePath">Тут что-то должно быть.</textPath>
               </text>
          </svg>
        </div>
      </div>
    )
}