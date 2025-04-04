import React, { useState, ChangeEvent, FormEvent } from 'react';
import Header from './Header';
import { Button } from './ui/button';
import { useNavigate } from "react-router-dom";
import Footer from './Footer';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:7000/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            setFormData({ name: "", email: "", message: "" });
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("Something went wrong. Please try again.");
    }
};



  return (
    <>
      <Header />
      <div className="relative bg-gray-100 min-h-screen py-10 px-6 flex flex-col items-center">
        {/* Back Button - Positioned at the top-right */}
        <div className="absolute top-4 right-4">
          <Button 
            type="button" 
            onClick={() => navigate("/about-us")} 
            variant="outline"
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-md transition-all"
          >
            ← Back
          </Button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
          {/* Contact Us Title */}
          <h2 className="text-4xl font-extrabold text-center text-orange-600 mb-6">Contact Us</h2>
          <p className="text-lg text-center text-gray-700 leading-relaxed">
            Have questions or want to make a reservation? Fill out the form below or reach out to us directly.
          </p>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div className="flex flex-col">
              <label htmlFor="name" className="font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border p-2 rounded-lg shadow-sm"
                placeholder="Enter your name"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border p-2 rounded-lg shadow-sm"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="font-medium text-gray-700">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="border p-2 rounded-lg shadow-sm"
                placeholder="Write your message here..."
              />
            </div>
            <button type="submit" className="bg-orange-600 text-white p-3 w-full rounded-lg font-bold hover:bg-orange-700 transition duration-300">
              Send Message
            </button>
          </form>

          {/* Restaurant Info Section */}
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-orange-600 text-center mb-4">Our Location</h3>
            <p className="text-center text-gray-700">Visit us at our restaurant or contact us anytime.</p>

            <div className="mt-6 space-y-3 text-lg text-gray-700">
              <p><strong>📍 Address:</strong> 123 Main Street, New York, NY 10001</p>
              <p><strong>📞 Phone:</strong> +1 (123) 456-7890</p>
              <p><strong>🕒 Business Hours:</strong></p>
              <ul className="list-disc pl-5">
                <li>Monday - Friday: 10:00 AM - 10:00 PM</li>
                <li>Saturday - Sunday: 12:00 PM - 11:00 PM</li>
              </ul>
            </div>

            {/* Google Maps Integration */}
            <div className="mt-6">
              <iframe
                title="Google Maps"
                className="w-full h-64 rounded-lg shadow-md"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.998954050708!2d-74.00597268459555!3d40.71277537933002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a3168f92e61%3A0x8462f34fae4df54b!2s123%20Main%20St%2C%20New%20York%2C%20NY%2010001!5e0!3m2!1sen!2sus!4v1616763356423!5m2!1sen!2sus"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
