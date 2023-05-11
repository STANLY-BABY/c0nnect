import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { userChats } from "../../../api/ChatRequests";
import ChatBox from "../../../Components/Chat/ChatBox";
import Conversation from "../../../Components/Chat/Conversation";
import { io } from "socket.io-client";
import "./chat.css";
import ErrorBoundary from "../../../Components/user/error/ErrorBoundary";
import { useLocation } from "react-router-dom";
import { getFollowedUserSearchData } from "../../../api/UserRequest";
function Chat() {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [data, setData] = useState({});
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setRecieveMessage] = useState(null);
  let searchQuery;
  const location = useLocation();
  const socket = useRef();
  // useEffect(() => {
  //   socket.current.emit('new-user-add', user._id)
  // },[])
  useEffect(() => {
    socket.current = io("https://c0nnect.tech:8800");
    // socket.current = io("http://localhost:8800");

    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log("data ", data);
      setRecieveMessage(data);
    });
  }, []);
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);
  if (location.search) {
    try {
      searchQuery = location.search.match(/search=([^&]+)/)[1];
    } catch (error) {}
  } else {
  }
useEffect(()=>{
  const getFollowedUsers=async()=>{
    try {
      let data;
      setData(data.users)
    } catch (error) {
if(error.response){
  console.log("error from server");
}      
    }
  }
})

  const [search, setSearch] = useState(searchQuery);
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);
  // const [searchQuery, setSearchQuery] = useState("");
  //check user online status

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };
  async function handleSubmit() {
    let response = await getFollowedUserSearchData(search);
    console.log(response.data.users,"response.data.users");
    setData(response.data.users);
  }
  return (
    <div className="Chat ">
      {/* left side */}
      <div className="Left-side-chat">
        <div className="search flex justify-center mt-10 mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input
              className="shadow border-blue-200 appearance-none border rounded-full h-14 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline font-medium"
              id="search"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">search</button>
          </form>
        </div>

        <h2 className="mb-5 ml-5 text-2xl h-full">Chats</h2>
        <div className="Chat-list">
          {chats.map((chat, index) => (
            <div key={index} onClick={() => setCurrentChat(chat)}>
              <Conversation
                data={chat}
                currentUser={user._id}
                online={checkOnlineStatus(chat)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="Right-side-chat bg-gradient-to-r from-l-pink to-l-blue text-white">
        <ErrorBoundary>
          <ChatBox
            chat={currentChat}
            setSendMessage={setSendMessage}
            currentUser={user._id}
            receiveMessage={receiveMessage}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default Chat;
