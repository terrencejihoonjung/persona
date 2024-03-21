import express from "express";
import connectDB from "./db.ts";

const app = express();
connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
