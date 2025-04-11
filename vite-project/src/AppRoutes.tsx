import Layout from "../src/layouts/Layout"; 
import { Navigate, Route ,Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MobileNavLinks from "./components/MobileNavLinks";
import ManageRestaurantForm from "./forms/manage-restaurant-form/ManageRestaurantForm";
import AllRestaurants from "./forms/manage-restaurant-form/AllRestaurants";
import ReservationForm from "./components/ReservationForm";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import MenuListPage from "./forms/manage-restaurant-form/MenuListPage";
import MenuSection from "./forms/manage-restaurant-form/MenuSection";
import ReservationList from "./components/ReservationList";
import CheckoutPage from "./pages/CheckoutPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_PUBLIC_KEY || '');

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
                <Route path="/reservation-list" element={<ReservationList />} />
                <Route path="/reservation/:id" element={<ReservationForm />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} /> 
                <Route
                    path="/menu"
                    element={
                    <Layout>
                        <MenuSection />
                    </Layout>
                    }
                />
               
                <Route path="/menu/:category" element={<MenuListPage />} />
                <Route
                    path="/checkout"
                    element={
                        <Elements stripe={stripePromise}>
                            <CheckoutPage />
                        </Elements>
                    }
                />

            
            <Route  path="*" element={<Navigate to="/"/>}/>
        </Routes>
    )
}

export default AppRoutes;

