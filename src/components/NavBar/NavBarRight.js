
function NavBarRight() {
    return (
        <div className="top-0 left-0 h-auto w-2/5 flex flex-row
        justify-center">
            <div className="flex justify-between h-auto w-4/5">
            <NavBarRightBtn BtnText={"Email"} BtnLink={"mailto: duongvh1806@gmail.com"}></NavBarRightBtn>
            <NavBarRightBtn BtnText={"Linkedin"} BtnLink={"https://www.linkedin.com/in/glyochi/"}></NavBarRightBtn>
            </div>
        </div>
    )
}

const NavBarRightBtn = ({BtnText, BtnLink}) => (
    <button className="NavBarRightBtn" >
        <a href={BtnLink}>
        {BtnText}
        </a>
    </button>

);


export default NavBarRight
