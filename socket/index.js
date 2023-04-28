const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:3000",
  },
});
let activeUsers = [];

io.on("connection", (socket) => {
  // to add new user
  socket.on("new-user-add", (newUserId) => {
    //if user is active
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
      console.log("connected", activeUsers);
    }
    io.emit("get-users", activeUsers);
  });
  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("disco", activeUsers);
    io.emit("get-users", activeUsers);
  });
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.user._id === receiverId);
    console.log("send to:", receiverId);
    console.log(data, "data");
    if (user) {
      io.to(user.socketId).emit("receive-message", data);
    }
  });
});

