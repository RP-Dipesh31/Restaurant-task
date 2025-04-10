import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import MainNav from './MainNav';

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

  useEffect(() => {
    const fetchReservations = async () => {
      const response = await fetch('http://localhost:7000/api/reservations');
      const data = await response.json();
      setReservations(data);
    };

    fetchReservations();
  }, []);

  return (
    <>
        <MainNav onLogout={() => console.log('User logged out')} />
        <div className="p-8">
        <h2 className="text-2xl font-bold mb-4 text-orange-600">All Reservations</h2>
        {reservations.length === 0 ? (
            <p>No reservations found.</p>
        ) : (
            <ul className="space-y-2">
            {reservations.map((res) => (
                <li key={res.id} className="bg-white shadow p-4 rounded-lg">
                <strong>{res.name}</strong> - {res.date} at {res.time} ({res.guests} guests)
                </li>
            ))}
            </ul>
        )}
        </div>
        <Footer/>
    </>
  );
};

export default ReservationList;
