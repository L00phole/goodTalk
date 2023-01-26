const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const colors = require("colors");
const connectDB = require("./config/db");
const session = require("express-session");
const loginAndRegisterRoutes = require("./loginAndRegisterRoutes");

connectDB();
const app = express();

// Adding express-session middleware
// Note:
// 1) Replace secret with something harder to guess from .env
// 2) Find a store form MongoDB/Mongoose if you want sessions
//    to survive server restart
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto" },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/message", require("./routes/messageRoute"));
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/participant", require("./routes/participantRoute"));
app.use("/api/chatRoom", require("./routes/chatRoomRoute"));
loginAndRegisterRoutes(app);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
