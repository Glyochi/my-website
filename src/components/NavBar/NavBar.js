
import NavBarLeft from "./NavBarLeft"
import NavBarRight from "./NavBarRight"

const NavBar = () => {
    return (
        <div className="grid place-items-center w-screen">
            <div className = "flex bg-gray-600 rounded-full h-[4vw]  w-3/4">
                <NavBarLeft/>
                <NavBarRight/>
            </div>
        </div>
        
         
    )
}



export default NavBar