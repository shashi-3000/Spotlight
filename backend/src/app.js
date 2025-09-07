// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import userRouter from "./routes/user.route.js";
// import movieRouter from "./routes/movie.route.js";

// const app = express();

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }));

// app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"));
// app.use(cookieParser());

// // mount routes
// app.use("/api/users", userRouter);   // http://localhost:5000/api/users/register
// app.use("/api/movies", movieRouter); // http://localhost:5000/api/movies

// export default app;


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.route.js";
import movieRouter from "./routes/movie.route.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Simple request logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Mount routes
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is running!', timestamp: new Date() });
});

export default app;





