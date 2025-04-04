<<<<<<< HEAD
// import { Button } from "./ui/button";
// import { Link,useNavigate  } from "react-router-dom";
// import Header from "./Header"; // Import the Header
// import Footer from "./Footer"; // Adjust the path as necessary


// const MobileNavLinks = () => {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         navigate("/");
//     };

//     return (
//         <>
//             <Header /> 
//             <div className="space-y-3 p-4">
//                 <h2 className="text-2xl font-bold text-center text-orange-600">
//                     Welcome to <span className="font-extrabold text-gray-800">MernEats.com!</span>
//                 </h2>

//                 <div className="flex flex-col items-end space-y-2">
//                     <Link to="/manage-restaurant" className="font-bold hover:text-orange-500">
//                         Manage Restaurant
//                     </Link>
//                     <Link to="/restaurants" className="font-bold hover:text-orange-500">
//                         All Restaurants
//                     </Link>
//                     <Link to="/reservation" className="font-bold hover:text-orange-500">
//                         Reserve a Table
//                     </Link>
//                     <Link to="/about-us" className="font-bold hover:text-orange-500">
//                         About Us
//                     </Link>
//                     <Link to="/contact" className="font-bold hover:text-orange-500">
//                         Contact
//                     </Link> 
//                     <Button className="px-3 font-bold hover:bg-gray-500" onClick={handleLogout} >
//                         Log Out
//                     </Button>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default MobileNavLinks;


// import { Button } from "./ui/button";
// import { Link, useNavigate } from "react-router-dom";
// import Header from "./Header";
// import Footer from "./Footer";

// const MobileNavLinks = () => {
//     // const navigate = useNavigate();

//     // const handleLogout = () => {
//     //     localStorage.removeItem("authToken"); // Clear token on logout
//     //     navigate("/");
//     //     window.location.reload(); // Reload to update UI
//     // };

//     return (
//         <>
//             <Header />
//             <div className="space-y-3 p-4">
//                 <h2 className="text-2xl font-bold text-center text-orange-600">
//                     Welcome to <span className="font-extrabold text-gray-800">MernEats.com!</span>
//                 </h2>

//                 {/* <div className="flex flex-col items-center space-y-2">
//                     <Link to="/manage-restaurant" className="font-bold hover:text-orange-500">
//                         Manage Restaurant
//                     </Link>
//                     <Link to="/restaurants" className="font-bold hover:text-orange-500">
//                         All Restaurants
//                     </Link>
//                     <Link to="/reservation" className="font-bold hover:text-orange-500">
//                         Reserve a Table
//                     </Link>
//                     <Link to="/about-us" className="font-bold hover:text-orange-500">
//                         About Us
//                     </Link>
//                     <Link to="/contact" className="font-bold hover:text-orange-500">
//                         Contact
//                     </Link>
//                     <Button className="px-3 font-bold hover:bg-gray-500" onClick={handleLogout}>
//                         Log Out
//                     </Button>
//                 </div> */}
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default MobileNavLinks;


    import Header from "./Header";
    import Footer from "./Footer";
    import { motion } from "framer-motion";

    const MobileNavLinks = () => {
        return (
            <>
                <Header />
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
                    <motion.h2
                        className="text-4xl font-bold text-center text-orange-600"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        Welcome to{" "}
                        <motion.span
                            className="font-extrabold text-gray-800"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                        >
                            MernEats.com!
                        </motion.span>
                    </motion.h2>
                </div>
                <Footer />
            </>
        );
    };

    export default MobileNavLinks;


=======
import {Link } from "react-router-dom"
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";





const MobileNavLinks = () => {
    const {logout} = useAuth0();
    return(
        <>
            <Link to="/user-profile" className="flex bg-white items-center font-bold hover:text-orange-500">
                User Profile
            </Link>
            <Button onClick={() => logout()}
            className="flex items-center px-3 font-bold hover:bg-gray-500">
                Log Out
            </Button>
        </>
    )
}

export default MobileNavLinks;
>>>>>>> 6d3fbd6a518b8cbe988a913d33a389d1053a9c61
