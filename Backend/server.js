import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import workoutRoutes from "./routes/workouts.js"; // Ensure to include the .js extension

// Load environment variables from .env file
dotenv.config();

// Create an Express app
const app = express();

// Middleware
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/workouts", workoutRoutes);

// Connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
    // Listen on the specified port
    const PORT = process.env.PORT; // Default to 3000 if PORT is not set
    app.listen(PORT, () => {
      console.log("Listening for requests on port", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
