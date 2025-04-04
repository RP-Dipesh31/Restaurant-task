"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReservation = exports.updateReservation = exports.getReservations = exports.createReservation = void 0;
const Reservation_1 = __importDefault(require("../models/Reservation"));
// Create a new reservation
const createReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone, date, time, guests } = req.body;
        const newReservation = new Reservation_1.default({
            name,
            phone,
            date,
            time,
            guests
        });
        yield newReservation.save();
        res.status(201).json({ message: '✅ Reservation Created Successfully' });
    }
    catch (error) {
        console.error('❌ Error Creating Reservation:', error);
        res.status(500).json({ error: '❌ Server Error' });
    }
});
exports.createReservation = createReservation;
// Get all reservations
const getReservations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservations = yield Reservation_1.default.find();
        res.json(reservations);
    }
    catch (error) {
        console.error('❌ Error Fetching Reservations:', error);
        res.status(500).json({ error: '❌ Server Error' });
    }
});
exports.getReservations = getReservations;
const updateReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, phone, date, time, guests } = req.body;
        const updatedReservation = yield Reservation_1.default.findByIdAndUpdate(id, { name, phone, date, time, guests }, { new: true, runValidators: true });
        if (!updatedReservation) {
            res.status(404).json({ error: "Reservation not found" });
            return;
        }
        res.status(200).json({ message: "✅ Reservation Updated Successfully", reservation: updatedReservation });
    }
    catch (error) {
        console.error("❌ Error Updating Reservation:", error);
        res.status(500).json({ error: "❌ Server Error" });
    }
});
exports.updateReservation = updateReservation;
const deleteReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedReservation = yield Reservation_1.default.findByIdAndDelete(id);
        if (!deletedReservation) {
            res.status(404).json({ error: "Reservation not found" });
            return;
        }
        res.status(200).json({ message: "🗑️ Reservation Deleted Successfully" });
    }
    catch (error) {
        console.error("❌ Error Deleting Reservation:", error);
        res.status(500).json({ error: "❌ Server Error" });
    }
});
exports.deleteReservation = deleteReservation;
