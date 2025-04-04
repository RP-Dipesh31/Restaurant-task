// "use strict";
// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// const express = require("express");
// const cors_1 = __importDefault(require("cors"));
// require("dotenv/config");
// const mongoose_1 = __importDefault(require("mongoose"));
// const bcryptjs_1 = __importDefault(require("bcryptjs"));
// const User_1 = __importDefault(require("./models/User"));
// const MyRestaurantRoute_1 = __importDefault(require("../src/routes/MyRestaurantRoute"));
// const reservationRoutes_1 = __importDefault(require("./routes/reservationRoutes"));
// const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
// mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING, {
//     tls: true, // Ensure TLS is enabled
//     tlsAllowInvalidCertificates: true, // Accept self-signed certs (optional)
// })
//     .then(() => console.log("Connected to Database!"))
//     .catch(err => console.error("MongoDB Connection Error:", err));
// const app = express();
// app.use(express.json());
// app.use((0, cors_1.default)());
// console.log("Registering routes...");
// app.use("/api/restaurants", MyRestaurantRoute_1.default);
// app.use('/api/reservations', reservationRoutes_1.default);
// app.use('/api', contactRoutes_1.default);
// app.get("/health", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
//     res.send({ message: "API is running!" });
// }));
// // ✅ **Register (Signup) Endpoint**
// app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
//     try {
//         console.log("📌 Incoming request body:", req.body);
//         const { name, email, password } = req.body;
//         // Validate request data
//         if (!name || !email || !password) {
//             console.error("❌ Missing required fields");
//             res.status(400).json({ message: "All fields are required" });
//             return;
//         }
//         console.log("Received request:", req.body); // ✅ Debugging Step 1
//         // Check if user already exists
//         const existingUser = yield User_1.default.findOne({ email });
//         if (existingUser) {
//             console.error("❌ User already exists:", email);
//             res.status(400).json({ message: "User already exists" });
//             return;
//         }
//         // Hash the password
//         const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
//         console.log("🔑 Hashed Password:", hashedPassword);
//         // Create the user
//         const newUser = yield User_1.default.create({ name, email, password: hashedPassword });
//         console.log("✅ User created successfully:", newUser);
//         res.status(201).json({ message: "User registered successfully", user: newUser });
//     }
//     catch (error) {
//         console.error("🔥 Error during user registration:", error);
//         res.status(500).json({ error: "Failed to register user", details: error });
//     }
// }));
// // ✅ **Login Endpoint**
// app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
//     try {
//         const { email, password } = req.body;
//         const user = yield User_1.default.findOne({ email });
//         if (!user) {
//             res.status(404).json({ message: "No record existed" });
//             return;
//         }
//         // Compare hashed password
//         const isMatch = yield bcryptjs_1.default.compare(password, user.password);
//         if (!isMatch) {
//             res.status(400).json({ message: "The password is incorrect" });
//             return;
//         }
//         // Send response for successful login
//         res.status(200).json({ message: "Login successful", user });
//     }
//     catch (error) {
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }));
// app._router.stack.forEach((middleware) => {
//     var _a;
//     if (middleware.route) { // Route middleware
//         console.log(`Route: ${middleware.route.path}`);
//     }
//     else if (middleware.name === "router") { // Router middleware
//         (_a = middleware.handle) === null || _a === void 0 ? void 0 : _a.stack.forEach((handler) => {
//             if (handler.route) {
//                 console.log(`Route: ${handler.route.path}`);
//             }
//         });
//     }
// });
// // console.log("Loaded routes:", app._router.stack);
// app.listen(7000, () => {
//     console.log("server started on localhost:7000");
// });
