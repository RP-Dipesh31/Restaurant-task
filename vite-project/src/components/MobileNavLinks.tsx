import Footer from "./Footer";
import { motion } from "framer-motion";
import MainNav from "./MainNav";
import welcomeImage from "../assets/welcomeImage.jpg";
import { useNavigate } from "react-router-dom"; // 🔸 Step 1

const MobileNavLinks = () => {
    const navigate = useNavigate(); // 🔸 Step 2

    return (
        <>
            <MainNav onLogout={() => console.log("Logged out")} />
            <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-r from-orange-100 via-white to-orange-100">
                {/* Image Section */}
                <motion.img
                    src={welcomeImage}
                    alt="Delicious food"
                    className="w-80 h-80 object-cover rounded-3xl shadow-2xl border-4 border-white"
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    whileHover={{ scale: 1.05 }}
                />

                {/* Text Section */}
                <motion.div
                    className="mt-10 md:mt-0 md:ml-12 bg-white p-8 rounded-3xl shadow-xl text-center md:text-left max-w-xl"
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                >
                    <motion.h2
                        className="text-5xl font-extrabold text-orange-600 mb-4"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        Welcome to{" "}
                        <span className="text-gray-800">MernEats.com!</span>
                    </motion.h2>
                    <motion.p
                        className="text-lg text-gray-600 mb-6 leading-relaxed"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        Discover delicious meals, explore new flavors, and enjoy
                        fast delivery from your favorite restaurants — all in one place!
                    </motion.p>
                    <motion.button
                        className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/restaurants")} // 🔸 Step 3
                    >
                        Order Now
                    </motion.button>
                </motion.div>
            </div>
            <Footer />
        </>
    );
};

export default MobileNavLinks;
