import React, { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import { userChats } from "../../../api/ChatRequests";
import ChatBox from "../../../Components/Chat/ChatBox";
import Conversation from "../../../Components/Chat/Conversation";
import { io } from "socket.io-client";
import ErrorBoundary from "../../../Components/user/error/ErrorBoundary";
import { Link, useLocation } from "react-router-dom";
import { getFollowedUserSearchData } from "../../../api/UserRequest";
import SearchIcon from "@mui/icons-material/Search";

function Chat() {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [data, setData] = useState({});
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  console.log(currentChat, "current chat");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setRecieveMessage] = useState(null);
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const socket = useRef();
  let [searchUsers, setSearchUsers] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640); // 640px is the width for sm in Tailwind CSS
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleClick = () => {
    if (isSmallScreen) {
      setIsHidden(true);
    }
  };
  useEffect(() => {
    socket.current = io("https://socket.c0nnect.tech");

    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

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

  const [search, setSearch] = useState(null);
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        console.log(data, "getchats");
        setChats(data);
        console.log(data, "dATA");
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  //check user online status

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember); //need to pass selected user id here
    return online ? true : false;
  };
  async function handleSubmit() {
    try {
      let response = await getFollowedUserSearchData(search, user._id);
      setSearchUsers(response.data);
      setShowSearch(true);
    } catch (error) {
      if (error.response) {
        console.log(error.message);
      } else {
        console.log(error.messag, "error connection");
      }
    }
  }
  return (
    <div className="Chat h-[100vh] flex bg-[#f2f7ff] ">
      {/* left side */}
      {!isHidden && (
        <div className="xl:w-[27rem] lg:w-96 md:w-72 w-full">
          <Link to="/home" style={{ textDecoration: "none" }}>
            <div className="user ml-10 ">
              <p className="xl:text-3xl lg:text-2xl md:text-xl text-lg font-semibold mt-8 font-[mich]">
                CONNECT
              </p>
            </div>
          </Link>
          <h2 className="my-5 ml-5 text-2xl font-bold ">Chats</h2>

          <div className="search flex flex-col justify-center mt-10 mb-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex"
            >
              <input
                className="shadow mx-6 w-5/6 border-blue-200 appearance-none border rounded-full h-10 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline font-medium"
                id="search"
                type="text"
                placeholder="Search"
                value={search|| ""}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
            {showSearch &&
              searchUsers.map((userr, index) => (
                // <div className="" key={index} onClick={() => setCurrentChat({'members':[user._id,userr._id]})}>
                //   <Conversation
                //     data={{'members':[user._id,userr._id]}}

                //     currentUserId={user._id}
                //     online={checkOnlineStatus({'members':[user._id,userr._id]})}
                //   />
                // </div>

                <div
                  class=" w-full border flex flex-col shadow max-h-56 min-w-full bg-white ... "
                  key={index}
                  onClick={() =>
                    setCurrentChat({ members: [user._id, userr._id] })
                  }
                >
                  <div class="block  hover:bg-indigo-50 ...">
                    <Conversation
                    
                    toggleVisibility={toggleVisibility}
                      handleClick={handleClick}
                      data={{ members: [user._id, userr._id] }}
                      currentUserId={user._id}
                      online={checkOnlineStatus({
                        members: [user._id, userr._id],
                      })}
                    />
                  </div>
                </div>
              ))}
          </div>

          <div className="Chat-list">
            {chats.map((chat, index) => (
              <div key={index} onClick={() => setCurrentChat(chat)}>
                <Conversation
                  toggleVisibility={toggleVisibility}
                  handleClick={handleClick}
                  data={chat}
                  currentUserId={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
     <div className={`${isVisible ? "" : "hidden" } sm:block messages bg-gradient-to-r h-full from-l-pink to-l-blue w-full text-white `}>
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
