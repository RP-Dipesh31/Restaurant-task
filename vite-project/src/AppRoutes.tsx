<<<<<<< HEAD
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


=======
import Layout from "./layouts/layout";
import { Navigate, Route ,Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
>>>>>>> 6d3fbd6a518b8cbe988a913d33a389d1053a9c61

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
<<<<<<< HEAD
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
           
=======
            <Route  path="auth-callback" element={<AuthCallbackPage/>}/>
            
            <Route element={<ProtectedRoute/>}>
                <Route  
                    path="/user-profile" 
                    element={
                        <Layout>
                            <UserProfilePage/>
                        </Layout>
                    }
                />
            </Route>
>>>>>>> 6d3fbd6a518b8cbe988a913d33a389d1053a9c61
            
            <Route  path="*" element={<Navigate to="/"/>}/>
        </Routes>
    )
}

<<<<<<< HEAD
export default AppRoutes;

=======
export default AppRoutes;
>>>>>>> 6d3fbd6a518b8cbe988a913d33a389d1053a9c61
