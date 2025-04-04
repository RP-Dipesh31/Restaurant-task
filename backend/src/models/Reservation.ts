import mongoose, { Document, Schema } from 'mongoose';

export interface IReservation extends Document {
    name: string;
    phone: string;
    date: string;
    time: string;
    guests: number;
    createdAt: Date;
}

const ReservationSchema = new Schema<IReservation>({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IReservation>('Reservation', ReservationSchema);
