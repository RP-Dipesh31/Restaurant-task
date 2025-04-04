import Layout from "../src/layouts/Layout"; 
import { Navigate, Route ,Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Signup from "../src/components/Signup";
import Login from "./components/Login";
import MobileNavLinks from "./components/MobileNavLinks";
import ManageRestaurantForm from "./forms/manage-restaurant-form/ManageRestaurantForm";
import AllRestaurants from "./forms/manage-restaurant-form/AllRestaurants";
import ReservationForm from "./components/ReservationForm";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";



const AppRoutes = () => {
    return(
        <Routes>
            <Route  
                path="/" 
                element={
                <Layout showHero>
                    <HomePage/>
                </Layout>
                }
            />
            <Route path="/signup" element={<Signup onClose={() => { /* handle close */ }} toggleAuth={() => { /* handle toggle auth */ }} />} />
            <Route path="/login" element={<Login onClose={() => { /* handle close */ }} toggleAuth={() => { /* handle toggle auth */ }} onLoginSuccess={() => { /* handle login success */ }} />} />
            <Route path="/mobile-nav-links" element={<MobileNavLinks />} /> 
            
                <Route  
                    path="/manage-restaurant" 
                    element={
                        <Layout>
                            <ManageRestaurantForm onSave={async () => { /* handle save */ }} isLoading={false} />
                        
                        </Layout>
                    }
                />

                <Route  
                    path="/restaurants" 
                    element={
                        <Layout>
                            <AllRestaurants/>
                        </Layout>
                    }
                />
                <Route path="/reservation" element={<ReservationForm />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} /> 
           
            
            <Route  path="*" element={<Navigate to="/"/>}/>
        </Routes>
    )
}

export default AppRoutes;

