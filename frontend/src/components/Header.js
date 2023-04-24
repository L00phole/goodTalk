import React from 'react'

import {DiYii} from 'react-icons/di'

function Header() {
  return (
    <header className="p-4 font-bold border-b border-cyan-200/80 shadow-md ">
     <div className="flex items-center justify-between ">
      <div className='justify-start flex'><DiYii/>GoodTalk
      </div>
      </div>
    </header>
  )
}

export default Header