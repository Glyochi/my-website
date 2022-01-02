
function NavBarRight() {
    return (
        <div className="top-0 left-0 h-auto w-2/5 flex flex-row
        justify-center">
            <div className="flex justify-between h-auto w-4/5">
            <NavBarRightBtn BtnText={"Email"}></NavBarRightBtn>
            <NavBarRightBtn BtnText={"Linkedin"}></NavBarRightBtn>
            </div>
        </div>
    )
}

const NavBarRightBtn = ({BtnText, BtnLink}) => (
    <button className="NavBarRightBtn">
        {BtnText}
    </button>

);


export default NavBarRight
