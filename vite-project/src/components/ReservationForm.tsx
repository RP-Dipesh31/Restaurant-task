import React, { useState, useEffect, ChangeEvent } from 'react';
import Footer from './Footer';
import MainNav from './MainNav';
import { useNavigate, useParams } from "react-router-dom";
import { Button } from './ui/button';
import { motion } from 'framer-motion';

interface FormData {
  id?: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ReservationForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:7000/api/reservations/${id}`)
        .then(res => res.json())
        .then(data => setFormData(data))
        .catch(err => console.error('Error loading reservation:', err));
    }
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = id
      ? `http://localhost:7000/api/reservations/${id}`
      : 'http://localhost:7000/api/reservations';
    const method = id ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert(id ? '✅ Reservation Updated!' : '✅ Reservation Created!');
      navigate("/reservation-list");
    } else {
      alert('❌ Operation failed!');
    }
  };

  return (
    <>
      <MainNav onLogout={() => {
        console.log("User logged out");
        navigate("/login");
      }} />

      <div className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-orange-100 to-yellow-50 p-6">     
        <div className="flex justify-center items-center min-h-screen">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-lg"
          >
            <h2 className="text-4xl font-extrabold text-center text-orange-600 mb-6">
              ✨ {id ? 'Update' : 'Reserve'} a Table
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div variants={fadeInUp} transition={{ delay: 0.1 }}>
                <label htmlFor="name" className="font-semibold">Name : </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-style"
                  placeholder="Enter your name"
                />
              </motion.div>

              <motion.div variants={fadeInUp} transition={{ delay: 0.2 }}>
                <label htmlFor="phone" className="font-semibold">Phone Number : </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input-style"
                  placeholder="Enter your phone number"
                />
              </motion.div>

              <motion.div variants={fadeInUp} transition={{ delay: 0.3 }}>
                <label htmlFor="date" className="font-semibold">Date : </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="input-style"
                />
              </motion.div>

              <motion.div variants={fadeInUp} transition={{ delay: 0.4 }}>
                <label htmlFor="time" className="font-semibold">Time : </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="input-style"
                />
              </motion.div>

              <motion.div variants={fadeInUp} transition={{ delay: 0.5 }}>
                <label htmlFor="guests" className="font-semibold">Number of Guests : </label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  min="1"
                  required
                  className="input-style"
                />
              </motion.div>

              <motion.div variants={fadeInUp} transition={{ delay: 0.6 }}>
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-all"
                >
                  {id ? "Update" : "Reserve"}
                </button>
              </motion.div>

              <motion.div className="pt-2 text-center" variants={fadeInUp} transition={{ delay: 0.7 }}>
                <Button
                  type="button"
                  onClick={() => navigate("/reservation-list")}
                  className="bg-blue-500 text-white px-4 py-2 font-semibold rounded-md hover:bg-blue-600 transition"
                >
                  View All Reservations
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ReservationForm;
