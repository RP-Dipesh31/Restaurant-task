import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Header from './Header';
import { Button } from './ui/button';
import { useNavigate } from "react-router-dom";
import Footer from './Footer';

interface FormData {
  id?: string; // Optional ID property
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
}

const ReservationForm: React.FC = () => {
   const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
  });
  const [reservations, setReservations] = useState<FormData[]>([]);
  const [editingReservation, setEditingReservation] = useState<string | null>(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    const response = await fetch('http://localhost:7000/api/reservations');
    const data = await response.json();
    console.log("Fetched Reservations:", data); // Debugging
    setReservations(data);
  };
  

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingReservation 
      ? `http://localhost:7000/api/reservations/${editingReservation}`
      : 'http://localhost:7000/api/reservations';
    
    const method = editingReservation ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert(editingReservation ? '✅ Reservation Updated!' : '✅ Reservation Created!');
      fetchReservations();
      setEditingReservation(null);
      setFormData({ name: '', phone: '', date: '', time: '', guests: 1 });
    } else {
      alert('❌ Operation failed!');
    }
  };

  const handleEdit = (reservation: FormData) => {
    setFormData(reservation);
    setEditingReservation(reservation.id || null);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
  
    const response = await fetch(`http://localhost:7000/api/reservations/${id}`, {
      method: "DELETE",
    });
  
    if (response.ok) {
      alert("🗑️ Reservation Deleted!");
      setReservations((prevReservations) => prevReservations.filter(res => res.id !== id));
    } else {
      alert("❌ Failed to delete reservation.");
    }
  };
  
  

  return (
    <>
      <Header />
      <div className="relative min-h-screen bg-gray-100 p-6">
        {/* Back Button - Positioned at the top-right */}
        <div className="absolute top-4 right-4">
          <Button 
            type="button" 
            onClick={() => navigate("/restaurants")} 
            variant="outline"
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-md transition-all"
          >
            ← Back
          </Button>
        </div>

        {/* Centered Form */}
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
            <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">Reserve a Table</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="flex flex-col">
                <label htmlFor="name" className="font-semibold">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Enter your name"
                />
              </div>

              {/* Phone Field */}
              <div className="flex flex-col">
                <label htmlFor="phone" className="font-semibold">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Date Field */}
              <div className="flex flex-col">
                <label htmlFor="date" className="font-semibold">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Time Field */}
              <div className="flex flex-col">
                <label htmlFor="time" className="font-semibold">Time</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Number of Guests */}
              <div className="flex flex-col">
                <label htmlFor="guests" className="font-semibold">Number of Guests</label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  min="1"
                  required
                  className="border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Number of guests"
                />
              </div>

              {/* Submit Button */}
              {/* <button
                type="submit"
                className="bg-orange-600 text-white font-bold py-2 rounded-lg w-full hover:bg-orange-700 transition-all"
              >
                Book Table
              </button> */}

              <button type="submit" className="bg-orange-600 text-white font-bold py-2 rounded-lg w-full hover:bg-orange-700 transition-all">
                {editingReservation ? "Update" : "Reserve"}
              </button>
            </form>

            <h2>Reservations</h2>
            <ul className="reservation-list">
              {reservations.map((res, index) => (
                <li key={res.id ?? index} className="reservation-item">
                  {res.name} - {res.date} at {res.time} ({res.guests} guests)
                  <button className="edit-button bg-blue-500 text-white font-bold py-1 px-3 rounded-md hover:bg-blue-600 transition-all"
                    onClick={() => handleEdit(res)}>Edit</button>
                  <button 
                    className="delete-button bg-red-500 text-white font-bold py-1 px-3 rounded-md hover:bg-red-600 transition-all"
                    onClick={() => handleDelete(res.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReservationForm;
