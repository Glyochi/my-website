import React from 'react';
import NavBarLeft from "./NavBarLeft"
import NavBarRight from "./NavBarRight"

const NavBar: React.FC = () => {
  return (
    <div className="grid place-items-center w-screen">
      <div className="flex bg-gray-600 rounded-full h-[4rem] w-3/4 justify-center items-center">
        <div className='flex-[5]'>
          <NavBarLeft />
        </div>
        <div className='lg:flex-1'>
        </div>
        <div className='flex-[5]'>
          <NavBarRight />
        </div>
      </div>
    </div>


  )
}



export default NavBar
