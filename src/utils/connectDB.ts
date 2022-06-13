import mongoose from "mongoose";

export const connectDB = () =>
  mongoose
    .connect("mongodb://localhost:27017/turf", { family: 4 })
    .then(() => console.log("DB connected"))
    .catch(() => console.error("DB Connection fail"));
