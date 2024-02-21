import configDotEnv from "./config";
import express, { json } from "express";
import { notFound } from "./middleware/not-found";
import { usersRouter } from "./routes/users";
import { connect } from "./database/connection";
import { errorHandler } from "./middleware/error-handler";
import morgan from "morgan";
import cors from "cors";
import { cardsRouter } from "./routes/cards";
import { Logger } from "./logs/logger";

configDotEnv();
connect();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.static("public"));

app.use(json()); 
app.use(morgan("dev")); 
app.use("/api/v1/users", usersRouter); 
app.use("/api/v1/cards", cardsRouter); 
app.use(errorHandler); 
app.use(notFound); 

// Error handling middleware to log errors
app.use((err, req, res, next) => {
  if (res.statusCode >= 400) {
    Logger.error("Request failed", res.statusCode, err);
  }
  next(err);
});

const PORT = process.env.PORT || 8081; // use PORT from environment variables or default to 8081

app.listen(PORT, () => {
  Logger.info(`App is running: http://localhost:${PORT}`);
});
