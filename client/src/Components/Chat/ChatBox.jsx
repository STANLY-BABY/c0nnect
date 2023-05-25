import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMessage, getMessages } from "../../api/MessageRequests";
import { getUser } from "../../api/UserRequest";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from '@mui/icons-material/Send';
const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
  const online = false;
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("s");
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };
  const isSmallScreen = window.innerWidth < 640;
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  const handleSent = async (e) => {
    e.preventDefault();
    let message;
    if (chat._id) {
      message = {
        senderId: currentUser,
        text: newMessage,
        chatId: chat._id,
      };
    } else {
      message = {
        senderId: currentUser,
        text: newMessage,
        members: chat,
      };
    }
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
    try {
      const { data } = await addMessage(message);
      // setMessages([...messages, data]);
      setMessages((prevMessages) => [...prevMessages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <div className=" grid grid-rows-[14vh 60vh 13vh] h-full">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="p-[1rem 1rem 0rem 1rem] flex flex-col row-start-1">
              <div className="follower">
                <div>
                  <div className="flex items-center mt-5">
                    <ArrowBackIcon
                      onClick={handleGoBack}
                      className=" mr-5"
                    />
                    <img
                      src={
                        userData?.user?.profilePicture ? `https://learnreactbrocamp.s3.ap-northeast-1.amazonaws.com/connect/profiles/${userData.user.profilePicture}` :
                        "https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
                      }
                      alt=""
                      className="w-16 h-16 rounded-full "
                      
                    />
                    <div className="ml-5 font-semibold text-xl">
                      <span>{userData?.user?.username}</span>
                    </div>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* chat-body */}
            <div className="flex flex-col gap-2 p-6 overflow-scroll">
              {messages &&
                messages?.map((message) => (
                  <>
                    <div
                      ref={scroll}
                      className={
                        message.senderId === currentUser
                          ? "place-items-end grid-cols-[1fr auto] grid gap-x-3 pt-1 pb-1 "
                          : "place-items-start grid-cols-[1fr auto] grid gap-x-3 pt-1 pb-1 "
                      }
                    >
                      <div className=" relative block w-fit px-4 py-2 max-w-[90%] min-h-8 min-w-8 backdrop-blur-sm text-slate-500 bg-white/30 rounded-3xl ">
                        <span>{message.text}</span>{" "}
                      </div>
                      <div className="chat-header">
                        <time className="text-xs opacity-50">
                          {format(message.createdAt)}
                        </time>
                      </div>
                    </div>
                  </>
                ))}
            </div>
            {/* chat-sender */}
            <div className="flex items-center justify-center">
              <div className="chat-sender w-[90%] sm:ml-16 bg-white flex justify-between h-14 items-center gap-4 p-2 md:rounded-xl rounded-full self-end">
                <div className="bg-gray-300 md:rounded-md flex items-center justify-center font-bold cursor-pointer md:h-[70%] px-3 h-12 w-16 rounded-full">
                  +
                </div>
                <InputEmoji value={newMessage} onChange={handleChange} />
                {isSmallScreen ? (
              <div
                className="button cursor-pointer text-lg bg-gradient-to-r from-l-pink to-l-blue text-white  rounded-full w-16 h-[98%] flex justify-center items-center"
                onClick={handleSent}
              >
               <SendIcon />
              </div>
            ) : (
              <div className="button cursor-pointer text-lg bg-gradient-to-r from-l-pink to-l-blue text-white font-semibold rounded-md p-1" onClick={handleSent}>
               Send
              </div>
            )}
                <input
                  className="h-[70%] bg-gray-300 rounded-md border-none outline-none flex-1 text-base px-3"
                  type="file"
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </>
        ) : (
          <span className="h-screen text-center text-xl">
            Tap on a chat to start a conversation...
          </span>
        )}
      </div>
      <div id="root"></div>
    </>
  );
};

export default ChatBox;
