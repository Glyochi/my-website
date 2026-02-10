import React from 'react';

const NavBarRight: React.FC = () => {
  return (
    <div className="top-0 left-0 h-auto w-full flex flex-row mr-2
        justify-center">
      <div className="flex justify-between h-auto w-full">
        <NavBarRightBtn BtnText={"Github"} BtnLink={"https://github.com/Glyochi"}></NavBarRightBtn>
        <NavBarRightBtn BtnText={"Linkedin"} BtnLink={"https://www.linkedin.com/in/glyochi/"}></NavBarRightBtn>
        <NavBarRightBtn BtnText={"Email"} BtnLink={"mailto: duongvh1806@gmail.com"}></NavBarRightBtn>
      </div>
    </div>
  )
}

interface NavBarRightBtnProps {
  BtnText: string;
  BtnLink: string;
}

const NavBarRightBtn: React.FC<NavBarRightBtnProps> = ({ BtnText, BtnLink }) => (
  <button className="NavBarRightBtn" >
    <a href={BtnLink}>
      {BtnText}
    </a>
  </button>

);


export default NavBarRight
