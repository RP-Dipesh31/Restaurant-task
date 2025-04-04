import { Link } from "react-router-dom";
<<<<<<< HEAD
import MainNav from "./MainNav";



=======
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";


>>>>>>> 6d3fbd6a518b8cbe988a913d33a389d1053a9c61
const Header = () => {
    return (
        <div className="border-b-2 border-b-orange-500 py-6">
            <div className="container max-auto flex justify-between items-center">
                <Link to="/" className="text-3xl font-bold tracking-tight text-orange-500">
                    MernEats.com
                </Link>
<<<<<<< HEAD
=======
                <div className="md:hidden">
                    <MobileNav/>
                </div>
>>>>>>> 6d3fbd6a518b8cbe988a913d33a389d1053a9c61
                <div className="hidden md:block">
                    <MainNav/>
                </div>
            </div>
        </div>
    )
}

<<<<<<< HEAD
export default Header;






=======
export default Header;
>>>>>>> 6d3fbd6a518b8cbe988a913d33a389d1053a9c61
