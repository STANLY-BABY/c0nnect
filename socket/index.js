const io = require("socket.io")(8800, {
  cors: {
    origin: ["http://localhost:3000", "https://socket.c0nnect.tech","http://socket.c0nnect.tech","https://c0nnect.tech"],
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  console.log("listening socket");
  socket.on("new-user-add", (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
    }
    io.emit("get-users", activeUsers);
  });
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    data._id = Math.random() * 1000;
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    io.emit("get-users", activeUsers);
  });
});
