const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const colors = require("colors");
const connectDB = require("./config/db");

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/message", require("./routes/messageRoute"));
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/participant", require("./routes/participantRoute"));
app.use("/api/chatRoom", require("./routes/chatRoomRoute"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
