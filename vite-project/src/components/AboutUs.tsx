import React from "react";
import Header from "./Header";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import restaurantHistory from "../assets/restaurant-history.jpg";
import chef from "../assets/chef.jpg";
import interiorImage1 from "../assets/restaurant-interior1.jpg";
import interiorImage2 from "../assets/restaurant-interior2.jpg";
import MainNav from "./MainNav";

const AboutUs: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <MainNav onLogout={() => console.log("User logged out")} />
      <div className="relative bg-gray-50 min-h-screen flex flex-col items-center pb-16">
        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Button
            type="button"
            onClick={() => navigate("/reservation")}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition-all"
          >
            ← Back
          </Button>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-10 max-w-5xl w-full mt-16">
          {/* About Us Section */}
          <h2 className="text-5xl font-extrabold text-center text-orange-600 mb-8">About Us</h2>
          <p className="text-lg text-center text-gray-700 leading-relaxed px-4 md:px-10">
            Welcome to <span className="font-semibold text-orange-600">Gourmet Haven</span>, where passion for exquisite cuisine meets 
            outstanding service. Since 2005, we have been crafting unforgettable dining experiences, serving dishes made with fresh, 
            high-quality ingredients.
          </p>
          <div className="flex justify-center my-8">
            <img 
              src={restaurantHistory}
              alt="Restaurant History" 
              className="w-full md:w-3/4 h-72 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Chef & Staff Section */}
          <section className="mt-12 text-center">
            <h3 className="text-3xl font-bold text-orange-600 mb-6">Meet Our Chef & Staff</h3>
            <div className="flex flex-col md:flex-row items-center md:space-x-8">
              <img 
                src={chef}
                alt="Head Chef" 
                className="w-48 h-48 rounded-full shadow-lg border-4 border-orange-500"
              />
              <div className="text-lg text-gray-700 mt-6 md:mt-0 max-w-xl">
                <p>
                  <span className="font-semibold text-orange-600">Chef John Doe</span>, a culinary maestro with over 20 years of experience, 
                  seamlessly blends traditional flavors with modern innovations.
                </p>
                <p className="mt-4">
                  Our dedicated staff ensures every guest receives a warm welcome and an unparalleled dining experience.
                </p>
              </div>
            </div>
          </section>

          {/* Ambiance Section */}
          <section className="mt-12 text-center">
            <h3 className="text-3xl font-bold text-orange-600 mb-6">Experience Our Ambiance</h3>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Our restaurant exudes a charming blend of elegance and comfort, perfect for intimate dinners, family gatherings, 
              and celebrations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <img 
                src={interiorImage1} 
                alt="Elegant Dining" 
                className="w-full h-72 object-cover rounded-lg shadow-lg"
              />
              <img 
                src={interiorImage2}
                alt="Cozy Ambiance" 
                className="w-full h-72 object-cover rounded-lg shadow-lg"
              />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
