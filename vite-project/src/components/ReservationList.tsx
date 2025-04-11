import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import MainNav from './MainNav';
import { motion } from 'framer-motion';
import { FaUser, FaCalendarAlt, FaUsers, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

interface FormData {
  id?: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
}

const ReservationList: React.FC = () => {
  const [reservations, setReservations] = useState<FormData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByDate, setSortByDate] = useState(false);
  const navigate = useNavigate();

  const fetchReservations = async () => {
    try {
      const response = await fetch('http://localhost:7000/api/reservations');
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleDelete = async (id?: string) => {
    if (!id) return;
    const confirmed = window.confirm("Are you sure you want to delete this reservation?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:7000/api/reservations/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('✅ Reservation deleted!');
        fetchReservations();
      } else {
        alert('❌ Failed to delete.');
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const filteredReservations = reservations
    .filter((res) =>
      res.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortByDate) return 0;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

  return (
    <>
      <MainNav onLogout={() => console.log('User logged out')} />

      <div className="relative p-6 md:p-12 bg-gray-50 min-h-screen">

        {/* Back Button */}
        <div className="absolute top-4 right-4">
          <Button
            onClick={() => navigate("/reservation")}
            className="bg-orange-100 text-orange-700 hover:bg-orange-200 px-4 py-2 rounded-md"
          >
            ← Back
          </Button>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-orange-600 text-center">All Reservations</h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <button
            onClick={() => setSortByDate((prev) => !prev)}
            className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition"
          >
            {sortByDate ? 'Unsort by Date' : 'Sort by Date'}
          </button>
        </div>

        {filteredReservations.length === 0 ? (
          <p className="text-center text-gray-500">No reservations found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredReservations.map((res) => (
              <motion.div
                key={res.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl p-6 transition duration-300 relative"
              >
                <div className="flex items-center gap-2 mb-2 text-lg font-semibold text-orange-600">
                  <FaUser className="text-orange-500" />
                  {res.name}
                </div>
                <div className="flex items-center gap-2 text-gray-700 mb-1">
                  <FaCalendarAlt className="text-blue-500" />
                  {res.date} at {res.time}
                </div>
                <div className="flex items-center gap-2 text-gray-700 mb-3">
                  <FaUsers className="text-green-500" />
                  {res.guests} guests
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/reservation/${res.id}`)}
                    className="flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(res.id)}
                    className="flex items-center gap-1 bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default ReservationList;



