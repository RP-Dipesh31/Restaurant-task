import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import Footer from "./Footer";
import MainNav from "./MainNav";
import restaurantHistory from "../assets/restaurant-history.webp";
import chef from "../assets/chef.jpg";
import interiorImage1 from "../assets/restaurant-interior1.jpg";
import interiorImage2 from "../assets/restaurant-interior2.jpg";

const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <MainNav onLogout={() => console.log("User logged out")} />

      {/* Hero Section */}
      <section
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${restaurantHistory})` }}
      >
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fadeIn text-orange-500">
            Our Story Begins Here
          </h1>
          <p className="text-lg md:text-xl max-w-2xl animate-fadeIn delay-100">
            Get a behind-the-scenes look at our journey, our people, and what makes Gourmet Haven truly special.
          </p>
          <Button
            onClick={() => navigate("/reservation")}
            className="mt-8 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl shadow-lg text-white"
          >
            ← Back to Reservations
          </Button>
        </div>
      </section>

      {/* Chef Section */}
      <section className="bg-white py-20 px-6 md:px-20 text-center">
        <h2 className="text-4xl font-bold text-orange-600 mb-6 animate-fadeInUp">
          Meet Our Culinary Maestro
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-10 justify-center animate-fadeInUp delay-150">
          <img
            src={chef}
            alt="Chef John Doe"
            className="w-60 h-60 object-cover rounded-full shadow-xl border-4 border-orange-400"
          />
          <div className="max-w-xl text-gray-700 text-lg text-left">
            <p>
              <span className="font-semibold text-orange-600">Chef John Doe</span> is the heartbeat of our kitchen,
              with over 20 years of crafting culinary art. Every dish reflects his love for traditional flavors
              infused with modern flair.
            </p>
            <p className="mt-4">
              Our dedicated team ensures each dining experience is warm, memorable, and absolutely delicious.
            </p>
          </div>
        </div>
      </section>

      {/* Ambiance Section */}
      <section className="bg-gray-100 py-20 px-6 md:px-20 text-center">
        <h2 className="text-4xl font-bold text-orange-600 mb-6 animate-fadeInUp">
          Experience Our Ambiance
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto animate-fadeIn delay-100">
          With a charming blend of elegance and comfort, our interiors are perfect for intimate dinners, family
          celebrations, and romantic evenings.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 animate-fadeInUp delay-200">
          <img
            src={interiorImage1}
            alt="Interior 1"
            className="w-full h-72 object-cover rounded-xl shadow-lg"
          />
          <img
            src={interiorImage2}
            alt="Interior 2"
            className="w-full h-72 object-cover rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-white py-20 px-6 md:px-20 text-center">
        <h2 className="text-4xl font-bold text-orange-600 mb-10 animate-fadeInUp">
          Our Journey
        </h2>
        <div className="relative border-l-4 border-orange-500 pl-6 max-w-3xl mx-auto space-y-10">
          {[
            { year: "2005", event: "Founded with a passion for fine dining." },
            { year: "2010", event: "Expanded to a second location downtown." },
            { year: "2018", event: "Won 'Best Restaurant in the City' award." },
            { year: "2023", event: "Launched our organic farm-to-table initiative." },
          ].map((item, i) => (
            <div key={i} className="animate-fadeInUp delay-200">
              <div className="text-xl font-semibold text-orange-500">{item.year}</div>
              <div className="text-gray-700">{item.event}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-20 px-6 md:px-20 text-center">
        <h2 className="text-4xl font-bold text-orange-600 mb-10 animate-fadeInUp">What Our Guests Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Emily R.",
              feedback: "Absolutely divine! The food, the ambiance, the service—top notch!",
            },
            {
              name: "Mark T.",
              feedback: "A hidden gem. Every visit feels like a celebration.",
            },
            {
              name: "Sofia W.",
              feedback: "Chef John's creations are a treat to the taste buds!",
            },
          ].map((review, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-lg animate-fadeInUp delay-100 hover:scale-105 transition-transform"
            >
              <p className="italic text-gray-700 mb-4">"{review.feedback}"</p>
              <h4 className="text-orange-600 font-semibold">{review.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-20 px-6 md:px-20 text-center">
        <h2 className="text-4xl font-bold text-orange-600 mb-10">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Chef John", role: "Executive Chef", image: chef },
            { name: "Anna Smith", role: "Restaurant Manager", image: interiorImage1 },
            { name: "Carlos Rivera", role: "Head Sommelier", image: interiorImage2 },
          ].map((person, i) => (
            <div key={i} className="text-center animate-fadeInUp delay-150">
              <img
                src={person.image}
                alt={person.name}
                className="w-40 h-40 object-cover mx-auto rounded-full border-4 border-orange-400 shadow-md mb-4"
              />
              <h4 className="text-xl font-bold text-gray-800">{person.name}</h4>
              <p className="text-orange-600">{person.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-orange-500 text-white py-14 px-6 md:px-20 text-center animate-fadeInUp">
        <h2 className="text-3xl font-bold mb-4">Ready to Dine With Us?</h2>
        <p className="text-lg mb-6">Reserve your table and enjoy a night of unforgettable flavors.</p>
        <Button
          onClick={() => navigate("/reservation")}
          className="bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-xl shadow-xl font-semibold"
        >
          Book a Table →
        </Button>
      </section>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition"
        title="Back to top"
      >
        ↑
      </button>

      <Footer />
    </>
  );
};

export default AboutUs;
