"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reservationController_1 = require("../controllers/reservationController");
const router = express_1.default.Router();
// Create a reservation
router.post('/', reservationController_1.createReservation);
// Get all reservations
router.get('/', reservationController_1.getReservations);
router.put('/:id', reservationController_1.updateReservation);
router.delete('/:id', reservationController_1.deleteReservation);
exports.default = router;
