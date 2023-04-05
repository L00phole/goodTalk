import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import { createServer } from "http";
import { Server } from "socket.io";
import { errorHandler } from "./middleware/errorMiddleware.js";
import {notFound} from "./middleware/errorMiddleware.js";
import auth from "./middleware/authMiddleware.js";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import chatRoomRoute from "./routes/chatRoomRoute.js";

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server running!');
});

app.use('/api/user', userRoute);
app.use('/api/chat', chatRoomRoute);
app.use('/api/message', messageRoute);

app.use(errorHandler);
app.use(notFound);
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8080;

const server = createServer(app);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    server.listen(port, () => {
      console.log(`Server started on PORT ${port}`.magenta.bold);
    });} catch (e) {
      console.log(e.message);
    }
  }
  start();


const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on("connection", (socket) => {
  //connected to correct id
  socket.on("setup", (userData) => {
    socket.join(userData._id);

    socket.emit("connected");
  });

  socket.on("join-chat", (room) => {
    socket.join(room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop-typing", (room) => socket.in(room).emit("stop-typing"));

  socket.on("new-message", (newMessageReceived) => {
    let chat = newMessageReceived.chat;

    if (!chat.users) return console.log(`chat.users not defined`);

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message-received", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    socket.leave(userData._id);
  });
});
