const express = require("express");
import { Request, Response } from "express-serve-static-core";
import  cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import EmployeeModel from "./models/User";
import restaurantRoutes from "../src/routes/MyRestaurantRoute";
import reservationRoutes from "./routes/reservationRoutes";
import contactRoutes from "./routes/contactRoutes";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string, {
    tls: true, // Ensure TLS is enabled
    tlsAllowInvalidCertificates: true, // Accept self-signed certs (optional)
})
    .then(() => console.log("Connected to Database!"))
    .catch(err => console.error("MongoDB Connection Error:", err));

const app = express();
app.use(express.json());
app.use(cors());

console.log("Registering routes...");
app.use("/api/restaurants", restaurantRoutes); 


app.use('/api/reservations', reservationRoutes);

app.use('/api', contactRoutes);

app.get("/health", async (req:Request, res:Response) =>{
    res.send({message: "API is running!"});
});

// ✅ **Register (Signup) Endpoint**
app.post("/register", async (req: Request, res: Response): Promise<void> => {
    try {

        console.log("📌 Incoming request body:", req.body);
        const { name, email, password }: { name?: string; email?: string; password?: string } = req.body;

         // Validate request data
         if (!name || !email || !password) {
            console.error("❌ Missing required fields");
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        console.log("Received request:", req.body); // ✅ Debugging Step 1

        // Check if user already exists
        const existingUser = await EmployeeModel.findOne({ email });
        if (existingUser) {
            console.error("❌ User already exists:", email);
            res.status(400).json({ message: "User already exists" });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("🔑 Hashed Password:", hashedPassword);

        // Create the user
        const newUser = await EmployeeModel.create({ name, email, password: hashedPassword });
        console.log("✅ User created successfully:", newUser);

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("🔥 Error during user registration:", error);
        res.status(500).json({ error: "Failed to register user", details: error });
    }
});

// ✅ **Login Endpoint**
app.post("/login", async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await EmployeeModel.findOne({ email });

        if (!user) {
            res.status(404).json({ message: "No record existed" });
            return;
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "The password is incorrect" });
            return;
        }

        // Send response for successful login
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});




// app._router.stack.forEach((middleware: { route?: { path: string }; name?: string; handle?: { stack: any[] } }) => {
//     if (middleware.route) { // Route middleware
//       console.log(`Route: ${middleware.route.path}`);
//     } else if (middleware.name === "router") { // Router middleware
//       middleware.handle?.stack.forEach((handler) => {
//         if (handler.route) {
//           console.log(`Route: ${handler.route.path}`);
//         }
//       });
//     }

//   });

if (app._router && Array.isArray(app._router.stack)) {
    app._router.stack.forEach((middleware: { route?: { path: string }; name?: string; handle?: { stack: any[] } }) => {
        if (middleware.route) {
            console.log(`Route: ${middleware.route.path}`);
        } else if (middleware.name === "router" && middleware.handle?.stack) {
            middleware.handle.stack.forEach((handler) => {
                if (handler.route) {
                    console.log(`Route: ${handler.route.path}`);
                }
            });
        }
    });
} else {
    console.error("⚠️ No routes found in app._router.");
}

  

// console.log("Loaded routes:", app._router.stack);

app.listen(7000, () => {
    console.log("server started on localhost:7000");
});