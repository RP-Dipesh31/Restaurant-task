"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    addressLine1: { type: String, required: false },
    city: { type: String, required: false },
    country: { type: String, required: false },
});
const UserModel = mongoose_1.default.model("User", UserSchema);
exports.default = UserModel;
