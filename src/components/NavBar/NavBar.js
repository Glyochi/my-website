
import NavBarLeft from "./NavBarLeft"
import NavBarRight from "./NavBarRight"

const NavBar = () => {
    return (
        <div className="grid place-items-center w-screen h-20 flex-col ">
            <div className = "flex bg-gray-600 rounded-full h-20  w-3/4">
                <NavBarLeft/>
                <NavBarRight/>
            </div>
        </div>
        
         
    )
}



export default NavBar